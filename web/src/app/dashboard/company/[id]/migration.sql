-- 의상 모델링
CREATE TABLE IF NOT EXISTS garment_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE garment_models ENABLE ROW LEVEL SECURITY;
CREATE POLICY "garment_models_all" ON garment_models FOR ALL USING (true) WITH CHECK (true);

-- 회사 라이브러리 (자료실)
CREATE TABLE IF NOT EXISTS company_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT DEFAULT 'other',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE company_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "company_files_all" ON company_files FOR ALL USING (true) WITH CHECK (true);

-- 홍보영상
CREATE TABLE IF NOT EXISTS promo_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  video_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE promo_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "promo_videos_all" ON promo_videos FOR ALL USING (true) WITH CHECK (true);
