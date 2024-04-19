export const formatDate = (timeInMilliseconds: number, formatTime: string): string => {

  const timeInSeconds = Math.floor(timeInMilliseconds / 1000);

  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const paddedHours = hours < 10 ? `0${hours}` : hours;
  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  if (formatTime === 'hh:mm') {
    return `${paddedHours}:${paddedMinutes}`
  } else if (formatTime === 'hh:mm:ss') {
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
  } else return 'Formato incompativel para conversão!'
};
