import moment from "moment";

export function dateFetching(value: any, type: any) {
  const currentDate = new Date();
  const nextYearDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());

  if (value === true && type === 'Monthly') {
    const dateString = currentDate.toISOString();
    return dateString;
  } else if (value === true && type === 'Yearly') {
    const dateStringNow = currentDate.toISOString();
    return dateStringNow;
  } else if (value === false && type === 'Monthly') {
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); // Start of next month
    const dateStringNext = moment(nextMonthDate).format('YYYY-MM-DD HH:mm:ss');

    return dateStringNext;
  } else if (value === false && type === 'Yearly') {
    const nextYear = new Date(currentDate.getFullYear() + 1, 0, 1); // January 1st of next year
    const dateStringyear = moment(nextYear).format('YYYY-MM-DD HH:mm:ss');

    return dateStringyear;
  }
}
