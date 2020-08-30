import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ modalSelector, submitHandler }) {
    super(modalSelector);

    this._submitHandler = submitHandler;
    this._form = this._modal.querySelector('.modal__form');
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.modal__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._setSubmitHandlerBind = this._setSubmitHandler.bind(this);
    this._form.addEventListener('submit', this._setSubmitHandlerBind);
  }

  removeEventListeners() {
    super.removeEventListeners();

    this._form.removeEventListener('submit', this._setSubmitHandlerBind);
  }

_setSubmitHandler(form) {
  form.preventDefault();
  this._submitHandler(this._getInputValues());
  this.close();
}

  close() {
    super.close();

    this._form.reset();
  }
}
