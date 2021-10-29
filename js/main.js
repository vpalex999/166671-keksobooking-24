import { displayNoticeList } from './map.js';
import { getData } from './api.js';
import {displayError} from './error.js';

getData(displayNoticeList, displayError);