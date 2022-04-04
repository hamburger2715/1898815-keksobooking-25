import {createSimilarAdverts} from './data.js';

const mapBlock = document.querySelector('#map-canvas');
const similarAdverts = createSimilarAdverts(2);
const popupTemplate = document.querySelector('#card').content;
const popups = [];

similarAdverts.forEach(({author, offer}) => {
  const setTypeText = () => {
    switch (offer.type) {
      case 'flat':
        return 'Квартира ';
      case 'bungalow':
        return 'Бунгало ';
      case 'house':
        return 'Дом ';
      case 'palace':
        return 'Дворец ';
      case 'hotel':
        return 'Отель ';
    }
  };

  const popupElement = popupTemplate.cloneNode(true);

  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent = offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = setTypeText();
  popupElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkIn}, выезд до ${offer.checkOut}`;
  popupElement.querySelector('.popup__features').textContent = offer.features.join(', ');
  popupElement.querySelector('.popup__avatar').src = author.avatar;
  popupElement.querySelector('.popup__description').textContent = offer.description;

  const photoContainer = popupElement.querySelector('.popup__photos');
  const photoNode = photoContainer.querySelector('.popup__photo');
  photoNode.src = offer.photos[0];

  if (offer.photos.length > 1) {
    for (let i = 1; i < offer.photos.length; i++) {
      const photoClone = photoNode.cloneNode(false);
      photoClone.src = offer.photos[i];
      photoContainer.append(photoClone);
    }
  }

  if (!popupElement.querySelector('.popup__description').textContent) {
    popupElement.querySelector('.popup__description').classList.add('hidden');
  }
  popups.push(popupElement);
});


mapBlock.append(popups[0]);