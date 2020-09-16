import PopupWithForm from './PopupWithForm.js';

export default class PopupWithConfirm extends PopupWithForm {
  constructor({ modalSelector, submitHandler }) {
    super({ modalSelector, submitHandler })
  }

  open(elem) {
    super.open();

    this._elem = elem;
  }

  _setSubmitHandler(form) {
    form.preventDefault();
    this._submitHandler(this._elem);
  }
}
