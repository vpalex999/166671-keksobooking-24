
const formNoticeElement = document.querySelector('.ad-form');

const setInactiveStateFormNotice = () => {
    formNoticeElement.classList.add('ad-form--disabled');

    const fieldsetListElement = formNoticeElement.querySelectorAll('fieldset');
    fieldsetListElement.forEach((fieldset) => fieldset.setAttribute('disabled', true));
};

export {setInactiveStateFormNotice};
