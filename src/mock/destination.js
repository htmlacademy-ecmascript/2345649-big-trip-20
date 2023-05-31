import { getRandomArrayElement } from '../utils.js';
import { CITIES, DESCRIPTION } from '../const.js';

function generateDestination() {
  return {
    id: crypto.randomUUID(),
    name: getRandomArrayElement(CITIES),
    description: DESCRIPTION,
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        description: `Beautiful ${this.name}`
      }
    ]
  };
}

export { generateDestination };
