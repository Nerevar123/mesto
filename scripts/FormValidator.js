export default class FormValidator {
  constructor(form, options) {
    this._form = form;
    this._options = options;
  }

  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._options.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._options.errorClass);
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._options.inputErrorClass);
    errorElement.classList.remove(this._options.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input, input.validationMessage);
    };
  }

  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._options.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._options.inactiveButtonClass);
    };
  }

  _isEmpty(input) {
    !input.value.length >= 1 ? this._unfreezePlaceholder(input) : this._freezePlaceholder(input);
  }

  _freezePlaceholder(input) {
    const placeholderElement = this._form.querySelector(`#${input.id}-placeholder`);
    placeholderElement.classList.add('modal__placeholder_is-fixed');
  }

  _unfreezePlaceholder(input) {
    const placeholderElement = this._form.querySelector(`#${input.id}-placeholder`);
    placeholderElement.classList.remove('modal__placeholder_is-fixed');
  }

  _checkInput(inputList, input, buttonElement) {
    this._checkInputValidity(input);
    this._toggleButtonState(inputList, buttonElement);
    this._isEmpty(input);
  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._options.inputSelector));
    const buttonElement = this._form.querySelector(this._options.submitButtonSelector);

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInput(inputList, input, buttonElement);
      });
    });
  }

  resetError() {
    const inputList = Array.from(this._form.querySelectorAll(this._options.inputSelector));
    const buttonElement = this._form.querySelector(this._options.submitButtonSelector);

    inputList.forEach((input) => {
      if (this._form.classList.contains(this._options.placeModal)) {
        this._toggleButtonState(inputList, buttonElement);
        this._hideInputError(input, input.validationMessage);
      } else {
        this._checkInput(inputList, input, buttonElement);
      };
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
