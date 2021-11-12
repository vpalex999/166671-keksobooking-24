import { setAddressInput, setActiveState } from './form.js';
import { setActiveStateFormMapFilters } from './form-filters.js';
import { createCardElement } from './template.js';
import { displayError } from './error.js';
import { getData } from './api.js';

const MAXIMUM_DISPLAY_NOTICE = 10;
const MAIN_PIN_ICON_SIZE_POINT_X = 52;
const MAIN_PIN_ICON_SIZE_POINT_Y = 52;

const MAIN_PIN_ICON_ANCHOR_POINT_X = 26;
const MAIN_PIN_ICON_ANCHOR_POINT_Y = 26;

const REGULAR_ICON_SIZE_POINT_X = 40;
const REGULAR_ICON_SIZE_POINT_Y = 40;

const REGULAR_ICON_ANCHOR_POINT_X = 20;
const REGULAR_ICON_ANCHOR_POINT_Y = 40;

const InitPoint = {
  LAT_LNG: {
    lat: 35.68950,
    lng: 139.69171,
  },
  ZOOM: 10,
};

const dataMarkerList = [];

const getMarkerDataList = () => dataMarkerList;

const map = L.map('map-canvas')
  .setView(InitPoint.LAT_LNG, InitPoint.ZOOM);

const loadOpenstreetMap = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  )
    .addTo(map);
};

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [MAIN_PIN_ICON_SIZE_POINT_X, MAIN_PIN_ICON_SIZE_POINT_Y],
  iconAnchor: [MAIN_PIN_ICON_ANCHOR_POINT_X, MAIN_PIN_ICON_ANCHOR_POINT_Y],
});

const regularPinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [REGULAR_ICON_SIZE_POINT_X, REGULAR_ICON_SIZE_POINT_Y],
  iconAnchor: [REGULAR_ICON_ANCHOR_POINT_X, REGULAR_ICON_ANCHOR_POINT_Y],
});

const addressMarker = L.marker(
  InitPoint.LAT_LNG,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);


const getRegularMarker = ({ location }) =>
  L.marker(
    location,
    {
      icon: regularPinIcon,
    },
  );


const createCustomRegularMarker = (notice) =>
  getRegularMarker(notice)
    .bindPopup(createCardElement(notice));

const onAddressInput = (evt) => setAddressInput(evt.target.getLatLng());

const initAddressMarker = () => {
  addressMarker.addTo(map);
  addressMarker.addEventListener('moveend', onAddressInput);
};

const setMapView = () => map.setView(InitPoint.LAT_LNG, InitPoint.ZOOM);

const resetAddressMarker = () => {
  setMapView();
  addressMarker.setLatLng(InitPoint.LAT_LNG);
  setAddressInput(addressMarker.getLatLng());
};


const closeAllPopup = () => dataMarkerList.forEach((marker) => marker.closePopup());

const displaySelectedMarkerList = (markerList) => {
  closeAllPopup();
  dataMarkerList.forEach((marker) => {
    const isMarkerDisplay = markerList
      .slice(0, MAXIMUM_DISPLAY_NOTICE)
      .includes(marker);

    if (isMarkerDisplay) {
      marker.addTo(map);
    } else {
      marker.remove();
    }
  });
};

const displayInitData = () => {
  dataMarkerList
    .slice(0, MAXIMUM_DISPLAY_NOTICE)
    .forEach((marker) => marker.addTo(map));

  dataMarkerList
    .slice(MAXIMUM_DISPLAY_NOTICE)
    .forEach((marker) => marker.remove());
};

const initMarkerList = (noticeList) => {
  noticeList.forEach((notice) => {
    const marker = createCustomRegularMarker(notice);
    dataMarkerList.push(marker);
    displayInitData();
  });
};

const initData = (noticeList) => {
  initMarkerList(noticeList);
  displayInitData();
};

const onLoadData = (noticeList) => {
  setActiveStateFormMapFilters();
  initData(noticeList);
};

const onLoadMap = () => {
  setActiveState();
  getData(onLoadData, displayError);
};

const initMap = () => {
  loadOpenstreetMap();
  initAddressMarker();
  map.whenReady(onLoadMap);
};

const getMap = () => map;

export {
  getMap,
  initMap,
  displayInitData,
  resetAddressMarker,
  closeAllPopup,
  displaySelectedMarkerList,
  getMarkerDataList
};
