'use strict'

class View {
  constructor(template) {
    this.spaceContainer = document.querySelector('.space-container');
    this.spaceTemplate = template;
  }

  renderSpaces(spaces) {
    this.spaceContainer.innerHTML = '';
    spaces.forEach(space => {
      this.spaceContainer.insertAdjacentHTML('beforeend', this.spaceTemplate.template(space));
    });
    this.bindButtons();
  }

  bindButtons() {
    document.querySelectorAll('.gather-button').forEach(button => {
      button.addEventListener('click', e => {
        let target = e.target.parentElement;
        let space = a.model.getSpaceById(Number(target.id));
        // this is bad bind buttons better; perhaps try events
        a.controller.gather(space);
      });
    });
  }
}
