/* eslint-disable import/prefer-default-export */

// useCreditsQueries.tsx

import { SERVER_URL } from '@env'
import { useQuery } from '@tanstack/react-query'

// useFetchCredits
export interface creditsType {
  totalCredits: number
  lastMonthCredits: number
  thisMonthCredits: number
}

const fetchCredits = async () => {
  const response = await fetch(`${SERVER_URL}/v1/credits`)
  if (!response.ok) {
    console.log(response.status)
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json() as unknown as creditsType
}

export const useFetchCredits = () => {
  return useQuery({
    queryKey: ['credits'],
    queryFn: fetchCredits,
  })
}

// useFetchDateCredits
export interface dateCreditsType {
  id: number
  credit: number
  balance: number
  plusACC: number
  date: string
  time: string
  creditMethod: string
  detail: string
  productBarcode?: number
  creditType: '적립' | '소비'
}

const fetchDateCredits = async (date: string) => {
  const response = await fetch(`${SERVER_URL}/v1/credits/${date}`)
  if (!response.ok) {
    console.log(response.status)
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
  return data as dateCreditsType[]
}

export const useFetchDateCredits = (date: string) => {
  return useQuery({
    queryKey: ['credits', date],
    queryFn: () => fetchDateCredits(date),
    initialData: [],
  })
}
