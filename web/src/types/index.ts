export type UserRole = 'brand_admin' | 'agency_manager' | 'super_admin'

export interface Brand {
  id: string
  user_id: string
  name: string
  slug: string
  description?: string
  logo_url?: string
  website?: string
  country: string
  created_at: string
  updated_at: string
}

export interface Season {
  id: string
  name: string
  year: number
  period: 'SS' | 'FW' | 'RE' | 'PF'
}

export interface Category {
  id: string
  name: string
  slug: string
  parent_id?: string
}

export interface ProductLine {
  id: string
  brand_id: string
  season_id?: string
  name: string
  description?: string
  category_id?: string
  status: 'draft' | 'active' | 'archived'
  is_public: boolean
  created_at: string
  updated_at: string
  season?: Season
  category?: Category
  products?: Product[]
}

export interface Product {
  id: string
  line_id: string
  name: string
  sku?: string
  description?: string
  fabric_info?: string
  colors?: { name: string; hex: string }[]
  sizes?: string[]
  price?: number
  status: string
  created_at: string
  media?: ProductMedia[]
}

export interface ProductMedia {
  id: string
  product_id: string
  url: string
  type: 'image' | 'video' | '3d_model' | 'document'
  is_primary: boolean
  sort_order: number
}

export interface Fabric {
  id: string
  brand_id: string
  name: string
  composition?: string
  weight?: string
  width?: string
  finish?: string
  swatch_url?: string
  digital_map_url?: string
  created_at: string
}
