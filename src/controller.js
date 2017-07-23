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
    if (this.model.round >= 14) {
      console.log('game over');
      return this.model.round = 14;
    }
    this.model.accumulate();
    this.view.renderSpaces(this.model.activeSpaces);
    this.model.advanceRound();
  }

  gather(space) {
    space.gather()
    this.view.renderSpaces(this.model.activeSpaces);
  }
}
