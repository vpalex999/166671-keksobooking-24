import { setAddressInput } from './form.js';
import { createCardElement } from './template.js';

const dataMarkerList = [];

const INIT_POINT = {
  LatLng: {
    lat: 35.68950,
    lng: 139.69171,
  },
  Zoom: 10,
};

const map = L.map('map-canvas')
  .setView(INIT_POINT.LatLng, INIT_POINT.Zoom);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
)
  .addTo(map);

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
    .addTo(map)
    .bindPopup(createCardElement(notice));

const onAddressInput = (evt) => {
  setAddressInput(evt.target.getLatLng());
};

addressMarker.addTo(map);
addressMarker.addEventListener('moveend', onAddressInput);

const setMapView = () => {
  map.setView(INIT_POINT.LatLng, INIT_POINT.Zoom);
};

const initAddressMarker = () => {
  setMapView();
  addressMarker.setLatLng(INIT_POINT.LatLng);
  setAddressInput(addressMarker.getLatLng());
};

const displayNoticeList = (noticeList) => {

  noticeList.forEach((notice) => {
    const marker = createCustomRegularMarker(notice);
    dataMarkerList.push(marker);
  });
};

const closeAllPopup = () => dataMarkerList.forEach((marker) => marker.closePopup());


export { map, displayNoticeList, initAddressMarker, closeAllPopup };
