import {UIController} from './view/UIController';
const uic = new UIController();



window.onhashchange = locationHashChanged;

uic.drowContext();



function locationHashChanged() {
  if (location.hash === '#gallery') {
    console.log("You're visiting a cool feature!");
  }
}