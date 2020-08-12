export default class FormValidator {
  constructor(form, options, inputList, buttonElement) {
    this._form = form;
    this._options = options;
    this._inputList = inputList;
    this._buttonElement = buttonElement;
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
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._options.inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._options.inactiveButtonClass);
    }
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

  _checkInput(input) {
    this._checkInputValidity(input);
    this._toggleButtonState();
    this._isEmpty(input);
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._options.inputSelector));
    this._buttonElement = this._form.querySelector(this._options.submitButtonSelector);

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInput(input);
      });
    });
  }

  resetError() {
    this._inputList = Array.from(this._form.querySelectorAll(this._options.inputSelector));
    this._buttonElement = this._form.querySelector(this._options.submitButtonSelector);

    this._inputList.forEach((input) => {
      if (this._form.classList.contains(this._options.placeModal)) {
        this._toggleButtonState();
        this._hideInputError(input, input.validationMessage);
      } else {
        this._checkInput(input);
      }
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
