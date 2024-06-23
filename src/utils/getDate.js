// '202406'
export function getDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  return `${year}${month}`
}

// '2024-06-23'
export function getFormatDate() {
  const date = new Date()
  const options = {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }
  const koreanDate = date.toLocaleString('ko-KR', options)
  const [year, month, day] = koreanDate
    .split('. ')
    .map((part) => part.replace('.', '').trim())

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

// '15:30'
export function getFormatTime() {
  const date = new Date()
  const options = {
    timeZone: 'Asia/Seoul',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }
  return date.toLocaleString('ko-KR', options).replace(':', ':').trim()
}
