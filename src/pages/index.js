import './index.css';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import {
  validateOptions,
  places,
  avatarLink,
  editButton,
  placeButton,
  avatarButton,
  inputs
} from '../utils/constants.js';

const [ nameInput, descInput, placeInput, linkInput ] = inputs;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: '793e9e42-5ad3-4803-88e8-acbb4feac8c0',
    'Content-Type': 'application/json'
  }
});

const info = new UserInfo({
  name: '.profile__name',
  desc: '.profile__desc',
  avatar: '.profile__avatar'
});

const handleLike = (evt, id, elem) => {
  if (evt.target.classList.contains('place__like-btn_active')) {
    api.deleteLike(id)
    .then((res) => {
      evt.target.nextElementSibling.textContent = res.likes.length;
      elem.toggleLike();
    })
    .catch(err => console.log(err));
  } else {
    api.putLike(id)
    .then((res) => {
      evt.target.nextElementSibling.textContent = res.likes.length;
      elem.toggleLike();
    })
    .catch(err => console.log(err));
  }
};

const handleCardClick = (elem) => {
  const ImagePopup = new PopupWithImage('.modal_type_lightbox');

  ImagePopup.open(elem);
};

const handleDeleteIcon = (id, elem) => {
  const confirmModal = new PopupWithForm({
    modalSelector: '.modal_type_confirm',
    submitHandler: () => {
      confirmModal.setButtonPhrase('Удаление...');

      api.deleteCard(id)
      .then (() => {
        elem.deleteCard();
        confirmModal.close();
      })
      .catch(err => console.log(err));
    }
  });

  confirmModal.open();
};

Promise.all([api.getInitCards(),api.getUserInfo()])
.then(([ cards, data ]) => {
    const placesList = new Section({
      items: cards,
      renderer: (item) => {
        const place = new Card({
          data: item,
          handleCardClick: () => handleCardClick(item),
          handleLikeClick: (evt, id) => handleLike(evt, id, place),
          handleDeleteIconClick: (id) => handleDeleteIcon(id, place)
        },
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
    placesList.renderItems();

    info.setUserInfo(data.name, data.about, data.avatar);
})
.then(() => {
  const titleModal = new PopupWithForm({
    modalSelector: '.modal_type_title',
    submitHandler: ({ nickname, desc }) => {
      titleModal.setButtonPhrase('Сохранение...');

      api.patchUserInfo({ name: nickname, about: desc })
      .then(data => {
        info.setUserInfo(data.name, data.about, data.avatar);
        titleModal.close();
      })
      .catch(err => console.log(err));
    }
  });

  const avatarModal = new PopupWithForm({
    modalSelector: '.modal_type_avatar',
    submitHandler: (input) => {
      avatarModal.setButtonPhrase('Сохранение...');

      api.patchAvatar({avatar: input.avatar})
      .then(input => {
        avatarLink.src = input.avatar;
        avatarModal.close();
      })
      .catch(err => console.log(err));
    }
  });

  const placeModal = new PopupWithForm({
    modalSelector: '.modal_type_place',
    submitHandler: (data) => {
      placeModal.setButtonPhrase('Создание...');

      api.addCard(data)
      .then(data => {
        const newPlace = new Section({
          renderer: () => {
            const place = new Card({
              data: data,
              handleCardClick: () => handleCardClick(item),
              handleLikeClick: (evt, id) => handleLike(evt, id, place),
              handleDeleteIconClick: (id) => handleDeleteIcon(id, place)
            },
            '#place-template',
            );
            const placeElement = place.generateCard();

            newPlace.addItem(placeElement);
            }
          },
          places
        );
        newPlace._renderer();

        placeModal.close();
      })
      .catch(err => console.log(err));
    }
  });

  const titleValidator = new FormValidator('.modal_type_title', validateOptions);
  titleValidator.enableValidation();

  const placeValidator = new FormValidator('.modal_type_place', validateOptions);
  placeValidator.enableValidation();

  const avatarValidator = new FormValidator('.modal_type_avatar', validateOptions);
  avatarValidator.enableValidation();

  editButton.addEventListener('click', () => {
    const { nameValue, descValue } = info.getUserInfo();
    nameInput.value = nameValue;
    descInput.value = descValue;

    titleValidator.resetError();
    titleModal.open();
  });

  avatarButton.addEventListener('click', () => {
    avatarValidator.resetError();
    avatarModal.open();
  });

  placeButton.addEventListener('click', () => {
    placeValidator.resetError();
    placeModal.open();
  });

})
.catch(err => console.log(err));
