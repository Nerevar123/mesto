export default class UserInfo {
  constructor({ name, desc }) {
    this._name = document.querySelector(name);
    this._desc = document.querySelector(desc);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.nameValue = this._name.textContent;
    userInfo.descValue = this._desc.textContent;

    return userInfo
  }

  setUserInfo(nameInput, descInput) {
    this._name.textContent = nameInput;
    this._desc.textContent = descInput;
  }
}
