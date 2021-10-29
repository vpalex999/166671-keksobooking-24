import { displayNoticeList } from './map.js';

// TODO:
// Проверить все атрибуты(название, тип данных), полученные от сервера

fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((noticeList) => {
    console.log(noticeList[0]);
    displayNoticeList(noticeList);
  });

