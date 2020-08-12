import { showModal } from './utils.js';

export const lbModal = document.querySelector('.modal_type_lightbox');
const lbImage = document.querySelector('.modal__image');
const lbCaption = document.querySelector('.modal__caption');

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);

  return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.place__like-btn').addEventListener('click', () => this._toggleLike());
    this._element.querySelector('.place__delete-btn').addEventListener('click', () => this._deleteCard());
    this._element.addEventListener('click', (evt) => {
      if (evt.target.closest('.place__img-wrapper')) {
        this._showLbModal();
      }
    });
  }

  _showLbModal() {
    showModal(lbModal);
    lbImage.src = this._link;
    lbImage.alt = this._name;
    lbCaption.textContent = this._name;
  }

  _toggleLike() {
    this._element.querySelector('.place__like-btn').classList.toggle('place__like-btn_active');
  }

  _deleteCard() {
    this._element.closest('.place').remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const placeImage = this._element.querySelector('.place__image');

    placeImage.src = this._link;
    placeImage.alt = this._name;
  	this._element.querySelector('.place__title').textContent = this._name;

  	return this._element;
  }
}
