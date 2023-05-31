import dayjs from 'dayjs';
import { getRandomInteger } from './utils';


function getRandomDate({isTo}) {
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

export { getRandomDate };
