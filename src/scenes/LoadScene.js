import { CST } from '../../CST.js';

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.LOAD
    }) 
  }

  init() {

  }

  preload() {

    this.load.image('start_button', '../src/img/buttons/start.jpg')
    this.load.image('title_bg', '../src/img/locations/apartment.png');
    this.load.image('options_button', '../src/assets/2.jpg');
    this.load.image('play_button', '../src/assets/3.jpg');
    this.load.image('logo', '../src/assets/4.jpg');
    this.load.spritesheet('cat', '../src/assets/Sprite.jpg', {
      frameHeight: 62,
      frameWidth: 70
    });

    this.load.audio('music', '../src/assets/123.mp3');

    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    });

    //slow the loading
    for (let i = 0; i < 100; i++) {
      this.load.image('logo' + i, '../src/assets/1.jpg');
    }

    this.load.on('progress', (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
    })

    this.load.on('complete', () => {
      loadingBar.clear();
    })

  }
 


  create() {

    let startButton = this.add.image(100, 100, 'start_button');

    startButton.setInteractive();

    startButton.on('pointerup', () => {
      console.log('play clicked')
      this.scene.start(CST.SCENES.MENU);
    });
  }



}