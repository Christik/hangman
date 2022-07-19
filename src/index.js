import './styles/styles.less';

import { getWords } from './modules/data';
import { showElement, getRandomElementFromArray, isKeyRussianLetter } from './modules/util';
import { renderWord, checkLetter, isWordCorrect, areAttemptsOver, resetLetters } from './modules/word';
import { openModal } from './modules/modal';
import { resetHangman } from './modules/hangman';

const ATTEMPT_COUNT = 6;
const MODAL_BUTTON_TEXT = 'Играть';

const InfoMessage = {
  WIN: 'Поздравляем,\r\nты выиграл!',
  LOSE: 'В следующий раз\r\nповезет больше ;)',
};

const state = {
  word: '',
  isGameFinished: false,
};

const restartButtonEl = document.querySelector('.app__restart');

const updateCurrentWord = (words) => (state.word = getRandomElementFromArray(words));

const createRestartGame = (words) => {
  return () => {
    const newWord = updateCurrentWord(words);

    state.isGameFinished = false;
    resetLetters();
    resetHangman();
    renderWord(newWord);
  };
};

const initGame = async () => {
  const words = await getWords();

  updateCurrentWord(words);  
  renderWord(state.word);
  showElement(restartButtonEl);

  const onWordKeydown = (evt) => {
    if (!state.isGameFinished && isKeyRussianLetter(evt)) {
      const letter = evt.key;
      
      checkLetter(letter, state.word);

      if (isWordCorrect(state.word) || areAttemptsOver(ATTEMPT_COUNT)) {
        state.isGameFinished = true;
    
        if (isWordCorrect(state.word)) {
          openModal(InfoMessage.WIN, MODAL_BUTTON_TEXT, createRestartGame(words));
          return;
        }

        if (areAttemptsOver(ATTEMPT_COUNT)) {
          state.isGameFinished = true;
          openModal(InfoMessage.LOSE, MODAL_BUTTON_TEXT, createRestartGame(words));
        }    
      }
    }
  };

  const onRestartButtonClick = () => {
    const restartGame = createRestartGame(words);
    restartGame();
  };

  restartButtonEl.addEventListener('click', onRestartButtonClick);
  document.addEventListener('keydown', onWordKeydown);
};

initGame();
