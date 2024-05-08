/* eslint-disable import/no-unresolved */
// useMember.tsx

import { SERVER_URL } from '@env'
import { useMutation } from '@tanstack/react-query'

interface personType {
  number: string
  date: string
}

const fetchPerson = async ({ number, date }: personType) => {
  const response = await fetch(`${SERVER_URL}/api/v1/member`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone_number: number,
      birth_date: date,
    }),
  })

  return response.json()
}

const usePersonQuery = () => {
  const mutation = useMutation({
    mutationFn: fetchPerson,
    gcTime: 0,
  })

  return mutation
}

export default usePersonQuery
