import moment from "moment";


export function dateFetching(value: any, type: any) {
  const currentDate = new Date();

  if (value === true) {
    return type === 'Monthly' ? currentDate.toISOString() : moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
  } else {
    const nextDate = type === 'Monthly'
      ? new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      : new Date(currentDate.getFullYear() + 1, 0, 1);

    return moment(nextDate).format('YYYY-MM-DD HH:mm:ss');
  }
}
