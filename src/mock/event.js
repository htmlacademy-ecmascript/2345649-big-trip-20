import { getRandomBoolean, getRandomInteger } from '../utils/utils.js';
import { getRandomDate } from '../utils/date.js';

function generateEvent(type, destinationId, offersIds) {
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(1, 1000),
    dateFrom: getRandomDate(),
    dateTo: getRandomDate(true),
    destination: destinationId,
    isFavorite: getRandomBoolean(),
    offers: offersIds,
    type,
  };
}

export { generateEvent };
