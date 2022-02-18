import { LoadScene } from './src/scenes/LoadScene.js';
import { MenuScene } from './src/scenes/MenuScene.js';

// console.log('main')
// console.log(window.innerWidth)
// console.log(window.innerHeight)



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

console.log('scale', game.scale)
console.log('canvas', game.canvas)
// console.log(game.canvas.width)
// game.canvas.width = 600

// game.config.width = 500;

// console.log(game.config.width)


window.addEventListener('resize', function(event) {
  // console.log(event)
  // console.log(event.target.outerHeight, event.target.outerWidth)
  // game.canvas.width = event.target.outerWidth;

  // game.canvas.width = window.innerWidth;
  // game.canvas.height = window.innerHeight;
  // game.config.width = window.innerWidth;

  // console.log(game.scale.displayScale)
  // console.log(game.scale.canvasBounds)
  // game.scale.resize(window.innerWidth, window.innerHeight)
  game.scale.setGameSize(window.innerWidth, window.innerHeight)


  // console.log('window', window.innerWidth, window.innerHeight)
  // console.log('canvas', game.canvas.width, game.canvas.height)
  // game.canvas.height = event.target.height;
}, true);