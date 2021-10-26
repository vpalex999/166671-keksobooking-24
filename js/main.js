import { createCustomRegularMarker } from './map.js';
import { createWizardNotice } from './data.js';

const noticeList = Array.from({length: 5}, createWizardNotice);
noticeList.map((notice) => createCustomRegularMarker(notice));

