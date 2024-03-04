export type ProductType = {
  id: number
  name: string
  images: string
  price: number
  stock: number
  stock_range: number
  description: string
  sizes: "s" | "m" | "l" | "xl"
  brand: string | null
  gender: string
  user: string
  category: number
}
export type ShopType = ProductType[]
export interface SingleCategoryType {
  name: CategoryInterface
  id: number
}
export type CategoryType = SingleCategoryType[]
export type CategoryInterface = 'all' | 'women' | 'men' | 'unisex' | 'shoes' | 'accessories' | 'bag' | 'watches'
