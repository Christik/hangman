import { showNotice } from './notice';

const URL = 'https://raw.githubusercontent.com/Christik/hangman/main/src/data.json';
const MESSAGE_ERROR = 'Упс... Что-то пошло не так. Попробуйте обновить страницу.';
const NOTICE_DELAY = 5000;

const getWords = async () => {
  try {
    const response = await fetch(URL)
    
    if (response.ok) {
      const data = await response.json();
      return data;
    }

    showNotice(MESSAGE_ERROR)
    return [];
  } catch(err) {
    showNotice(`${MESSAGE_ERROR} ${err.message}`, NOTICE_DELAY)
    return [];
  }
};

export { getWords };