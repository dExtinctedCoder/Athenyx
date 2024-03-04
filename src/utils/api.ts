import {useQuery} from 'react-query'
import {BASE_URL} from './constants'
import { ShopType, ProductType, CategoryType} from './types'

async function fetchCategoriesQueryfn () {
  const response = await fetch(`${BASE_URL}/categories`)
  const data: CategoryType = await response.json()
  if (!response.ok) {
    throw new Error(response.statusText)
  } 
  return data
}

export function FetchStoreCategories() {
  const {data, error, isLoading, isFetching, isError} = useQuery('fetch-store-category', fetchCategoriesQueryfn, {
    // onSuccess: (data) => console.log(data),
    onError: (e: string) => { throw new Error(e) }
  })
  return {data, error, isLoading, isFetching, isError}
}

async function fetchStoreQueryfn (id: string) {
  const response = await fetch(`${BASE_URL}/category/${id}`)
  const data: ShopType = await response.json()
  if (!response.ok) {
    console.log(response)
    throw new Error(response.statusText)
  }
  return data
}

export function FetchCategoryProducts (id: string, onSuccess: (data: ShopType) => void) {
  const {data, error, isLoading, isFetching, isError, refetch} = useQuery({
    queryKey: ['fetch-store-products'],
    queryFn: () => fetchStoreQueryfn(id),
    enabled: false,
    onSuccess: onSuccess,
    onError: (e: unknown) => { console.log(e) }
  })
  return {data, error, isLoading, isFetching, isError, refetch}
}

async function fetchProductQueryfn (id: string) {
  const response = await fetch(`${BASE_URL}/product/${id}`)
  const data: ProductType = await response.json()
  if (!response.ok) {
    console.log(response)
    throw new Error(response.statusText)
  }
  return data
}

export function FetchProductDetail (id: string) {
  const {data, error, isLoading, isFetching, isError} = useQuery({
    queryKey: ['fetch-product-details'],
    queryFn: () => fetchProductQueryfn(id),
    // onSuccess: (data) => console.log(data),
    onError: (e: unknown) => { console.log(e) }
  })
  return {data, error, isLoading, isFetching, isError}
}

async function fetchAllProducts () {
  const response = await fetch(`${BASE_URL}/shop`)
  const data: ShopType = await response.json()
  if (!response.ok) {
    console.log(response)
    throw new Error(response.statusText)
  }
  return data
}

export function FetchAllProduct (onSuccess: (data: ShopType) => void = () => null) {
  const {data, error, isLoading, isFetching, refetch, isError} = useQuery('fetch-all-product', fetchAllProducts, {
    onSuccess: onSuccess,
    enabled: false,
    onError: (e: unknown) => { console.log(e) }
  })
  return {data, error, isLoading, isFetching, refetch, isError}
}