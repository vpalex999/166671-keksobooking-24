const URL_GET_DATA = 'https://24.javascript.pages.academy/keksobooking/data';

const getData = (onSucces, onFail) => {
  fetch(URL_GET_DATA)
  .then((response) => {
    if (response.ok){
      return response;
    }
    throw new Error(`Ошибка получения данных. ${response.status} - ${response.statusText}`)
  })
  .then((response) => response.json())
  .then((noticeList) => {
    onSucces(noticeList);
  })
  .catch((error) => {
    onFail(error)
  });
};
  
export {getData};
