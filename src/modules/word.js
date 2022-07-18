const InfoMessage = {
  DUPLICATE_CORRECT_LETTER: 'Эта буква уже отгадана',
  DUPLICATE_WRONG_LETTER: 'Ты уже выбирал эту букву',
};

const correctLetters = [];
const wrongLetters = [];

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
      const isLetterGuessed = correctLetters.includes(letter);
      const letterEl = (isLetterGuessed) ? getLetterGuessedEl(letter) : getLetterUnguessedEl();

      fragment.append(letterEl);
    });

  wordEl.innerHTML = '';
  wordEl.append(fragment);
};

const updateCorrectLetters = (letter, word) => {
  if (isLetterDuplicate(letter, correctLetters)) {
    console.log(InfoMessage.DUPLICATE_CORRECT_LETTER);
    return;
  }

  correctLetters.push(letter);
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
  if (isLetterDuplicate(letter, wrongLetters)) {
    console.log(InfoMessage.DUPLICATE_WRONG_LETTER);
    return;
  }

  wrongLetters.push(letter);
  renderWrongLetter(letter);
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
    .filter((letter) => (correctLetters.includes(letter)))
    .join('');
  
  return userWord;
};

const isWordCorrect = (word) => {
  const userWord = getUserWord(word);
  return userWord === word;
}

const areAttemptsOver = (attemptCount) => (wrongLetters.length >= attemptCount);

const resetCorrectLetters = () => {
  correctLetters.length = 0;
  wordEl.innerHTML = '';
};

const resetWrongLetters = () => {
  wrongLetters.length = 0;
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