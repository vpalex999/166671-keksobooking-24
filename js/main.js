import { map, displayNoticeList } from './map.js';
import { setActiveState, setInactiveState } from './form.js';
import { getData } from './api.js';
import { displayError } from './error.js';

setInactiveState();
map.on('load', setActiveState(map));
getData(displayNoticeList, displayError);
