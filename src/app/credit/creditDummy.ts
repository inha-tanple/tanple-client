export interface creditDataType {
  userid: number
  id: string
  date: string
  time: string
  credit: number
  plusACC: number
  balance: number
  amount: number
  type: '적립' | '소비'
  detail: string
  barcode?: number
}

export const creditData: creditDataType[] = [
  {
    userid: 1000,
    id: '8',
    date: '2024-06-23',
    time: '11:20',
    credit: 1980,
    plusACC: 10720,
    balance: 6720,
    amount: 1,
    type: '적립',
    detail: '노브랜드 유기농쌀과자단호박[55g]',
    barcode: 8809020767540,
  },
  {
    userid: 1000,
    id: '7',
    date: '2024-06-21',
    time: '16:45',
    credit: 1000,
    plusACC: 8740,
    balance: 4740,
    amount: 1,
    type: '소비',
    detail: '환전',
  },
  {
    userid: 1000,
    id: '6',
    date: '2024-06-20',
    time: '15:45',
    credit: 690,
    plusACC: 8740,
    balance: 5740,
    amount: 1,
    type: '적립',
    detail: '햇반 유기농쌀밥 210g*12개입',
    barcode: 8801007899749,
  },
  {
    userid: 1000,
    id: '5',
    date: '2024-06-13',
    time: '09:20',
    credit: 2000,
    plusACC: 8050,
    balance: 5050,
    amount: 1,
    type: '소비',
    detail: '환전',
  },
  {
    userid: 1000,
    id: '4',
    date: '2024-06-10',
    time: '15:28',
    credit: 3870,
    plusACC: 8050,
    balance: 7050,
    amount: 1,
    type: '적립',
    detail: '큐원 갈색설탕[15kg]',
    barcode: 8801013121506,
  },
  {
    userid: 1000,
    id: '3',
    date: '2024-06-05',
    time: '12:10',
    credit: 1000,
    plusACC: 4180,
    balance: 3180,
    amount: 1,
    type: '소비',
    detail: '기부',
  },
  {
    userid: 1000,
    id: '2',
    date: '2024-06-05',
    time: '12:00',
    credit: 1400,
    plusACC: 4180,
    balance: 4180,
    amount: 10,
    type: '적립',
    detail: '지구대장 순수유기농현미과자 30g',
    barcode: 8809027396811,
  },
  {
    userid: 1000,
    id: '1',
    date: '2024-06-01',
    time: '15:30',
    plusACC: 2780,
    credit: 2780,
    balance: 2780,
    amount: 1,
    type: '적립',
    detail: '포밍 주방세제 시트러스향',
    barcode: 8801046397183,
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
  detail: string
  barcode?: number
}

export const progressData: progressDataType[] = [
  {
    userid: 1000,
    id: '5',
    date: '2024-06-31',
    time: '15:30',
    credit: 6000,
    balance: 7200,
    amount: 3,
    type: '적립',
    detail: '세제',
    barcode: 8801013121506,
  },
]
