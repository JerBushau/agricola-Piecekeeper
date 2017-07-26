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
    this.previousValue = this.accumulatedAmount;
    this.accumulatedAmount = 0;
  }

  accumulate() {
    this.previousValue = this.accumulatedAmount;
    this.accumulatedAmount += this.defaultAmount;
  }

  back() {
    this.previousValue = this.accumulatedAmount;
    if (this.accumulatedAmount >= this.defaultAmount) {
      this.accumulatedAmount -= this.defaultAmount;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // // pointless use accumulate...
  // forward() {
  //   this.previousValue = this.accumulatedAmount;
  //   if (this.accumulatedAmount >= this.defaultAmount) {
  //     this.accumulatedAmount += this.defaultAmount;
  //   }
  // }
}

