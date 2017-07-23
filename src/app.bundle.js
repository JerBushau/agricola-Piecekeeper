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
  }

  gather() {
    this.accumulatedAmount = 0;
  }

  accumulate() {
    this.accumulatedAmount += this.defaultAmount;
  }
}

'use strict'

class Model {
  constructor() {
    this.defaultSpaces = [
      { name: 'Copse', type: 'wood', defaultAmount: 1 },
      { name: 'Grove', type: 'wood', defaultAmount: 2 },
      { name: 'Forest', type: 'wood', defaultAmount: 3 },
      { name: 'Hollow', type: 'clay', defaultAmount: 1 },
      { name: 'Clay Pit', type: 'clay', defaultAmount: 2 },
      { name: 'Reed Bank', type: 'reed', defaultAmount: 1 },
      { name: 'Fishing', type: 'food', defaultAmount: 1 },
      { name: 'Traveling Players', type: 'food', defaultAmount: 1 }
    ];
    this.randomOrderSpaces = [
      { name: 'Sheep', type: 'sheep', defaultAmount: 1 },
      { name: 'Cattle', type: 'cow', defaultAmount: 1 },
      { name: 'Wild Boar', type: 'boar', defaultAmount: 1 },
      { name: 'Stone Quarry', type: 'stone', defaultAmount: 1 }
    ];
    this.roundInfo = {
      harvestRounds: [4, 7, 9, 11, 13,14],
      currentRound: 1,
      currentStage: 1,
      message: ''
    };
    this.id = 0;
    this.activeSpaces = [];
  }

  init() {
    // make all default spaces active on load
    this.defaultSpaces.forEach(space => {
      let newAccuSpace = new AcummulatorSpace(this.id, space.name, space.type, space.defaultAmount);
      this.activeSpaces.push(newAccuSpace);
      this.id++;
    });
  }

  advanceRound() {
    this.roundInfo.currentRound++;
    this.roundInfo.harvestRounds.some(round => {
      if (round === Number(this.roundInfo.currentRound)) {
        if (round === 14) {
          return this.roundInfo.message = 'Last Harvest!';
        }
        return this.roundInfo.message = 'Harvest this round!';
      } else {
        this.roundInfo.message = '';
      }
    });

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
    }
  }

  getRoundInfo () {
    return this.roundInfo
  }

  getSpaceById(id) {
    let disiredSpace;
    this.activeSpaces.some(space => {
      if (id === space.id) {
        disiredSpace = space;
      }
    });
    return disiredSpace
  }

  addRandomOrderSpace(type) {
    if (type === 'sheep') {
      let sheep = this.randomOrderSpaces[0];
      this.activeSpaces.push(new AcummulatorSpace(this.id, sheep.name, sheep.type, sheep.defaultAmount));
      this.id++
    } else if (type === 'cow') {
      let cow = this.randomOrderSpaces[1];
      this.activeSpaces.push(new AcummulatorSpace(this.id, cow.name, cow.type, cow.defaultAmount));
      this.id++
    } else if (type === 'boar') {
      let boar = this.randomOrderSpaces[2];
      this.activeSpaces.push(new AcummulatorSpace(this.id, boar.name, boar.type, boar.defaultAmount));
      this.id++
    } else if (type === 'stone') {
      let stone = this.randomOrderSpaces[3];
      this.activeSpaces.push(new AcummulatorSpace(this.id, stone.name, stone.type, stone.defaultAmount));
      this.id++
    }
  }

  accumulate() {
    this.activeSpaces.forEach(space => {
      space.accumulate();
    });
  }
}

'use strict'

class Template {
  constructor() {
    this.spaceTemplate = function(space) {
      return `
<div id="${space.id}" class="space ${space.type}">
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
        addRule('.accumulate-button:after', {
          display: 'none'
        });
        rainbow(this.roundInfoContainer, 175);
        return this.roundInfoContainer.style.transform = 'scale(1.2, 1.2)';
      }
      this.roundInfoContainer.style.animation = 'pulse 0.4s';
      return this.roundInfoContainer.style.background = '#f84a19';
    }
    this.roundInfoContainer.style.background = '#6441a5';
    this.roundInfoContainer.style.animation = 'none';
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


// helpers
function rainbow(el, time) {
  let colors = [
    '#f84a19',
    '#df4216',
    '#c63b14',
    '#ad3311',
    '#942c0f',
    '#7c250c',
    '#631d0a',
    '#f84a19',
    '#f85c2f',
    '#f96e46'
  ];
  let i = 0;

  setInterval(_=> {
    el.style.background = colors[i];
    i++
    if (i > colors.length) {
      i = 0;
    }
  }, time);
}

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
      this.controller.accumulate();
    });

    addSpaceButton.addEventListener('click', e => {
      e.preventDefault();
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


