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