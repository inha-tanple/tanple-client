import { dateCreditsType } from '#store/server/useCreditsQueries'

export const creditData: dateCreditsType[] = [
  {
    id: 1,
    credit: 1980,
    balance: 6720,
    plusACC: 10720,
    date: '2024-06-23',
    time: '11:20',
    creditMethod: 'PURCHASE',
    detail: '노브랜드 유기농쌀과자단호박[55g]',
    productBarcode: 8809020767540,
    creditType: '적립',
  },
  {
    id: 2,
    credit: 1000,
    balance: 4740,
    plusACC: 8740,
    date: '2024-06-21',
    time: '16:45',
    creditMethod: 'EXCHANGE',
    detail: '환전',
    creditType: '소비',
  },
  {
    id: 3,
    credit: 690,
    balance: 5740,
    plusACC: 8740,
    date: '2024-06-20',
    time: '15:45',
    creditMethod: 'PURCHASE',
    detail: '햇반 유기농쌀밥 210g*12개입',
    productBarcode: 8801007899749,
    creditType: '적립',
  },
  {
    id: 4,
    credit: 2000,
    balance: 5050,
    plusACC: 8050,
    date: '2024-06-13',
    time: '09:20',
    creditMethod: 'EXCHANGE',
    detail: '환전',
    creditType: '소비',
  },
  {
    id: 5,
    credit: 3870,
    balance: 7050,
    plusACC: 8050,
    date: '2024-06-10',
    time: '15:28',
    creditMethod: 'PURCHASE',
    detail: '큐원 갈색설탕[15kg]',
    productBarcode: 8801013121506,
    creditType: '적립',
  },
  {
    id: 6,
    credit: 1000,
    balance: 3180,
    plusACC: 4180,
    date: '2024-06-05',
    time: '12:10',
    creditMethod: 'DONATION',
    detail: '기부',
    creditType: '소비',
  },
  {
    id: 7,
    credit: 1400,
    balance: 4180,
    plusACC: 4180,
    date: '2024-06-05',
    time: '12:00',
    creditMethod: 'PURCHASE',
    detail: '지구대장 순수유기농현미과자 30g',
    productBarcode: 8809027396811,
    creditType: '적립',
  },
  {
    id: 8,
    credit: 2780,
    balance: 2780,
    plusACC: 2780,
    date: '2024-06-01',
    time: '15:30',
    creditMethod: 'PURCHASE',
    detail: '포밍 주방세제 시트러스향',
    productBarcode: 8801046397183,
    creditType: '적립',
  },
]

export interface progressDataType {
  id: number
  credit: number
  date: string
  time: string
  detail: string
  productBarcode?: number
  creditType: '적립' | '소비'
}

export const progressData: progressDataType[] = [
  {
    id: 1,
    credit: 2780,
    date: '2024-06-22',
    time: '15:30',
    detail: '포밍 주방세제 시트러스향',
    productBarcode: 8801046397183,
    creditType: '적립',
  },
]
