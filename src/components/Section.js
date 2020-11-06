export default class Section {
  constructor({ renderer }, contSelector) {
    this._renderer = renderer;
		this._container = document.querySelector(contSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItem(item, id) {
    this._renderer(item, id);
  }

  renderItems(items, id) {
    items.reverse().forEach(item => this.renderItem(item, id))
  }
}
