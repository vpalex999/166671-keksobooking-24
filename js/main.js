import { map, layer, displayNoticeList } from './map.js';
import { setActiveState, setActiveStateFormMapFilters } from './form.js';
import { getData } from './api.js';
import { displayError } from './error.js';

const onLoadMap = () => {
  setActiveState(map);
  getData(
    (noticeList) => {
      displayNoticeList(noticeList);
      setActiveStateFormMapFilters();
    },
    (message) => displayError(message));
};

layer.on('load', onLoadMap);
