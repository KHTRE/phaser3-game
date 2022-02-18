import { LoadScene } from './src/scenes/LoadScene.js';
import { MenuScene } from './src/scenes/MenuScene.js';

// console.log('main')
// console.log(window.innerWidth)
// console.log(window.innerHeight)

const gameState = {};

const game = new Phaser.Game({
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [
    LoadScene,
    MenuScene
  ],
  render: {
    pixelArt: true // sharp edges
  }
});

