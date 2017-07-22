'use strict'

const addSpaceButton = document.querySelector('.add-space-button');
const addSpaceDropdown = document.querySelector('.add-space-dropdown');
const accumulateButton = document.querySelector('.accumulate-button');

class App {
  constructor() {
    this.model = new Model;
    this.template = new SpaceTemplate();
    this.view = new View(this.template);
    this.controller = new Controller(this.model, this.view)
  }

  init() {
    this.controller.init();

    accumulateButton.addEventListener('click', e => {
      this.controller.accumulate();
    });

    addSpaceButton.addEventListener('click', e => {
      e.preventDefault();
      addSpaceDropdown.classList.toggle('hidden');
      addSpaceButton.classList.toggle('active');
    });

    addSpaceDropdown.addEventListener('click', e => {
      console.log(e.target.dataset.type)
      a.controller.addRandomOrderSpace(e.target.dataset.type);
    });
  }
}

const a = new App();

a.init();


