import { showNotice } from './notice';
import { showHangmanPart } from './hangman';

const InfoMessage = {
  getDuplicateCorrect (letter) {
    return `Буква «${letter}» уже отгадана`;
  },
  getDuplicateWrong (letter) {
    return `Ты уже выбирал букву «${letter}»`;
  },
};

const state = {
  correctLetters: [],
  wrongLetters: [],
};

const wordEl = document.querySelector('.app__word');
const templateLetterUnguessed = document.querySelector('#letter-unguessed').content;
const letterUnguessedEl = templateLetterUnguessed.querySelector('.letter');
const templateLetterGuessed = document.querySelector('#letter-guessed').content;
const letterGuessedEl = templateLetterGuessed.querySelector('.letter');
const templateLetterWrong = document.querySelector('#letter-missed').content;
const letterWrongEl = templateLetterWrong.querySelector('.letter');
const lettersWrongContainerEl = document.querySelector('.misses__letters');

const isLetterCorrect = (letter, word) => (word.includes(letter));

const isLetterDuplicate = (letter, letters) => (letters.includes(letter));

const getLetterUnguessedEl = () => {
  return letterUnguessedEl.cloneNode(true);
};

const getLetterGuessedEl = (letter) => {
  const letterEl = letterGuessedEl.cloneNode(true);
  const letterTextEl = letterEl.querySelector('.letter__in');
  letterTextEl.textContent = letter;

  return letterEl;
};

const renderWord = (word) => {
  const fragment = document.createDocumentFragment();

  word
    .split('')
    .map((letter) => {
      const isLetterGuessed = state.correctLetters.includes(letter);
      const letterEl = (isLetterGuessed) ? getLetterGuessedEl(letter) : getLetterUnguessedEl();

      fragment.append(letterEl);
    });

  wordEl.innerHTML = '';
  wordEl.append(fragment);
};

const updateCorrectLetters = (letter, word) => {
  if (isLetterDuplicate(letter, state.correctLetters)) {
    const message = InfoMessage.getDuplicateCorrect(letter);
    showNotice(message);
    return;
  }

  state.correctLetters.push(letter);
  renderWord(word);
};

const getLetterWrongEl = (letter) => {
  const letterEl = letterWrongEl.cloneNode(true);
  const letterTextEl = letterEl.querySelector('.letter__in');
  letterTextEl.textContent = letter;

  return letterEl;
};

const renderWrongLetter = (letter) => {
  const letterEl = getLetterWrongEl(letter);
  lettersWrongContainerEl.append(letterEl);
};

const updateWrongLetters = (letter) => {
  if (isLetterDuplicate(letter, state.wrongLetters)) {
    const message = InfoMessage.getDuplicateWrong(letter);
    showNotice(message);
    return;
  }

  state.wrongLetters.push(letter);
  renderWrongLetter(letter);
  showHangmanPart();
};

const checkLetter = (letter, word) => {
  letter = letter.toLowerCase();

  if (isLetterCorrect(letter, word)) {
    updateCorrectLetters(letter, word);
    return;
  }

  updateWrongLetters(letter);
};

const getUserWord = (word) => {
  const userWord = word
    .split('')
    .filter((letter) => (state.correctLetters.includes(letter)))
    .join('');
  
  return userWord;
};

const isWordCorrect = (word) => {
  const userWord = getUserWord(word);
  return userWord === word;
}

const areAttemptsOver = (attemptCount) => (state.wrongLetters.length >= attemptCount);

const resetCorrectLetters = () => {
  state.correctLetters.length = 0;
  wordEl.innerHTML = '';
};

const resetWrongLetters = () => {
  state.wrongLetters.length = 0;
  lettersWrongContainerEl.innerHTML = '';
};

const resetLetters = () => {
  resetCorrectLetters();
  resetWrongLetters();
}

export { 
  renderWord, 
  checkLetter,
  isWordCorrect,
  areAttemptsOver,
  resetLetters
};