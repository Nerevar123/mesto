export default class UserInfo {
  constructor({ name, desc, avatar }) {
    this._name = document.querySelector(name);
    this._desc = document.querySelector(desc);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.nameValue = this._name.textContent;
    userInfo.descValue = this._desc.textContent;

    return userInfo
  }

  setUserInfo(nameInput, descInput, avatar) {
    this._name.textContent = nameInput;
    this._desc.textContent = descInput;
    this._avatar.src = avatar;
  }
}
