import { LoadScene } from './src/scenes/LoadScene.js';
import { MenuScene } from './src/scenes/MenuScene.js';

const gameState = {
};

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [
    LoadScene,
    MenuScene
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