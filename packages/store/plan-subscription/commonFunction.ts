export function dateFetching(value: any) {
  const currentDate = new Date();
  const nextYearDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());

  if (value === true) {
    const dateString = currentDate.toISOString();
    return dateString;
  } else {
    const dateString = nextYearDate.toISOString();
    return dateString;
  }
}
