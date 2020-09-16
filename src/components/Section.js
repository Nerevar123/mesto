export default class Section {
  constructor({ renderer }, contSelector) {
    this._renderer = renderer;
		this._container = document.querySelector(contSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItem(item) {
    this._renderer(item);
  }

  renderItems(items) {
    items.reverse().forEach(item => this.renderItem(item))
  }
}
