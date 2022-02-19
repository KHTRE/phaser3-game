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
    this.load.image('start_button', './src/img/buttons/start.png')
    this.load.image('sound_on_button', './src/img/buttons/sound-on.png')
    this.load.image('sound_off_button', './src/img/buttons/sound-off.png')


    this.load.image('girl', './src/img/girl/face-speach/0.png')
    this.load.image('title_bg', './src/img/locations/apartment1.jpg');
    this.load.image('options_button', './src/assets/2.jpg');
    this.load.image('play_button', './src/assets/3.jpg');
    this.load.spritesheet('girl-sprite', './src/img/girl/face-speach/both-new.png', {
      frameHeight: 869,
      frameWidth: 372
    });

    this.load.audio('music', './src/audio/1.mp3');

    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    });

    this.load.on('progress', (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
    })

    this.load.on('complete', () => {
      loadingBar.clear();
    })

  }
 


  create() {
    

    // let startButton = this.add.image(100, 100, 'start_button');
    let startButton = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'start_button');

    startButton.setInteractive();

    startButton.on('pointerup', () => {
      this.scene.start(CST.SCENES.MENU);
    });
  }



}