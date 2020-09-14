export default class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;

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
    this._element.querySelector('.place__like-btn').addEventListener('click', (evt) => this._handleLikeClick(evt, this._id));
    this._element.querySelector('.place__delete-btn').addEventListener('click', () => this._handleDeleteIconClick(this._id));
    this._element.addEventListener('click', (evt) => {
      if (evt.target.closest('.place__img-wrapper')) {
        this._handleCardClick(this._name, this._link);
      }
    });
  }

  toggleLike() {
    this._element.querySelector('.place__like-btn').classList.toggle('place__like-btn_active');
  }

  deleteCard() {
    this._element.closest('.place').remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    if (this._ownerId !== 'e3dd24d24010db81950747fc') {
      this._element.querySelector('.place__delete-btn').style.display = "none";
    }

    if (this._likes.find(like => like._id === 'e3dd24d24010db81950747fc')) {
      this.toggleLike();
    }

    const placeImage = this._element.querySelector('.place__image');
    const placeLikes = this._element.querySelector('.place__like-count');

    placeImage.src = this._link;
    placeImage.alt = this._name;
    placeLikes.textContent = this._likes.length;

  	this._element.querySelector('.place__title').textContent = this._name;

  	return this._element;
  }
}
