
const editButton = document.querySelector('.profile__edit-btn');
const closeButton = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');
const nameInput = document.querySelector('.popup__input_type_name');
const descInput = document.querySelector('.popup__input_type_desc');
const nameProfile = document.querySelector('.profile__name');
const descProfile = document.querySelector('.profile__desc');
const formElement = document.querySelector('.popup__form');

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
