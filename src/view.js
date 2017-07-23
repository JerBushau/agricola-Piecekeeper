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
    '#ad3311',
    '#942c0f',
    '#7c250c',
    '#631d0a',
    '#f84a19',
    '#f85c2f'
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
