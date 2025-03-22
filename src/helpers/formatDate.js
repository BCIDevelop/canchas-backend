export const tranformDateUTCTarget = (date, targetOffset) => {
  const dateUTC = new Date(date);
  const dateUTCTarget = new Date(
    dateUTC.getTime() + targetOffset * 60 * 60 * 1000
  );
  return dateUTCTarget;
};
