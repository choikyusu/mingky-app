export function getToday() {
  const today = new Date();

  const year = today.getFullYear(); // 년도
  const month = today.getMonth() + 1; // 월
  const day = today.getDate(); // 날짜

  return new Date(`${year}-${month}-${day}`);
}

export function getYYYYMMDD(date: Date) {
  const year = date.getFullYear(); // 년도
  const month = date.getMonth() + 1; // 월
  const day = date.getDate(); // 날짜

  return `${year}-${month}-${day}`;
}
