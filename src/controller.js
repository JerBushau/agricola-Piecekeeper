'use strict'

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.model.init();
    this.view.renderSpaces(this.model.activeSpaces);
    this.view.renderInfo(this.model.getRoundInfo());
  }

  addRandomOrderSpace(type) {
    this.model.addRandomOrderSpace(type);
    this.view.renderSpaces(this.model.activeSpaces);
  }

  accumulate() {
    if (this.model.roundInfo.currentRound >= 14) {
      console.log('game over');
      return this.model.roundInfo.currentRound = 14;
    }
    this.model.accumulate();
    this.view.renderSpaces(this.model.activeSpaces);
    this.model.advanceRound();
    this.view.renderInfo(this.model.getRoundInfo());
  }

  gather(space) {
    space.gather()
    this.view.renderSpaces(this.model.activeSpaces);
  }
}
