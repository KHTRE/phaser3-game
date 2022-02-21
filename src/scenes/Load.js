import { CST } from '../../CST.js';

export class Load extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.LOAD
    }) 
  }

  init() {

  }

  preload() {
    this.load.image('start-button', './src/img/buttons/start.png');
    this.load.image('sound-on-button', './src/img/buttons/sound-on.png');
    this.load.image('sound-off-button', './src/img/buttons/sound-off.png');

    this.load.image('title-bg', './src/img/locations/apartment1.jpg');
    this.load.image('girl-message', './src/img/message/girl.png');
    this.load.image('man-message', './src/img/message/man.png');
    this.load.image('progress-bar-0', './src/img/helpers/progress-0.png');
    this.load.image('progress-bar-1', './src/img/helpers/progress-1.png');
    this.load.image('progress-bar-2', './src/img/helpers/progress-2.png');
    this.load.image('progress-bar-3', './src/img/helpers/progress-3.png');
    this.load.image('progress-bar-4', './src/img/helpers/progress-4.png');
    this.load.image('hint-message', './src/img/helpers/hint-message.png');
    this.load.image('arrow-right', './src/img/helpers/arrow-right-2.png');
    this.load.image('arrow-left', './src/img/helpers/arrow-left-2.png');

    this.load.image('girl-shy', './src/img/girl/face-speach/shy2.png');

    this.load.image('girl-in-dress', './src/img/girl/in-dress/girl-in-dress.png');
    this.load.image('girl-in-dress-yellow-bag', './src/img/girl/in-dress/ellow-bag/girl-in-dress-yello-bag.png');
    this.load.image('girl-in-dress-blue-bag', './src/img/girl/in-dress/blue-bag/girl-in-dress-blue-bag.png');

    this.load.image('girl-in-shorts', './src/img/girl/in-shorts/girl-in-shorts.png');
    this.load.image('girl-in-shorts-yellow-bag', './src/img/girl/in-shorts/ellow-bag/girl-in-shorts-yellow-bag.png');
    this.load.image('girl-in-shorts-blue-bag', './src/img/girl/in-shorts/blue-bag/girl-in-shorts-blue-bag.png');

    this.load.image('dress-icon', './src/img/options/accessories/clothes/dress1.png');
    this.load.image('shorts-icon', './src/img/options/accessories/clothes/shorts.png');
    this.load.image('yellow-bag-icon', './src/img/options/accessories/bags/yellow.png');
    this.load.image('blue-bag-icon', './src/img/options/accessories/bags/blue.png');


    this.load.spritesheet('girl-sprite', './src/img/girl/face-speach/both-new.png', {
      frameHeight: 869,
      frameWidth: 372
    });
    this.load.spritesheet('man-sprite', './src/img/man/face-speach/bothman.png', {
      frameHeight: 857,
      frameWidth: 388
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
    const startButton = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'start-button');

    startButton.setInteractive();

    startButton.on('pointerup', () => {
      this.scene.start(CST.SCENES.INTRO);
    });
  }



}