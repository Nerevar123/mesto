const editButton = document.querySelector('.profile__edit-btn');
const placeButton = document.querySelector('.profile__add-btn');
const closeTitleButton = document.querySelector('.modal__close-btn_type_title');
const closePlaceButton = document.querySelector('.modal__close-btn_type_place');
const closeLBButton = document.querySelector('.modal__close-btn_type_lightbox');
const nameProfile = document.querySelector('.profile__name');
const descProfile = document.querySelector('.profile__desc');
const titleModal = document.querySelector('.modal_type_title');
const placeModal = document.querySelector('.modal_type_place');
const lbModal = document.querySelector('.modal_type_lightbox');
const nameInput = document.querySelector('.modal__input_type_name');
const descInput = document.querySelector('.modal__input_type_desc');
const placeInput = document.querySelector('.modal__input_type_place');
const linkInput = document.querySelector('.modal__input_type_link');
const formTitle = document.querySelector('.modal__form_type_title');
const formPlace = document.querySelector('.modal__form_type_place');
const places = document.querySelector('.places__list');

function renderPlaces () {
  const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: 'Архыз'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt: 'Челябинская область'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt: 'Иваново'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt: 'Камчатка'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt: 'Холмогорский район'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        alt: 'Байкал'
    }
  ];
  initialCards.forEach(function (place) {
    createPlace (place.name, place.link);
    places.querySelector('.place__image').alt = place.alt;
  });
};

function createPlace (placeName, placeLink,) {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElem = placeTemplate.cloneNode(true);
  placeElem.querySelector('.place__title').textContent = placeName;
  placeElem.querySelector('.place__image').src = placeLink;
  placeElem.querySelector('.place__image').alt = 'Your image';
  placeElem.querySelector('.place__like-btn').addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like-btn_active');
  })
  placeElem.querySelector('.place__image').addEventListener('click', function (evt) {
    showModal(lbModal);
    const lbImage = document.querySelector('.modal__image');
    const lbCaption = document.querySelector('.modal__caption');
    lbImage.src = evt.target.src;
    lbCaption.textContent = evt.target.nextElementSibling.textContent;
  })
  placeElem.querySelector('.place__delete-btn').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  })
  places.prepend(placeElem);
};

function showModal (modal) {
  modal.classList.toggle('modal_opened');
  if (modal = titleModal) {
    if (titleModal.classList.contains('modal_opened')) {
      nameInput.value = nameProfile.textContent;
      descInput.value = descProfile.textContent;
    }
  }
  if (modal = placeModal) {
    placeInput.value = '';
    linkInput.value = '';
  }
}

function formPlaceSubmitHandler (evt) {
  evt.preventDefault();
  if (linkInput.value === '') {
    linkInput.value = './images/place-default.jpg';
  }
  createPlace (placeInput.value, linkInput.value);
  showModal(placeModal);
};

function formTitleSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descProfile.textContent = descInput.value;
  showModal(titleModal);
}

renderPlaces ();

editButton.addEventListener('click', () => showModal(titleModal));
closeTitleButton.addEventListener('click', () => showModal(titleModal));
placeButton.addEventListener('click', () => showModal(placeModal));
closePlaceButton.addEventListener('click', () => showModal(placeModal));
closeLBButton.addEventListener('click', () => showModal(lbModal));
formTitle.addEventListener('submit', formTitleSubmitHandler);
formPlace.addEventListener('submit', formPlaceSubmitHandler);


// const closeButton = document.querySelectorAll ('.modal__close-btn');
// for (let i = 0; i < closeButton.length; i++) {
//   closeButton[i].addEventListener("click", function (evt) {
//     const modalParent = evt.target.closest('section');
//     modalParent.classList.toggle('modal_opened');
//   });
// }



