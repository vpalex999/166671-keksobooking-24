import { map, initData } from './map.js';
import { setActiveState, setActiveStateFormMapFilters } from './form.js';
import { getData } from './api.js';
import { displayError } from './error.js';

const onLoadData = (noticeList) => {
  setActiveStateFormMapFilters();
  initData(noticeList);
};

const onLoadMap = () => {
  setActiveState(map);
  getData(onLoadData, displayError);
};

map.whenReady(onLoadMap);
