import Modal from './Modal.js';

export default class FormModal extends Modal {
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

    this._form.addEventListener('submit', this._submitHandler);
  }

  close() {
    super.close();

    this._form.reset();
  }
}
