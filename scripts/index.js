import { initialCards, validateOptions } from './data.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

const closeModalWithEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector('.modal_opened');
    if (openedModal) {
      showModal(openedModal);
    };
  };
};

const closeModalWithClick = (evt) => {
  if (evt.target.classList.contains('modal')) {
    showModal(evt.target);
  };
};

export const showModal = (modal) => {
  modal.classList.toggle('modal_opened');
  if (modal.classList.contains('modal_opened')) {
    document.addEventListener('mousedown', closeModalWithClick);
    document.addEventListener('keydown', closeModalWithEsc);
  } else {
    document.removeEventListener('mousedown', closeModalWithClick);
    document.removeEventListener('keydown', closeModalWithEsc);
  };
};

const formTitleSubmitHandler = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descProfile.textContent = descInput.value;

  showModal(titleModal);
};

const formPlaceSubmitHandler = (evt) => {
  evt.preventDefault();
  const place = [];
  place.name = placeInput.value;
  place.link = linkInput.value;

  createPlace (place);
  showModal(placeModal);
};

editButton.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  descInput.value = descProfile.textContent;
  showModal(titleModal);
  titleValidator.resetError();
});

placeButton.addEventListener('click', () => {
  showModal(placeModal);
  formPlace.reset();
  placeValidator.resetError();
});

closeTitleButton.addEventListener('click', () => showModal(titleModal));
closePlaceButton.addEventListener('click', () => showModal(placeModal));
formTitle.addEventListener('submit', formTitleSubmitHandler);
formPlace.addEventListener('submit', formPlaceSubmitHandler);
