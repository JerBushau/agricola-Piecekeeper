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
