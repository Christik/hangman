const DEFAULT_DELAY = 2000;
const SHOWING_CLASS = 'notice_shown';

const state = {
  timerId: null,
};

const templateNotice = document.querySelector('#notice').content;
const noticeEl = templateNotice.querySelector('.notice').cloneNode(true);
const textEl = noticeEl.querySelector('.notice__text');

const hideNotice = () => {
  noticeEl.remove();
};

const showNotice = (text, delay = DEFAULT_DELAY) => {
  clearTimeout(state.timerId);

  textEl.textContent = text;
  document.body.append(noticeEl);
  noticeEl.classList.add(SHOWING_CLASS);

  state.timerId = setTimeout(hideNotice, delay);
};

export { showNotice };
