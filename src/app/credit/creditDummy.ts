export interface creditDataType {
  userid: number
  id: string
  date: string
  time: string
  credit: number
  balance: number
  amount: number
  type: '적립' | '소비'
  method: '구매' | '환전' | '기부'
  detail: string
  barcode?: number
}

export const creditData: creditDataType[] = [
  {
    userid: 111111,
    id: '5',
    date: '2024-04-18',
    time: '15:30',
    credit: 6000,
    balance: 7200,
    amount: 3,
    type: '적립',
    method: '구매',
    detail: '세제',
    barcode: 8801013121506,
  },
  {
    userid: 111111,
    id: '4',
    date: '2024-04-18',
    time: '12:00',
    credit: 1000,
    balance: 1200,
    amount: 1,
    type: '소비',
    method: '기부',
    detail: '기부',
  },
  {
    userid: 111111,
    id: '3',
    date: '2024-04-18',
    time: '09:20',
    credit: 5000,
    balance: 2200,
    amount: 1,
    type: '소비',
    method: '환전',
    detail: '환전',
  },
  {
    userid: 111111,
    id: '2',
    date: '2024-04-17',
    time: '15:45',
    credit: 1200,
    balance: 7200,
    amount: 1,
    type: '적립',
    method: '구매',
    detail: '소금 1kg',
    barcode: 8801013121506,
  },
  {
    userid: 111111,
    id: '1',
    date: '2024-04-17',
    time: '14:30',
    credit: 2000,
    balance: 6000,
    amount: 2,
    type: '적립',
    method: '구매',
    detail: '까까',
    barcode: 8801013121506,
  },
]

export interface progressDataType {
  userid: number
  id: string
  date: string
  time: string
  credit: number
  balance: number
  amount: number
  type: '적립' | '소비'
  method: '구매' | '환전' | '기부'
  detail: string
  barcode?: number
}

export const progressData: progressDataType[] = [
  {
    userid: 111111,
    id: '5',
    date: '2024-04-18',
    time: '15:30',
    credit: 6000,
    balance: 7200,
    amount: 3,
    type: '적립',
    method: '구매',
    detail: '세제',
    barcode: 8801013121506,
  },
]
