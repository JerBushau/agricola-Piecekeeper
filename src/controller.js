'use strict'

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.model.init();
    this.view.renderSpaces(this.model.roundInfo.activeSpaces);
    this.view.renderInfo(this.model.getRoundInfo());
  }

  addRandomOrderSpace(type) {
    this.model.addRandomOrderSpace(type);
    this.view.renderSpaces(this.model.roundInfo.activeSpaces);
  }

  accumulate(space) {
    if (this.model.roundInfo.currentRound >= 14) {
      console.log('game over');
      return this.model.roundInfo.currentRound = 14;
    }
    if(space) {
      space.accumulate(false);
      return this.view.renderSpaces(this.model.roundInfo.activeSpaces);
    }
    this.model.accumulateAll();
    this.view.renderSpaces(this.model.roundInfo.activeSpaces);
    this.model.advanceRound();
    this.view.renderInfo(this.model.getRoundInfo());
  }

  rollBack() {
    this.model.rollBack();
    this.view.renderSpaces(this.model.roundInfo.activeSpaces);
    this.view.renderInfo(this.model.getRoundInfo());
  }

  gather(space) {
    space.gather();
    this.view.renderSpaces(this.model.roundInfo.activeSpaces);
  }

  back(space) {
    space.back();
    this.view.renderSpaces(this.model.roundInfo.activeSpaces);
  }

  deleteSpace(id) {
    this.model.deleteSpace(id);
    this.view.renderSpaces(this.model.roundInfo.activeSpaces);
  }
}
