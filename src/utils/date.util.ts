export function getToday() {
  const today = new Date();

  const year = today.getFullYear(); // 년도
  const month = today.getMonth() + 1; // 월
  const day = today.getDate(); // 날짜

  return new Date(
    `${year}/${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}`,
  );
}

export function getYYYYMMDD(date: Date) {
  const year = date.getFullYear(); // 년도
  const month = date.getMonth() + 1; // 월
  const day = date.getDate(); // 날짜

  return `${year}/${month < 10 ? `0${month}` : month}/${
    day < 10 ? `0${day}` : day
  }`;
}

export function isSameDate(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
