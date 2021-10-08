import { createWizardNotice } from './data.js';

const noticeList = () => Array.from({ length: 10 }, createWizardNotice);
noticeList();
