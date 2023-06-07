import dayjs from 'dayjs';
import dur from 'dayjs/plugin/duration';
import { getRandomInteger } from './utils';

const DateFormat = {
  SHORT_DATE: 'MMM DD',
  LONG_DATE: 'YYYY-MM-DD',
  TIME: 'hh:mm',
  DATETIME: 'YYYY-MM-DDThh:mm',
  SHORT_DATETIME: 'DD/MM/YY hh:mm',
  DHM_DURATION: 'DD[D] HH[H] mm[M]',
  HM_DURATION: 'HH[H] mm[M]',
  M_DURATION: 'mm[M]',
};

const MSEC_IN_DAY = 1000 * 60 * 60 * 24;
const MSEC_IN_HOUR = 1000 * 60 * 60;

dayjs.extend(dur);

function getRandomDate({ isTo }) {
  const mins = getRandomInteger(0, 59);
  const hours = getRandomInteger(1, 23);
  const days = getRandomInteger(0, 30);

  let date = dayjs().subtract(getRandomInteger(0, 28), 'day').toDate();

  if (isTo) {
    date = dayjs(date)
      .add(days, 'day')
      .add(hours, 'hour')
      .add(mins, 'minute')
      .toDate();
  }

  return date;
}

function format(date, type){
  return date ? dayjs(date).format(type) : '';
}

function shortDate(date) {
  return date ? dayjs(date).format(DateFormat.SHORT_DATE) : '';
}

function longDate(date) {
  return date ? dayjs(date).format(DateFormat.LONG_DATE) : '';
}

function timeOfDay(date) {
  return date ? dayjs(date).format(DateFormat.TIME) : '';
}

function dateTime(date) {
  return date ? dayjs(date).format(DateFormat.DATETIME) : '';
}
function shortDatetime(date) {
  return date ? dayjs(date).format(DateFormat.SHORT_DATETIME) : '';
}

function duration(start, end) {
  const dateDiff = dayjs(end).diff(dayjs(start));
  let formattedDuration = '';

  if (dateDiff >= MSEC_IN_DAY) {
    formattedDuration = dayjs
      .duration(dateDiff)
      .format(DateFormat.DHM_DURATION);
  } else if (dateDiff >= MSEC_IN_HOUR) {
    formattedDuration = dayjs.duration(dateDiff).format(DateFormat.HM_DURATION);
  } else {
    formattedDuration = dayjs.duration(dateDiff).format(DateFormat.M_DURATION);
  }

  return formattedDuration;
}

export {
  getRandomDate,
  DateFormat,
  shortDate,
  shortDatetime,
  longDate,
  timeOfDay,
  dateTime,
  duration,
  format,
};
