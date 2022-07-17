import './styles/styles.less';

import { getWords } from './modules/words';

const init = async () => {
  const words = await getWords();
  console.log(words);
};

init();

