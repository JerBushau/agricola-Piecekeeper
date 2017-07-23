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

