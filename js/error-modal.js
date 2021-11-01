import { createErrorModalElement } from './template.js';
import { isEscapeKey } from './util.js';

const errorModalElement = createErrorModalElement();

const onClickErrorModal = (evt) => {
  const isClickOnErrorModal = evt.target.classList.contains('error');
  const isClickOnSubmitErrorButton = evt.target.classList.contains('error__button');
  if (isClickOnErrorModal || isClickOnSubmitErrorButton) {
    document.body.removeChild(errorModalElement);
  }
};

const onEscapeErrorModal = (evt) => {
  if (isEscapeKey(evt)) {
    document.body.removeChild(errorModalElement);
  }
};

const openErrorModal = () => {
  errorModalElement.addEventListener('click', onClickErrorModal, { once: true });
  document.addEventListener('keydown', onEscapeErrorModal, { once: true });
  document.body.insertAdjacentElement('beforeend', errorModalElement);
};

export { openErrorModal };
