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
