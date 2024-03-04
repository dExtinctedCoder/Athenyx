import { QueryClient } from 'react-query'

export const BASE_URL = 'http://127.0.0.1:8000/api'
export const queryClient = new QueryClient()
export const currencyFormmatter = new Intl.NumberFormat('en-us', {
  style: `currency`,
  currency: 'USD'
})