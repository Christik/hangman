const correctLetters = [];
const wrongLetters = [];

const wordEl = document.querySelector('.app__word');
const templateLetterUnguessed = document.querySelector('#letter-unguessed').content;
const letterUnguessedEl = templateLetterUnguessed.querySelector('.letter');
const templateLetterGuessed = document.querySelector('#letter-guessed').content;
const letterGuessedEl = templateLetterGuessed.querySelector('.letter');

const isLetterCorrect = (letter, word) => (word.includes(letter));

const isLetterDuplicate = (letter, letters) => (letters.includes(letter));

const updateCorrectLetters = (letter, word) => {
  if (isLetterDuplicate(letter, correctLetters)) {
    console.log('Такая отгаданная буква уже есть');
    return;
  }

  correctLetters.push(letter);
  renderWord(word);
};

const updateWrongLetters = (letter) => {
  if (isLetterDuplicate(letter, wrongLetters)) {
    console.log(`Ты уже промахивался с буквой ${letter}`);
    return;
  }

  wrongLetters.push(letter);
};

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

  wordEl.innerHTML = '';
  wordEl.append(fragment);
};

const getUserWord = (word) => {
  const userWord = word
    .split('')
    .filter((letter) => (correctLetters.includes(letter)))
    .join('');
  
  return userWord;
};

const isWordCorrect = (userWord, word) => (userWord === word);

const checkLetter = (letter, word) => {
  letter = letter.toLowerCase();

  if (isLetterCorrect(letter, word)) {
    updateCorrectLetters(letter, word);

    const userWord = getUserWord(word);
    
    if (isWordCorrect(userWord, word)) {
      console.log('Ура, ты выиграл!')
    }

    return;
  }

  updateWrongLetters(letter);
};

export { renderWord, checkLetter };