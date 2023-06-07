import { getRandomInteger } from '../utils/utils.js';

function generateOffer(type) {
  return {
    id: crypto.randomUUID(),
    title: `The best ${type} ever!`,
    price: getRandomInteger(1, 1000)
  };
}

export { generateOffer };
