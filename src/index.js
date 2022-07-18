import './styles/styles.less';

import { getWords } from './modules/data';
import { renderWord, checkLetter, isWordCorrect, areAttemptsOver, resetLetters } from './modules/word';
import { openModal } from './modules/modal';

const ATTEMPT_COUNT = 6;
const MODAL_BUTTON_TEXT = 'Играть';

const InfoMessage = {
  WIN: 'Поздравляем,\r\nты выиграл!',
  LOSE: 'В следующий раз\r\nтебе повезет больше ;)',
};

const restartGame = (word) => {
  return () => {
    resetLetters();
    renderWord(word);
  };
};

const initGame = async () => {
  const words = await getWords();
  const word = words[0];
  
  renderWord(word);

  const onWordKeydown = (evt) => {
    const isRussianLetter = evt.key.match(/[а-яА-Я]/);

    if (isRussianLetter) {
      const letter = evt.key;
      
      checkLetter(letter, word);
  
      if (isWordCorrect(word)) {
        openModal(InfoMessage.WIN, MODAL_BUTTON_TEXT, restartGame(word));
        return;
      }

      if (areAttemptsOver(ATTEMPT_COUNT)) {
        openModal(InfoMessage.LOSE, MODAL_BUTTON_TEXT, restartGame(word));
      }    
    }
  };

  document.addEventListener('keydown', onWordKeydown);
};

initGame();
