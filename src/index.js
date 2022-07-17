import './styles/styles.less';

import { getWords } from './modules/data';
import { renderWord, checkLetter } from './modules/word';

const init = async () => {
  const words = await getWords();
  const word = words[0];
  
  renderWord(word);

  const onWordKeydown = (evt) => {
    const isRussianLetter = evt.key.match(/[а-яА-Я]/);

    if (isRussianLetter) {
      const letter = evt.key;
      
      checkLetter(letter, word);
    }
  };

  document.addEventListener('keydown', onWordKeydown);
};

init();

