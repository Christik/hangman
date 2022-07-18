import './styles/styles.less';

import { getWords } from './modules/data';
import { getRandomElementFromArray, isKeyRussianLetter } from './modules/util';
import { renderWord, checkLetter, isWordCorrect, areAttemptsOver, resetLetters } from './modules/word';
import { openModal } from './modules/modal';

const ATTEMPT_COUNT = 6;
const MODAL_BUTTON_TEXT = 'Играть';

const InfoMessage = {
  WIN: 'Поздравляем,\r\nты выиграл!',
  LOSE: 'В следующий раз\r\nповезет больше ;)',
};

const state = {
  currentWord: '',
};

const updateCurrentWord = (words) => (state.word = getRandomElementFromArray(words));

const restartGame = (words) => {
  return () => {
    const newWord = updateCurrentWord(words);

    resetLetters();
    renderWord(newWord);
  };
};

const initGame = async () => {
  const words = await getWords();
  updateCurrentWord(words);
  
  renderWord(state.word);

  const onWordKeydown = (evt) => {
    if (isKeyRussianLetter(evt)) {
      const letter = evt.key;
      
      checkLetter(letter, state.word);
  
      if (isWordCorrect(state.word)) {
        openModal(InfoMessage.WIN, MODAL_BUTTON_TEXT, restartGame(words));
        return;
      }

      if (areAttemptsOver(ATTEMPT_COUNT)) {
        openModal(InfoMessage.LOSE, MODAL_BUTTON_TEXT, restartGame(words));
      }    
    }
  };

  document.addEventListener('keydown', onWordKeydown);
};

initGame();
