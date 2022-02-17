export type Hotel = {
  id: number
  name: string
  rating: number
  stars: number
  address: string
  photo: string
  description: string
}

export type Price = {
  id: number
  price: number
  competitors?: {
    [k in string]?: number
  },
  taxes_and_fees?: {
    tax: number
    hotel_fees: number
  }
}

export type CompPriceList = {
  name?: string,
  price: number
}[]
