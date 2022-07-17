const correctLetters = ['д', 'й'];

const wordEl = document.querySelector('.app__word');
const templateLetterUnguessed = document.querySelector('#letter-unguessed').content;
const letterUnguessedEl = templateLetterUnguessed.querySelector('.letter');
const templateLetterGuessed = document.querySelector('#letter-guessed').content;
const letterGuessedEl = templateLetterGuessed.querySelector('.letter');

const getLetterUnguessedEl = () => {
  return letterUnguessedEl.cloneNode(true);
};

const getLetterGuessedEl = (letter) => {
  const letterEl = letterGuessedEl.cloneNode(true);
  const letterInEl = letterEl.querySelector('.letter__in');
  letterInEl.textContent = letter;

  return letterEl;
};

const renderWord = (word) => {
  const fragment = document.createDocumentFragment();

  word
    .split('')
    .map((letter) => {
      const isLetterGuessed = correctLetters.includes(letter);
      const letterEl = (isLetterGuessed) ? getLetterGuessedEl(letter) : getLetterUnguessedEl();

      fragment.append(letterEl);
    });

  wordEl.append(fragment);
};

export { renderWord };