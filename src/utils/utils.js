function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function updateItem(items, updated) {
  return items.map((item)=>item.id === updated.id ? updated : item);
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

export {
  getRandomArrayElement,
  getRandomInteger,
  getRandomBoolean,
  updateItem
};
