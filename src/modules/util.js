const HIDDEN_CLASS = 'is-hidden';

const showElement = (element) => element.classList.remove(HIDDEN_CLASS);

const hideElement = (element) => {
  if (!element.classList.contains(HIDDEN_CLASS)) {
    element.classList.add(HIDDEN_CLASS);
  }
};

const getRandomInteger = (from, to) => {
  const randomNumber = Math.random() * (to - from + 1) + from;
  
  return Math.floor(randomNumber);
};

const getRandomElementFromArray = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

const isKeyEscape = (evt) => (evt.key === 'Escape');

const isKeyRussianLetter = (evt) => (evt.key.match(/[а-яА-Я]/));

export { 
  showElement,
  hideElement,
  getRandomElementFromArray,
  isKeyEscape,
  isKeyRussianLetter 
};