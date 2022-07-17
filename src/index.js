import './styles/styles.less';

import { getWords } from './modules/data';
import { renderWord } from './modules/word';

const init = async () => {
  const words = await getWords();
  const word = words[0];
  
  renderWord(word);
};

init();

