import './index.css';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  validateOptions,
  places,
  editButton,
  placeButton,
  inputs
} from '../utils/constants.js';

const [ nameInput, descInput, placeInput, linkInput ] = inputs;

const info = new UserInfo({
  name: '.profile__name',
  desc: '.profile__desc'
});

const placesList = new Section({
  items: initialCards,
  renderer: (item) => {
    const place = new Card(
    item,
    '#place-template',
    () => {
      const ImagePopup = new PopupWithImage('.modal_type_lightbox');
      ImagePopup.open(item);
      }
    );
    const placeElement = place.generateCard();
    placesList.addItem(placeElement);
    }
  },
  places
);

const titleModal = new PopupWithForm({
  modalSelector: '.modal_type_title',
  submitHandler: ({ nickname, desc }) => {
    info.setUserInfo(nickname, desc);
  }
});

const placeModal = new PopupWithForm({
  modalSelector: '.modal_type_place',
  submitHandler: (data) => {
    const newPlace = new Section({
      renderer: () => {
        const place = new Card(
        data,
        '#place-template',
        () => {
          const ImagePopup = new PopupWithImage('.modal_type_lightbox');
          ImagePopup.open(data);
          }
        );
        const placeElement = place.generateCard();

        newPlace.addItem(placeElement);
        }
      },
      places
    );

    newPlace._renderer();
  }
});

const titleValidator = new FormValidator('.modal_type_title', validateOptions);
titleValidator.enableValidation();

const placeValidator = new FormValidator('.modal_type_place', validateOptions);
placeValidator.enableValidation();

editButton.addEventListener('click', () => {
  const { nameValue, descValue } = info.getUserInfo();
  nameInput.value = nameValue;
  descInput.value = descValue;

  titleValidator.resetError();
  titleModal.open();
});

placeButton.addEventListener('click', () => {
  placeValidator.resetError();
  placeModal.open();
});

placesList.renderItems();

