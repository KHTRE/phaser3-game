import { CST } from '../../CST.js';

class Load extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.LOAD,
    });
  }

  preload() {
    this.load.image('star', './src/assets/img/helpers/star2.png');

    this.load.image('start-button', './src/assets/img/buttons/start.png');
    this.load.image('sound-on-button', './src/assets/img/buttons/sound-on.png');
    this.load.image('sound-off-button', './src/assets/img/buttons/sound-off.png');
    this.load.image('play-now-button', './src/assets/img/buttons/play-now.png');

    this.load.image('title-bg', './src/assets/img/locations/apartment1.jpg');
    this.load.image('beach-bg', './src/assets/img/locations/beach1.jpg');
    this.load.image('balcony-bg', './src/assets/img/locations/balcony1.jpg');

    this.load.image('girl-message', './src/assets/img/message/girl.png');
    this.load.image('man-message', './src/assets/img/message/man.png');
    this.load.image('man-finish-message', './src/assets/img/message/man-finish1.png');

    this.load.image('progress-bar-0', './src/assets/img/helpers/progress-0.png');
    this.load.image('progress-bar-1', './src/assets/img/helpers/progress-1.png');
    this.load.image('progress-bar-2', './src/assets/img/helpers/progress-2.png');
    this.load.image('progress-bar-3', './src/assets/img/helpers/progress-3.png');
    this.load.image('progress-bar-4', './src/assets/img/helpers/progress-4.png');

    this.load.image('hint-message', './src/assets/img/helpers/hint-message.png');
    this.load.image('hand', './src/assets/img/helpers/hand.png');
    this.load.image('arrow-right', './src/assets/img/buttons/arrow-right-2.png');
    this.load.image('arrow-left', './src/assets/img/buttons/arrow-left-2.png');

    this.load.image('girl-shy', './src/assets/img/girl/face-speach/shy2.png');

    this.load.image('girl-in-dress', './src/assets/img/girl/in-dress/girl-in-dress.png');

    this.load.image('girl-in-dress-yellow-bag', './src/assets/img/girl/in-dress/yellow-bag/girl-in-dress-yellow-bag.png');
    this.load.image('girl-in-dress-yellow-bag-glasses', './src/assets/img/girl/in-dress/yellow-bag/glasses/glasses.png');
    this.load.image('girl-in-dress-yellow-bag-necklace', './src/assets/img/girl/in-dress/yellow-bag/necklace/necklace.png');

    this.load.image('girl-in-dress-blue-bag', './src/assets/img/girl/in-dress/blue-bag/girl-in-dress-blue-bag.png');
    this.load.image('girl-in-dress-blue-bag-glasses', './src/assets/img/girl/in-dress/blue-bag/glasses/glasses.png');
    this.load.image('girl-in-dress-blue-bag-necklace', './src/assets/img/girl/in-dress/blue-bag/necklace/necklace.png');

    this.load.image('girl-in-shorts', './src/assets/img/girl/in-shorts/girl-in-shorts.png');

    this.load.image('girl-in-shorts-yellow-bag', './src/assets/img/girl/in-shorts/yellow-bag/girl-in-shorts-yellow-bag.png');
    this.load.image('girl-in-shorts-yellow-bag-glasses', './src/assets/img/girl/in-shorts/yellow-bag/glasses/glasses.png');
    this.load.image('girl-in-shorts-yellow-bag-necklace', './src/assets/img/girl/in-shorts/yellow-bag/necklace/necklace.png');

    this.load.image('girl-in-shorts-blue-bag', './src/assets/img/girl/in-shorts/blue-bag/girl-in-shorts-blue-bag.png');
    this.load.image('girl-in-shorts-blue-bag-glasses', './src/assets/img/girl/in-shorts/blue-bag/glasses/glasses.png');
    this.load.image('girl-in-shorts-blue-bag-necklace', './src/assets/img/girl/in-shorts/blue-bag/necklace/necklace.png');

    this.load.image('dress-icon', './src/assets/img/options/accessories/clothes/dress1.png');
    this.load.image('shorts-icon', './src/assets/img/options/accessories/clothes/shorts.png');
    this.load.image('yellow-bag-icon', './src/assets/img/options/accessories/bags/yellow.png');
    this.load.image('blue-bag-icon', './src/assets/img/options/accessories/bags/blue.png');
    this.load.image('glasses-icon', './src/assets/img/options/accessories/glasses/glasses.png');
    this.load.image('shorts-necklace-icon', './src/assets/img/options/accessories/necklace/shorts-necklace.png');
    this.load.image('dress-necklace-icon', './src/assets/img/options/accessories/necklace/dress-necklace.png');

    this.load.image('beach-icon', './src/assets/img/options/locations/beach.png');
    this.load.image('balcony-icon', './src/assets/img/options/locations/balcony.png');

    this.load.spritesheet('girl-sprite', './src/assets/img/girl/face-speach/both-new.png', {
      frameHeight: 869,
      frameWidth: 372,
    });
    this.load.spritesheet('man-sprite', './src/assets/img/man/face-speach/bothman.png', {
      frameHeight: 857,
      frameWidth: 388,
    });

    this.load.audio('music', './src/assets/audio/1.mp3');

    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff,
      },
    });

    this.load.on('progress', (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
    });

    this.load.on('complete', () => {
      loadingBar.clear();
    });
  }

  create() {
    const startButton = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'start-button');

    startButton.setInteractive();

    startButton.on('pointerup', () => {
      this.scene.start(CST.SCENES.INTRO);
    });
  }
}

export default Load;
