import { setAddressInput, setActiveState } from './form.js';
import { setActiveStateFormMapFilters } from './form-filters.js';
import { createCardElement } from './template.js';
import { displayError } from './error.js';
import { getData } from './api.js';

const MAXIMUM_DISPLAY_NOTICE = 10;


const dataMarkerList = [];
const getMarkerDataList = () => [...dataMarkerList];

const INIT_POINT = {
  LatLng: {
    lat: 35.68950,
    lng: 139.69171,
  },
  Zoom: 10,
};

const map = L.map('map-canvas')
  .setView(INIT_POINT.LatLng, INIT_POINT.Zoom);

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
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const regularPinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const addressMarker = L.marker(
  INIT_POINT.LatLng,
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

const onAddressInput = (evt) => {
  setAddressInput(evt.target.getLatLng());
};

const initAddressMarker = () => {
  addressMarker.addTo(map);
  addressMarker.addEventListener('moveend', onAddressInput);
};

const setMapView = () => {
  map.setView(INIT_POINT.LatLng, INIT_POINT.Zoom);
};

const resetAddressMarker = () => {
  setMapView();
  addressMarker.setLatLng(INIT_POINT.LatLng);
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
  if (dataMarkerList.length > MAXIMUM_DISPLAY_NOTICE) {
    dataMarkerList
      .slice(MAXIMUM_DISPLAY_NOTICE)
      .forEach((marker) => marker.remove());
  }
  dataMarkerList
    .slice(0, MAXIMUM_DISPLAY_NOTICE)
    .forEach((marker) => marker.addTo(map));
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
