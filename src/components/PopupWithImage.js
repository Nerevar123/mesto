import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(modalSelector) {
    super(modalSelector);

    this._cardImage = document.querySelector('.modal__image');
    this._cardCaption = document.querySelector('.modal__caption');
  }

  open({name, link }) {
    super.open();

    this._cardImage.src = link;
    this._cardImage.alt = name;
    this._cardCaption.textContent = name;
  }
}
