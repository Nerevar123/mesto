const places = document.querySelector('.places__list');
const titleModal = document.querySelector('.modal_type_title');
const placeModal = document.querySelector('.modal_type_place');
const lbModal = document.querySelector('.modal_type_lightbox');
const editButton = document.querySelector('.profile__edit-btn');
const placeButton = document.querySelector('.profile__add-btn');
const nameProfile = document.querySelector('.profile__name');
const descProfile = document.querySelector('.profile__desc');
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

const renderPlaces = () => {
  const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    }
  ];
  initialCards.forEach((place) => {
    createPlace (place.name, place.link);
    places.querySelector('.place__image').alt = place.name;
  });
};

const createPlace = (placeName, placeLink) => {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElem = placeTemplate.cloneNode(true);
  const place = placeElem.querySelector('.place');
  const placeImage = placeElem.querySelector('.place__image');
  placeElem.querySelector('.place__title').textContent = placeName;
  placeImage.src = placeLink;
  placeImage.alt = 'Загруженное изображение';
  placeElem.querySelector('.place__like-btn').addEventListener('click', (evt) => {
    evt.target.classList.toggle('place__like-btn_active');
  });
  place.addEventListener('click', (evt) => {
    if (evt.target.closest('.place__img-wrapper')) {
      showLbModal(event);
    };
  });
  placeElem.querySelector('.place__delete-btn').addEventListener('click', (evt) => {
    evt.target.parentElement.remove();
  });
  renderPlace (placeElem);
};

const renderPlace = (place) => {
  places.prepend(place);
};

const showLbModal = (evt) => {
  showModal(lbModal);
  const lbImage = document.querySelector('.modal__image');
  const lbCaption = document.querySelector('.modal__caption');
  lbImage.src = evt.target.src;
  lbCaption.textContent = evt.target.parentElement.nextElementSibling.textContent;
  lbImage.alt = lbCaption.textContent;
};

const showModal = (modal) => {
  modal.classList.toggle('modal_opened');
  if (modal === placeModal) {
    formPlace.reset();
  }
};

const isEmpty = (formElement, inputElement) => {
  !inputElement.value.length >= 1 ? unfreezePlaceholder(formElement, inputElement) :
    freezePlaceholder(formElement, inputElement);
};

const freezePlaceholder = (formElement, inputElement) => {
  const placeholderElement = formElement.querySelector(`#${inputElement.id}-placeholder`);
  placeholderElement.classList.add('modal__placeholder_is-fixed');
};

const unfreezePlaceholder = (formElement, inputElement) => {
  const placeholderElement = formElement.querySelector(`#${inputElement.id}-placeholder`);
  placeholderElement.classList.remove('modal__placeholder_is-fixed');
};

editButton.addEventListener('click', () => showModal(titleModal));
closeTitleButton.addEventListener('click', () => showModal(titleModal));
placeButton.addEventListener('click', () => showModal(placeModal));
closePlaceButton.addEventListener('click', () => showModal(placeModal));
closeLBButton.addEventListener('click', () => showModal(lbModal));
document.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('modal')) {
    showModal(evt.target);
  }
});
document.addEventListener('keydown', (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector('.modal_opened');
    if (openedModal) {
      showModal(openedModal);
    };
  };
});

renderPlaces ();
