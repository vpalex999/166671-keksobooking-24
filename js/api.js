const URL_API = 'https://24.javascript.pages.academy';
const URI_GET_DATA = '/keksobooking/data';
const URI_POST_DATA = '/keksobooking';

const getData = (onSucces, onFail) => {
  fetch(`${URL_API}${URI_GET_DATA}`)
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
    `${URL_API}${URI_POST_DATA}`,
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
