export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
        this._handleCardClick(this._name, this._link);
      }
    });
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
