
let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__input_type_name');
let descInput = document.querySelector('.popup__input_type_desc');
let nameProfile = document.querySelector('.profile__name');
let descProfile = document.querySelector('.profile__desc');
function showPopup() {
  popup.classList.toggle('popup_opened');
  nameInput.value = '';
  descInput.value = '';
  nameInput.placeholder = nameProfile.textContent;
  descInput.placeholder = descProfile.textContent;
}
editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', showPopup);
let formElement = document.querySelector('.popup__form');
function formSubmitHandler (evt) {
    evt.preventDefault();
    if (nameInput.value !== '') {
      nameProfile.textContent = nameInput.value;
    }else {
      nameProfile.textContent = nameInput.placeholder;
    }
    if (descInput.value !== '') {
      descProfile.textContent = descInput.value;
    }else {
      descProfile.textContent = descInput.placeholder;
    }
    showPopup();
}
formElement.addEventListener('submit', formSubmitHandler);
