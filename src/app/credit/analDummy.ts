const lastMonthData: {
  date: string
  plusACC?: number
  plus?: number
  minus?: number
}[] = [
  { date: '2024-04-01', plusACC: 1000, plus: 1000 },
  { date: '2024-04-05', plusACC: 3000, plus: 2000 },
  { date: '2024-04-10', plusACC: 4000, plus: 1000, minus: 1000 },
  { date: '2024-04-15', plusACC: 6000, plus: 2000 },
  { date: '2024-04-20', plusACC: 7000, plus: 1000, minus: 1000 },
  { date: '2024-04-23', minus: 1000 },
  { date: '2024-04-25', plusACC: 10000, plus: 3000 },
  { date: '2024-04-27', minus: 1000 },
  { date: '2024-04-30', plusACC: 10500, plus: 500, minus: 2000 },
]

const currentMonthData: {
  date: string
  plusACC?: number
  plus?: number
  minus?: number
}[] = [
  { date: '2024-05-01', plusACC: 1000, plus: 1000 },
  { date: '2024-05-05', plusACC: 3000, plus: 2000, minus: 1000 },
  { date: '2024-05-10', plusACC: 3500, plus: 500 },
  { date: '2024-05-13', minus: 1000 },
  { date: '2024-05-20', plusACC: 8000, plus: 4000 },
  { date: '2024-05-21', minus: 1000 },
]

export { lastMonthData, currentMonthData }
