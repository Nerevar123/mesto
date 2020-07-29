const obj = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__save-btn',
  inactiveButtonClass: 'modal__save-btn_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__input-error_active'
};

const showInputError = (form, input, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (form, input, inputErrorClass, errorClass) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (form, input, options) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, options.inputErrorClass, options.errorClass);
  } else {
    hideInputError(form, input, options.inputErrorClass, options.errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
});
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (form, options) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (evt.target === formPlace) {
      createPlace (placeInput.value, linkInput.value);
      showModal(placeModal);
      toggleButtonState(inputList, buttonElement, options.inactiveButtonClass);
    };
    if (evt.target === formTitle) {
      nameProfile.textContent = nameInput.value;
      descProfile.textContent = descInput.value;
      showModal(titleModal);
    };
  });
  const inputList = Array.from(form.querySelectorAll(options.inputSelector));
  const buttonElement = form.querySelector(options.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, options.inactiveButtonClass);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, options);
      toggleButtonState(inputList, buttonElement, options.inactiveButtonClass);
      isEmpty(form, input);
    });
  });
};

const enableValidation = (options) => {
  const modals = document.querySelectorAll(options.formSelector);
  const modalList = Array.from(modals);
  modalList.forEach((modal) => {
    setEventListeners(modal, options);
  });
};

enableValidation(obj);
