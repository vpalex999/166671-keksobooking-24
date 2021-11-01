const URL_GET_DATA = 'https://24.javascript.pages.academy/keksobooking/data';

const getData = (onSucces, onFail) => {
  fetch(URL_GET_DATA)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} - ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((noticeList) => {
      onSucces(noticeList);
    })
    .catch((error) => onFail(`Ошибка получения данных. ${error}`));
};

const sendData = (onSucces, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSucces();
      } else {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    })
    .catch((error) => onFail(`Не удалось отправить данные. ${error}`));
};

export { getData, sendData };
