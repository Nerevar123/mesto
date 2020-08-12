import { initialCards, validateOptions } from './data.js';
import { Card, lbModal } from './Card.js';
import FormValidator from './FormValidator.js';
import { showModal } from './utils.js';

const places = document.querySelector('.places__list');
const titleModal = document.querySelector('.modal_type_title');
const placeModal = document.querySelector('.modal_type_place');
const editButton = document.querySelector('.profile__edit-btn');
const placeButton = document.querySelector('.profile__add-btn');
const nameProfile = document.querySelector('.profile__name');
const descProfile = document.querySelector('.profile__desc');
const formTitle = document.forms.profile;
const formPlace = document.forms.place;
const closeTitleButton = titleModal.querySelector('.modal__close-btn');
const closePlaceButton = placeModal.querySelector('.modal__close-btn');
const closeLBButton = lbModal.querySelector('.modal__close-btn');
const nameInput = formTitle.elements.nickname;
const descInput = formTitle.elements.desc;
const placeInput = formPlace.elements.place;
const linkInput = formPlace.elements.link;

const createPlace = (place) => {
  const card = new Card(place, '#place-template');
  const cardElement = card.generateCard();

  places.prepend(cardElement);
};

initialCards.reverse().forEach((place) => {
  createPlace (place);
});

const titleValidator = new FormValidator(titleModal, validateOptions);
titleValidator.enableValidation();

const placeValidator = new FormValidator(placeModal, validateOptions);
placeValidator.enableValidation();

const formTitleSubmitHandler = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descProfile.textContent = descInput.value;

  showModal(titleModal);
};

const formPlaceSubmitHandler = (evt) => {
  evt.preventDefault();
  const place = {};
  place.name = placeInput.value;
  place.link = linkInput.value;

  createPlace (place);
  showModal(placeModal);
};

editButton.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  descInput.value = descProfile.textContent;
  titleValidator.resetError();
  showModal(titleModal);
});

placeButton.addEventListener('click', () => {
  formPlace.reset();
  placeValidator.resetError();
  showModal(placeModal);
});

closeTitleButton.addEventListener('click', () => showModal(titleModal));
closePlaceButton.addEventListener('click', () => showModal(placeModal));
closeLBButton.addEventListener('click', () => showModal(lbModal));
formTitle.addEventListener('submit', formTitleSubmitHandler);
formPlace.addEventListener('submit', formPlaceSubmitHandler);
