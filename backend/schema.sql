-- Model Line DB Schema (Supabase / PostgreSQL)
-- Phase 1: 제품 라인 관리

-- 사용자 프로필 & 역할
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'brand_admin'
    CHECK (role IN ('brand_admin', 'agency_manager', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 신규 가입 시 profiles 자동 생성 트리거
-- ADMIN_EMAIL 값을 여기에 직접 입력 (C 방식)
-- Supabase는 env 직접 접근 불가 → SQL에 이메일 하드코딩
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  assigned_role TEXT;
BEGIN
  -- C 방식: 관리자 이메일이면 super_admin 자동 부여
  IF NEW.email = 'dpyeye@gmail.com' THEN
    assigned_role := 'super_admin';
  ELSE
    assigned_role := COALESCE(NEW.raw_user_meta_data->>'role', 'brand_admin');
  END IF;

  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    assigned_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_self_read" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_super_admin_all" ON profiles FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin'));

-- 브랜드 프로필
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  country TEXT DEFAULT 'KR',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 제품 카테고리
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES categories(id)
);

INSERT INTO categories (name, slug) VALUES
  ('상의', 'tops'),
  ('하의', 'bottoms'),
  ('아우터', 'outerwear'),
  ('원단/소재', 'fabric'),
  ('액세서리', 'accessories');

-- 시즌
CREATE TABLE seasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,  -- e.g. "2026 S/S"
  year INT NOT NULL,
  period TEXT NOT NULL CHECK (period IN ('SS', 'FW', 'RE', 'PF'))
);

-- 제품 라인
CREATE TABLE product_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  season_id UUID REFERENCES seasons(id),
  name TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 제품 아이템
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  line_id UUID REFERENCES product_lines(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sku TEXT,
  description TEXT,
  fabric_info TEXT,       -- 소재 정보
  colors JSONB,           -- [{name: "블랙", hex: "#000000"}, ...]
  sizes JSONB,            -- ["XS", "S", "M", "L", "XL"]
  price INT,              -- 원 단위
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 제품 이미지 / 파일
CREATE TABLE product_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  type TEXT CHECK (type IN ('image', 'video', '3d_model', 'document')),
  is_primary BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 소재 라이브러리
CREATE TABLE fabrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  composition TEXT,        -- 혼방률 (e.g. "면 80%, 폴리 20%")
  weight TEXT,             -- 중량 (g/m²)
  width TEXT,              -- 폭
  finish TEXT,             -- 가공 방식
  swatch_url TEXT,         -- 견본 이미지
  digital_map_url TEXT,    -- 디지털 맵핑 파일
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS 정책
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE fabrics ENABLE ROW LEVEL SECURITY;

-- 브랜드: 본인만 수정, 공개된 것은 누구나 조회
CREATE POLICY "brands_owner_all" ON brands FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "brands_public_read" ON brands FOR SELECT USING (true);

CREATE POLICY "lines_owner_all" ON product_lines FOR ALL
  USING (brand_id IN (SELECT id FROM brands WHERE user_id = auth.uid()));
CREATE POLICY "lines_public_read" ON product_lines FOR SELECT USING (is_public = true);

CREATE POLICY "products_owner_all" ON products FOR ALL
  USING (line_id IN (
    SELECT pl.id FROM product_lines pl
    JOIN brands b ON pl.brand_id = b.id
    WHERE b.user_id = auth.uid()
  ));

CREATE POLICY "fabrics_owner_all" ON fabrics FOR ALL
  USING (brand_id IN (SELECT id FROM brands WHERE user_id = auth.uid()));
