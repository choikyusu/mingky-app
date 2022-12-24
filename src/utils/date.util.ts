export function getToday() {
  const today = new Date();

  const year = today.getFullYear(); // 년도
  const month = today.getMonth() + 1; // 월
  const day = today.getDate(); // 날짜

  return new Date(
    `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`,
  );
}

export function getYYYYMMDD(date: Date) {
  const year = date.getFullYear(); // 년도
  const month = date.getMonth() + 1; // 월
  const day = date.getDate(); // 날짜

  return `${year}-${month < 10 ? `0${month}` : month}-${
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

export function getDayOfWeek(date: Date) {
  const day = date.getDay();

  switch (day) {
    case 0:
      return '일';
    case 1:
      return '월';
    case 2:
      return '화';
    case 3:
      return '수';
    case 4:
      return '목';
    case 5:
      return '금';
    case 6:
      return '토';
    default:
      return '';
  }
}
