export function formatDate(inputDate: string, format: string) {
  try {
    const date = new Date(inputDate);

    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    let period = '오전';

    if (Number(hours) >= 12) {
      hours =
        Number(hours) % 12 === 0
          ? '12'
          : String(Number(hours) % 12).padStart(2, '0');
      period = '오후';
    }

    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = weekdays[date.getDay()];

    const formattedDate = format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('hh', hours)
      .replace('mm', minutes)
      .replace('ss', seconds)
      .replace('a', period)
      .replace('ddd', dayOfWeek);

    return formattedDate;
  } catch (e) {
    return '';
  }
}
