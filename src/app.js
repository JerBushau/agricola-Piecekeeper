'use strict'

const addSpaceButton = document.querySelector('.add-space-button');
const addSpaceDropdown = document.querySelector('.add-space-dropdown');
const accumulateButton = document.querySelector('.accumulate-button');

class App {
  constructor() {
    this.model = new Model;
    this.template = new Template();
    this.view = new View(this.template);
    this.controller = new Controller(this.model, this.view)
  }

  init() {
    this.controller.init();

    accumulateButton.addEventListener('click', e => {
      e.preventDefault();
      if (e.shiftKey) return this.controller.rollBack();
      this.controller.accumulate();
    });

    addSpaceButton.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.delete-button').forEach(button => {
        button.classList.add('hidden');
      });
      document.querySelectorAll('.prev-value').forEach(item => {
        item.classList.add('hidden');
      });
      a.model.roundInfo.activeSpaces.forEach(space => {
        space.menuOpen = false;
      });
      addSpaceDropdown.classList.toggle('hidden');
      addSpaceButton.classList.toggle('active');
    });

    addSpaceDropdown.addEventListener('click', e => {
      a.controller.addRandomOrderSpace(e.target.dataset.type);
    });
  }
}

const a = new App();

a.init();


