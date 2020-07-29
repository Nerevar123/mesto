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
  console.log(input);
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, options.inputErrorClass, options.errorClass);
  } else {
    hideInputError(form, input, options.inputErrorClass, options.errorClass);
  };
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
  };
};

const checkInput = (form, inputList, input, buttonElement, options) => {
  checkInputValidity(form, input, options);
  toggleButtonState(inputList, buttonElement, options.inactiveButtonClass);
  isEmpty(form, input);
};

const isEmpty = (formElement, inputElement) => {
  !inputElement.value.length >= 1 ? unfreezePlaceholder(formElement, inputElement) : freezePlaceholder(formElement, inputElement);
};

const freezePlaceholder = (formElement, inputElement) => {
  const placeholderElement = formElement.querySelector(`#${inputElement.id}-placeholder`);
  placeholderElement.classList.add('modal__placeholder_is-fixed');
};

const unfreezePlaceholder = (formElement, inputElement) => {
  const placeholderElement = formElement.querySelector(`#${inputElement.id}-placeholder`);
  placeholderElement.classList.remove('modal__placeholder_is-fixed');
};

const setEventListeners = (form, options) => {
  form.addEventListener('submit', (evt) => {
    if (evt.target === formPlace) {
      toggleButtonState(inputList, buttonElement, options.inactiveButtonClass);
    };
  });
  const inputList = Array.from(form.querySelectorAll(options.inputSelector));
  const buttonElement = form.querySelector(options.submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInput(form, inputList, input, buttonElement, options);
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
