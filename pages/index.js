import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormModal from '../components/FormModal.js';
import LbModal from '../components/LbModal.js';
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
      const lbModal = new LbModal('.modal_type_lightbox', item);
      lbModal.open();
      }
    );
    const placeElement = place.generateCard();
    placesList.addItem(placeElement);
    }
  },
  places
);

const titleModal = new FormModal({
  modalSelector: '.modal_type_title',
  submitHandler: (form) => {
    form.preventDefault();
    info.setUserInfo(nameInput.value, descInput.value);
    titleModal.close();
  }
});

const placeModal = new FormModal({
  modalSelector: '.modal_type_place',
  submitHandler: (form) => {
    form.preventDefault();
    const newName = placeInput.value;
    const newLink = linkInput.value;

    const newPlace = new Section({
      renderer: () => {
        const place = new Card({
          name: newName,
          link: newLink
        },
        '#place-template',
        () => {
          const lbModal = new LbModal('.modal_type_lightbox', { name: newName, link: newLink });
          lbModal.open();
          }
        );
        const placeElement = place.generateCard();

        newPlace.addItem(placeElement);
        }
      },
      places
    );

    newPlace._renderer();
    placeModal.close();
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

