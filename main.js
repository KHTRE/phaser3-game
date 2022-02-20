import { Load } from './src/scenes/Load.js';
import { Intro } from './src/scenes/Intro.js';
import { FirstScreen } from './src/scenes/FirstScreen.js';

const gameState = {
};

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [
    Load,
    Intro,
    FirstScreen,
    // MenuScene
  ],
  // render: {
  //   pixelArt: true // sharp edges
  // }
  // scale: {
  //   mode: Phaser.Scale.FIT,
  //   parent: 'phaser-example',
  //   autoCenter: Phaser.Scale.CENTER_BOTH,
  //   width: window.innerWidth,
  //   height: window.innerHeight
  // },

});



window.addEventListener('resize', function(event) {

  game.scale.setGameSize(window.innerWidth, window.innerHeight)   // WORKS

}, true);