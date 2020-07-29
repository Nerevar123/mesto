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
const nameInput = formTitle.elements.name;
const descInput = formTitle.elements.desc;
const placeInput = formPlace.elements.place;
const linkInput = formPlace.elements.link;
nameInput.value = nameProfile.textContent;
descInput.value = descProfile.textContent;

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
  placeImage.alt = 'Загруженное изображение';
  placeElem.querySelector('.place__like-btn').addEventListener('click', (evt) => toggleLike(evt));
  placeElem.querySelector('.place__delete-btn').addEventListener('click', (evt) => deleteCard(evt));
  place.addEventListener('click', (evt) => {
    if (evt.target.closest('.place__img-wrapper')) {
      showLbModal(event);
    };
  });
  renderPlace (placeElem);
};

const renderPlace = (place) => {
  places.prepend(place);
};

initialCards.reverse().forEach((place) => {
  createPlace (place.name, place.link);
  places.querySelector('.place__image').alt = place.name;
});

const showLbModal = (evt) => {
  showModal(lbModal);
  const lbImage = document.querySelector('.modal__image');
  const lbCaption = document.querySelector('.modal__caption');
  if (evt.target.classList.contains('place__img-wrapper')) {
    lbImage.src = evt.target.firstElementChild.src;
    lbCaption.textContent = evt.target.nextElementSibling.textContent;
  } else {
    lbImage.src = evt.target.src;
    lbCaption.textContent = evt.target.parentElement.nextElementSibling.textContent;
  };
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

const resetError = (modal) => {;
  const inputs = Array.from(modal.querySelectorAll('.modal__input'));
  inputs.forEach((input) => {
    hideInputError(modal, input, obj.inputErrorClass, obj.ErrorClass);
    isEmpty(modal, input);
  });
};

const showModal = (modal) => {
  modal.classList.toggle('modal_opened');
  if (modal.classList.contains('modal_opened') && !modal.classList.contains('modal_type_lightbox')) {
    if (modal === titleModal) {
      nameInput.value = nameProfile.textContent;
      descInput.value = descProfile.textContent;
    };
    resetError(modal);
    document.addEventListener('mousedown', closeModalWithClick);
    document.addEventListener('keydown', closeModalWithEsc);
  } else {
    if (modal === placeModal) {
      formPlace.reset();
    };
    document.removeEventListener('mousedown', closeModalWithClick);
    document.removeEventListener('keydown', closeModalWithEsc);
  };
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  if (evt.target === formPlace) {
    createPlace (placeInput.value, linkInput.value);
    showModal(placeModal);
  };
  if (evt.target === formTitle) {
    nameProfile.textContent = nameInput.value;
    descProfile.textContent = descInput.value;
    showModal(titleModal);
  };
};

editButton.addEventListener('click', () => showModal(titleModal));
closeTitleButton.addEventListener('click', () => showModal(titleModal));
placeButton.addEventListener('click', () => showModal(placeModal));
closePlaceButton.addEventListener('click', () => showModal(placeModal));
closeLBButton.addEventListener('click', () => showModal(lbModal));
formTitle.addEventListener('submit', formSubmitHandler);
formPlace.addEventListener('submit', formSubmitHandler);
