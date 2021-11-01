import { createSuccesModalElement } from './template.js';
import { isEscapeKey } from './util.js';

const succesModalElement = createSuccesModalElement();

const onClickSuccesModal = (evt) => {
  document.body.removeChild(evt.target);
};

const onEscapeSuccesModal = (evt) => {
  if (isEscapeKey(evt)) {
    document.body.removeChild(succesModalElement);
  }
};

const openSuccessModal = () => {
  succesModalElement.addEventListener('click', onClickSuccesModal, { once: true });
  document.addEventListener('keydown', onEscapeSuccesModal, { once: true });
  document.body.insertAdjacentElement('beforeend', succesModalElement);
};

export { openSuccessModal };
