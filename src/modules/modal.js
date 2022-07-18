import { isKeyEscape } from './util';

const templateModal = document.querySelector('#modal').content;
const modalEl = templateModal.querySelector('.modal').cloneNode(true);
const textEl = modalEl.querySelector('.modal__text');
const closeButtonEl = modalEl.querySelector('.modal__close');

const openModal = (text) => {
  textEl.textContent = text;
  document.body.append(modalEl);
  document.addEventListener('keydown', onModalEscKeydown);
};

const closeModal = () => {
  modalEl.remove();
  document.removeEventListener('keydown', onModalEscKeydown);
};

// В данном случае функция объявлена декларативно,
// чтобы благодаря всплытию она была доступна выше по коду
function onModalEscKeydown (evt) {
  if (isKeyEscape(evt)) {
    closeModal();
  }
}

const onCloseButtonClick = closeModal;

const onModalClick = (evt) => {
  const isAreaToClose = evt.target.classList.contains('modal');
  
  if (isAreaToClose) {
    closeModal();
  }
};

closeButtonEl.addEventListener('click', onCloseButtonClick);
modalEl.addEventListener('click', onModalClick);

export { openModal };