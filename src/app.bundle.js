// logic:
//   - At the end of each round (1 button click to handle all spaces) each accumulation space should get the specified number of pieces added to it.
//   - Be able to add the 'random' accumulators to the board when they come up.
//   - When someone takes the space (button click on specific space) all accumulated resources should be set to 0.

'use strict'

class AcummulatorSpace {
  constructor(id, name, type, amount) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.defaultAmount = amount;
    this.accumulatedAmount = this.defaultAmount;
    this.previousValue = 0;
    this.menuOpen = false;
  }

  gather() {
    this.accumulatedAmount = 0;
  }

  accumulate(asGroup) {
    if (asGroup === true) this.previousValue = this.accumulatedAmount;

    this.accumulatedAmount += this.defaultAmount;
  }

  back() {
    if (this.accumulatedAmount >= this.defaultAmount) {
      this.accumulatedAmount -= this.defaultAmount;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
'use strict'

class Model {
  constructor() {
    this.defaultSpaces = [
      { name: 'Copse', type: 'wood', defaultAmount: 1 },
      { name: 'Grove', type: 'wood', defaultAmount: 2 },
      { name: 'Forest', type: 'wood', defaultAmount: 3 },
      { name: 'Clay Pit', type: 'clay', defaultAmount: 1 },
      { name: 'Hollow', type: 'clay', defaultAmount: 2 },
      { name: 'Reed Bank', type: 'reed', defaultAmount: 1 },
      { name: 'Fishing', type: 'food', defaultAmount: 1 },
      { name: 'Traveling Players', type: 'food', defaultAmount: 1 }
    ];
    this.randomOrderSpaces = [
      { name: 'Sheep', type: 'sheep', defaultAmount: 1 },
      { name: 'Cattle', type: 'cow', defaultAmount: 1 },
      { name: 'Pig', type: 'boar', defaultAmount: 1 },
      { name: 'Stone Quarry', type: 'stone', defaultAmount: 1 }
    ];
    this.roundInfo = {
      harvestRounds: [4, 7, 9, 11, 13,14],
      currentRound: 1,
      currentStage: 1,
      activeSpaces: [],
      message: ''
    };
    this.id = 0;
  }

  init() {
    // make all default spaces active on load
    this.defaultSpaces.forEach(space => {
      let newAccuSpace = new AcummulatorSpace(this.id, space.name, space.type, space.defaultAmount);
      this.roundInfo.activeSpaces.push(newAccuSpace);
      this.id++;
    });
  }

  advanceRound() {
    this.roundInfo.currentRound++;
    this.setRoundInfo(this.roundInfo.currentRound)
  }

  setRoundInfo(round) {
    // there is a better way to do this i'm sure
    if (this.roundInfo.currentRound === 14) {
      this.roundInfo.currentStage = 6;
    } else if (this.roundInfo.currentRound > 11) {
      this.roundInfo.currentStage = 5;
    } else if (this.roundInfo.currentRound > 9) {
      this.roundInfo.currentStage = 4;
    } else if (this.roundInfo.currentRound > 7) {
      this.roundInfo.currentStage = 3;
    } else if (this.roundInfo.currentRound > 4) {
      this.roundInfo.currentStage = 2;
    } else {
      this.roundInfo.currentStage = 1;
    }

    this.roundInfo.harvestRounds.some(round => {
      if (round === Number(this.roundInfo.currentRound)) {
        if (round === 14) {
          return this.roundInfo.message = 'Last Harvest!';
        }
        return this.roundInfo.message = 'Harvest this round!';
      }
      this.roundInfo.message = '';
    });
  }

  getRoundInfo () {
    return this.roundInfo
  }

  getSpaceById(id) {
    let disiredSpace;
    this.roundInfo.activeSpaces.some(space => {
      if (id === space.id) {
        disiredSpace = space;
      }
    });
    return disiredSpace
  }

  addRandomOrderSpace(type) {
    // explore other ways to do this
    let space;
    if (type === 'sheep') {
      space = this.randomOrderSpaces[0];
    } else if (type === 'cow') {
      space = this.randomOrderSpaces[1];
    } else if (type === 'boar') {
      space = this.randomOrderSpaces[2];
    } else if (type === 'stone') {
      space = this.randomOrderSpaces[3];
    }
    this.roundInfo.activeSpaces.push(new AcummulatorSpace(this.id, space.name, space.type, space.defaultAmount));
    this.id++
  }

  accumulateAll() {
    this.roundInfo.activeSpaces.forEach(space => {
      space.accumulate(true);
    });
  }

  rollBack() {
    if (this.roundInfo.currentRound === 0) return
    this.roundInfo.currentRound--
    this.setRoundInfo(this.roundInfo.currentRound)
    this.roundInfo.activeSpaces.forEach(space => {
      space.back();
    });
  }

  deleteSpace(id) {
    let space = this.getSpaceById(id);
    let i = this.roundInfo.activeSpaces.indexOf(space);

    this.roundInfo.activeSpaces.splice(i, 1);
  }
}
'use strict'

class Template {
  constructor() {
    // this feels ugly but works for now should consider doing
    // the conditionals for spaceTemplate in a more dry way?
    this.spaceTemplate = function(space) {
      if (space.id > 7 && space.menuOpen) return `
<div id="${space.id}" class="space ${space.type}">
  <small class="prev-value">${space.previousValue}</small>
  <button class="delete-button">X</button>
  <h1 class="name">${space.name}</h1>
  <h1 class="number">${space.accumulatedAmount}</h1>
  <h3 class="type">${space.type}</h3>
  <button class="gather-button">gather</button>
</div>`
      if (space.id > 7) return `
<div id="${space.id}" class="space ${space.type}">
  <small class="prev-value hidden">${space.previousValue}</small>
  <button class="delete-button hidden">X</button>
  <h1 class="name">${space.name}</h1>
  <h1 class="number">${space.accumulatedAmount}</h1>
  <h3 class="type">${space.type}</h3>
  <button class="gather-button">gather</button>
</div>`
      if (space.menuOpen) return `
<div id="${space.id}" class="space ${space.type}">
  <small class="prev-value">${space.previousValue}</small>
  <h1 class="name">${space.name}</h1>
  <h1 class="number">${space.accumulatedAmount}</h1>
  <h3 class="type">${space.type}</h3>
  <button class="gather-button">gather</button>
</div>`
      return `
<div id="${space.id}" class="space ${space.type}">
  <small class="prev-value hidden">${space.previousValue}</small>
  <h1 class="name">${space.name}</h1>
  <h1 class="number">${space.accumulatedAmount}</h1>
  <h3 class="type">${space.type}</h3>
  <button class="gather-button">gather</button>
</div>`
    }
    this.roundInfoTemplate = function(info) {
      return `
<div class="round-info">
  <h1>Round: ${info.currentRound}</h1>
  <h1>Stage: ${info.currentStage}</h1>
</div>
<h1 class="message">${info.message}</h1>`
    }
  }
}
'use strict'

class View {
  constructor(template) {
    this.spaceContainer = document.querySelector('.space-container');
    this.roundInfoContainer = document.querySelector('.round-info-container');
    this.spaceTemplate = template.spaceTemplate;
    this.roundInfoTemplate = template.roundInfoTemplate;
  }

  // create way to render specific changes rather than reprinting entire screen each time.
  renderSpaces(spaces) {
    this.spaceContainer.innerHTML = '';
    spaces.forEach(space => {
      this.spaceContainer.insertAdjacentHTML('beforeend', this.spaceTemplate(space));
    });
    this.bindButtons();
  }

  renderInfo(info) {
    this.roundInfoContainer.innerHTML = '';
    this.roundInfoContainer.insertAdjacentHTML('beforeend', this.roundInfoTemplate(info));
    if (info.message != '') {
      if (info.message === 'Last Harvest!') {
        document.querySelector('.accumulate-button').classList.add('active');
        // altering active class would be more simple than this but it is interesting
        addRule('.accumulate-button:after', {
          display: 'none'
        });
        return endGameAlert(info, this.roundInfoContainer, 175);
      }
      document.querySelector('.accumulate-button').classList.remove('active');
      this.roundInfoContainer.style.animation = 'pulse 0.4s';
      return this.roundInfoContainer.style.background = '#f84a19';
    }
    this.roundInfoContainer.style.animation = 'none';
    this.roundInfoContainer.style.background = '#6441a5';
  }

  // fix this bind function... use events
  // dispatch event that controller can listen for or something
  // so don't have to ref a (the app instance) here in view
  bindButtons() {
    document.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', e => {
        let target = e.target.parentElement;

        a.controller.deleteSpace(Number(target.id));
      });
    });
    // show menu to fix mistakes
    document.querySelectorAll('.space').forEach( space => {
      space.addEventListener('click', e => {
        let targetId;

        e.target.tagName !== 'DIV' ? targetId = Number(e.target.parentElement.id)
          : targetId = Number(e.target.id);

        if (e.ctrlKey) {
          // show space 'menu'
          document.querySelectorAll('.delete-button').forEach(button => {
            button.classList.toggle('hidden');
          });
          document.querySelectorAll('.prev-value').forEach(item => {
            item.classList.toggle('hidden');
          });
          return a.model.roundInfo.activeSpaces.forEach(space => {
            space.toggleMenu();
          });

        } else if (e.shiftKey) {
          let selectedSpace = a.model.getSpaceById(targetId);
          a.controller.accumulate(selectedSpace);
        }
        // do nothing on plain dblclick
        return
      });
    });
    // gather
    document.querySelectorAll('.space').forEach( space => {
      space.addEventListener('click', e => {
        let id;
        let selectedSpace;
        if (e.ctrlKey || e.shiftKey || e.target.tagName === 'BUTTON') return
        if (e.target.tagName !== 'DIV') {
          id = Number(e.target.parentElement.id);
          selectedSpace = a.model.getSpaceById(id);
          return a.controller.gather(selectedSpace);
        }
        id = Number(e.target.id);
        selectedSpace = a.model.getSpaceById(id);
        a.controller.gather(selectedSpace);
      });
    });
  }
}


// helpers
// this could be done in css but i was feelin' it, so i wrote this thing
function endGameAlert(info, el, time) {
  let ric = document.querySelector('.round-info-container');
  let colors = ['#ad3311', '#942c0f', '#7c250c', '#631d0a', '#f84a19', '#f85c2f'];
  let i = 0;
  let loop = setInterval(_ => {
    if (info.currentRound !== 14) {
      clearInterval(loop);
      return ric.style.transform = 'scale(1, 1)';
    }
    el.style.background = colors[i];
    i++
    if (i > colors.length) i = 0;
    ric.style.transform = 'scale(1.2, 1.2)';
  }, time);
}

// from s.o. pretty neat allows you to style psuedo and such eles w/ js by adding a style tag
var addRule = (function (style) {
    var sheet = document.head.appendChild(style).sheet;
    return function (selector, css) {
        var propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
            return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
        }).join(";");
        sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
    };
})(document.createElement("style"));
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


