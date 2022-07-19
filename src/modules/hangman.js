import { showElement, hideElement } from './util';

const state = {
  currentPartIndex: 0,
};

const hangmanEl = document.querySelector('.hangman');
const partEls = hangmanEl.querySelectorAll('.hangman__part');

const showHangmanPart = () => {
  const currentPart = partEls[state.currentPartIndex];
  const isPartLast = (state.currentPartIndex === partEls.length - 1);

  showElement(currentPart);
  
  state.currentPartIndex = isPartLast ? state.currentPartIndex : ++state.currentPartIndex;
};

const resetHangman = () => {
  partEls.forEach((partEl) => hideElement(partEl));
  state.currentPartIndex = 0;
};

export { showHangmanPart, resetHangman };