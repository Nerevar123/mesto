import Modal from './Modal.js';
import {
  lbImage,
  lbCaption
} from '../utils/constants.js';

export default class LbModal extends Modal {
  constructor(modalSelector, { name, link }) {
    super(modalSelector);

    this._name = name;
    this._link = link;
  }

  open() {
    super.open();

    lbImage.src = this._link;
    lbImage.alt = this._name;
    lbCaption.textContent = this._name;
  }
}
