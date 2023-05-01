import { getRandomArrayElement, createIdGenerator, getRandomInteger } from '../utils.js';
import { POINT_TYPES } from '../const.js';

const getId = createIdGenerator();

const mockEvents = [
  {
    id: getId().toString(),
    basePrice: getRandomInteger(1000, 9000),
    dateFrom: getMockDate().toString(),
    dateTo: getMockDate().setDate(getRandomInteger(60, 90)).toString(),
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa31'],
    type: getRandomArrayElement(POINT_TYPES),
  },
];

function getMockDate(date = new Date()) {
  date.setDate(getRandomInteger(-30, 30));
  return date;
}

function getRandomEvent() {
  return getRandomArrayElement(mockEvents);
}

export { getRandomEvent };
