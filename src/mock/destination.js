import { getRandomArrayElement } from '../utils/utils.js';
import { CITIES, DESCRIPTION } from '../const.js';

function generateDestination() {
  const destName = getRandomArrayElement(CITIES);
  return {
    id: crypto.randomUUID(),
    name: destName,
    description: DESCRIPTION,
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        description: `Beautiful ${destName}`
      }
    ]
  };
}

export { generateDestination };
