
let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__input_type_name');
let descInput = document.querySelector('.popup__input_type_desc');
let nameProfile = document.querySelector('.profile__name');
let descProfile = document.querySelector('.profile__desc');
let formElement = document.querySelector('.popup__form');

function showPopup() {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    nameInput.value = nameProfile.textContent;
    descInput.value = descProfile.textContent;
  }
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descProfile.textContent = descInput.value;
  showPopup();
}

editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', showPopup);
formElement.addEventListener('submit', formSubmitHandler);
