const checkError = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`)
};

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
      })
      .then(checkError)
      .catch(err => console.log(err));
  }

  getInitCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
      })
      .then(checkError)
      .catch(err => console.log(err));
  }

  patchUserInfo(info) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(info)
    })
    .then(checkError)
    .catch(err => console.log(err));
  }

  addCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(card)
    })
    .then(checkError)
    .catch(err => console.log(err));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(checkError)
    .catch(err => console.log(err));
  }

  putLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers
      })
      .then(checkError)
      .catch(err => console.log(err));
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers
      })
      .then(checkError)
      .catch(err => console.log(err));
  }

  patchAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar)
    })
    .then(checkError)
    .catch(err => console.log(err));
  }
}
