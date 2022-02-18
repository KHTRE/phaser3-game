import { LoadScene } from './src/scenes/LoadScene.js'


const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 900,
  backgroundColor: '#656565',
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);

const gameState = {};

function preload() {
  this.load.image('bg-apartment', './src/img/locations/apartment.png');
  // this.load.image('bg-balcony', './src/img/locations/balcony.png');
  // this.load.image('bg-beach', './src/img/locations/beach.png');

  this.load.image('cloth-shorts', './src/img/options/accessories/clothes/shorts.png');
  this.load.image('cloth-dress', './src/img/options/accessories/clothes/dress.png');

  this.load.image('girl-mouth-open', './src/img/girl/face-speach/0.png');
  this.load.image('girl-mouth-close', './src/img/girl/face-speach/1.png');
  
}

function create() {
  gameState.cursors = this.input.keyboard.createCursorKeys();
  gameState.bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg-apartment');

  gameState.girl = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'girl-mouth-open')

  // gameState.bg.setScale(0.5);

  // gameState.bg.setRotation(Math.PI);

  console.log(gameState.bg)

}

function update() {
  // gameState.girl.y += 1;

  if (gameState.cursors.down.isDown) {
    gameState.girl.y += 50;
    gameState.girl.setScale(1.3);
  }
}
