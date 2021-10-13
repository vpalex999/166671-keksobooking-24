import { createWizardNotice } from './data.js';
import './template.js';

const noticeList = () => Array.from({ length: 10 }, createWizardNotice);
noticeList();
