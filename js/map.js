import { setActiveState, setInactiveState, setAddressInput } from './form.js';
import { createCardElement } from './template.js';

setInactiveState();

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


const getRegularMarker = (fromAddress) => {
  const latLng = fromAddress.split(',').map((item) => item.trim());
  const [lat, lng] = latLng;
  return L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      icon: regularPinIcon,
    },
  );
};

const createCustomRegularMarker = (notice) =>
  getRegularMarker(notice.offer.address)
    .addTo(map)
    .bindPopup(createCardElement(notice));

const onAddressInput = (evt) => {
  setAddressInput(evt.target.getLatLng());
};

map.on('load', setActiveState(map));
mainPinMarker.addTo(map);
mainPinMarker.addEventListener('moveend', onAddressInput);

export { createCustomRegularMarker };
