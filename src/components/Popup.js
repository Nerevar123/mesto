export default class Popup {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector);
  }

  open() {
    this._modal.classList.add('modal_opened');
    this.setEventListeners();
  }

  close() {
    this._modal.classList.remove('modal_opened');
    this.removeEventListeners();
  }

  setEventListeners() {
    const closeButton = this._modal.querySelector('.modal__close-btn');
    closeButton.addEventListener('click', () => this.close());

    this._closeModalWithClickBind = this._closeModalWithClick.bind(this);
    this._closeModalWithEscBind = this._closeModalWithEsc.bind(this);
    document.addEventListener('mousedown', this._closeModalWithClickBind);
    document.addEventListener('keydown', this._closeModalWithEscBind);
  }

  removeEventListeners() {
    document.removeEventListener('mousedown', this._closeModalWithClickBind);
    document.removeEventListener('keydown', this._closeModalWithEscBind);
  }

  _closeModalWithEsc(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _closeModalWithClick(evt) {
    if (evt.target.classList.contains('modal')) {
      this.close();
    }
  }
}
