'use strict'

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.model.init();
    this.view.renderSpaces(this.model.activeSpaces);
  }

  addRandomOrderSpace(type) {
    this.model.addRandomOrderSpace(type);
    this.view.renderSpaces(this.model.activeSpaces);
  }

  accumulate() {
    this.model.accumulate();
    this.view.renderSpaces(this.model.activeSpaces);
  }

  gather(space) {
    space.gather()
    this.view.renderSpaces(this.model.activeSpaces);

  }
}
