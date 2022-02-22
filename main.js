import { Load } from './src/scenes/Load.js';
import { Game } from './src/scenes/Game.js';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [
    Load,
    Game,
   
  ],
});

window.addEventListener('resize', function() {
  // adaptiveness
  game.scale.setGameSize(window.innerWidth, window.innerHeight);  
}, true);