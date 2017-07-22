'use strict'

class SpaceTemplate {
  constructor() {
    this.template = function(space) {
      return `
<div id="${space.id}" class="space ${space.type}">
  <h1 class="name">${space.name}</h1>
  <h1 class="number">${space.accumulatedAmount}</h1>
  <h3>${space.type}</h3>
  <button class="gather-button">gather</button>
</div>`
    }

  }
}
