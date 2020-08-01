const places = document.querySelector('.places__list');
const titleModal = document.querySelector('.modal_type_title');
const placeModal = document.querySelector('.modal_type_place');
const lbModal = document.querySelector('.modal_type_lightbox');
const editButton = document.querySelector('.profile__edit-btn');
const placeButton = document.querySelector('.profile__add-btn');
const nameProfile = document.querySelector('.profile__name');
const descProfile = document.querySelector('.profile__desc');
const placeTemplate = document.querySelector('#place-template').content;
const formTitle = document.forms.profile;
const formPlace = document.forms.place;
const closeTitleButton = titleModal.querySelector('.modal__close-btn');
const closePlaceButton = placeModal.querySelector('.modal__close-btn');
const closeLBButton = lbModal.querySelector('.modal__close-btn');
const nameInput = formTitle.elements.nickname;
const descInput = formTitle.elements.desc;
const placeInput = formPlace.elements.place;
const linkInput = formPlace.elements.link;
const lbImage = document.querySelector('.modal__image');
const lbCaption = document.querySelector('.modal__caption');

const toggleLike = (evt) => {
  evt.target.classList.toggle('place__like-btn_active');
};

const deleteCard = (evt) => {
  evt.target.closest('.place').remove();
};

const createPlace = (placeName, placeLink) => {
  const placeElem = placeTemplate.cloneNode(true);
  const place = placeElem.querySelector('.place');
  const placeImage = placeElem.querySelector('.place__image');
  placeElem.querySelector('.place__title').textContent = placeName;
  placeImage.src = placeLink;
  placeImage.alt = placeName;
  placeElem.querySelector('.place__like-btn').addEventListener('click', (evt) => toggleLike(evt));
  placeElem.querySelector('.place__delete-btn').addEventListener('click', (evt) => deleteCard(evt));
  place.addEventListener('click', (evt) => {
    if (evt.target.closest('.place__img-wrapper')) {
      showLbModal(placeName, placeLink);
    };
  });
  renderPlace (placeElem);
};

const renderPlace = (place) => {
  places.prepend(place);
};

initialCards.reverse().forEach((place) => {
  createPlace (place.name, place.link);
});

const showLbModal = (placeName, placeLink) => {
  showModal(lbModal);
  lbImage.src = placeLink;
  lbCaption.textContent = placeName;
  lbImage.alt = lbCaption.textContent;
};

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

const resetError = (modal) => {
  const submitButton = modal.querySelector('.modal__save-btn');
  const inputs = Array.from(modal.querySelectorAll('.modal__input'));
  inputs.forEach((input) => {
    if (modal === placeModal) {
      hideInputError(modal, input, obj.inputErrorClass, obj.errorClass);
    } else {
      checkInput(modal, inputs, input, submitButton, obj);
    };
  });
};

const showModal = (modal) => {
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
  createPlace (placeInput.value, linkInput.value);
  showModal(placeModal);
};

editButton.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  descInput.value = descProfile.textContent;
  showModal(titleModal);
  resetError(titleModal);
});
placeButton.addEventListener('click', () => {
  showModal(placeModal);
  resetError(placeModal);
  formPlace.reset();
});
closeTitleButton.addEventListener('click', () => showModal(titleModal));
closePlaceButton.addEventListener('click', () => {
  showModal(placeModal);
});
closeLBButton.addEventListener('click', () => showModal(lbModal));
formTitle.addEventListener('submit', formTitleSubmitHandler);
formPlace.addEventListener('submit', formPlaceSubmitHandler);
