import dayjs from 'dayjs';
import dur from 'dayjs/plugin/duration';
dayjs.extend(dur);

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

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function createIdGenerator() {
  let lastId = 0;

  return function () {
    lastId += 1;
    return lastId;
  };
}

function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomBoolean() {
  return Boolean(getRandomInteger(0, 1));
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
  DateFormat,
  getRandomArrayElement,
  createIdGenerator,
  getRandomInteger,
  getRandomBoolean,
  shortDate,
  shortDatetime,
  longDate,
  timeOfDay,
  dateTime,
  duration,
  format
};
