import { map, displayNoticeList } from './map.js';
import { setActiveState, setActiveStateFormMapFilters } from './form.js';
import { getData } from './api.js';
import { displayError } from './error.js';

const MAXIMUM_DISPLAY_NOTICE = 10;


const onLoadData = (noticeList) => {
  setActiveStateFormMapFilters();
  const cutNoticeList = noticeList.slice(0, MAXIMUM_DISPLAY_NOTICE);
  displayNoticeList(cutNoticeList);
};

const onLoadMap = () => {
  setActiveState(map);
  getData(onLoadData, displayError);
};

map.whenReady(onLoadMap);
