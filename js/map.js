import { setAddressInput } from './form.js';
import { createCardElement } from './template.js';

const map = L.map('map-canvas')
  .setView({
    lat: 35.68950,
    lng: 139.69171,
  }, 10);

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

const mainPinMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.69171,
  },
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

mainPinMarker.addTo(map);
mainPinMarker.addEventListener('moveend', onAddressInput);

const displayNoticeList = (noticeList) => {
  noticeList.forEach((notice) => createCustomRegularMarker(notice));
};

export { map, displayNoticeList };
