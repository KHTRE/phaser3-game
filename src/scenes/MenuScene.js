import { CST } from '../../CST.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.MENU
    }) 
  }

  init(data) {
    console.log(data);
    console.log('got it');
  }

  create() {

    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.2, 'logo').setDepth(1)

    let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'title_bg')
    let scaleX = this.cameras.main.width / background.width
    let scaleY = this.cameras.main.height / background.height
    let scale = Math.max(scaleX, scaleY)
    background.setScale(scale).setScrollFactor(0)




    let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.4, 'play_button').setDepth(1);

    let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.6, 'options_button').setDepth(1);

    // sprites
    let hoverSprite = this.add.sprite(100, 100, 'cat');
    hoverSprite.setScale(1.2);
    hoverSprite.setVisible(false)


    // create ANIMATION

    this.anims.create({
      key: 'walk',
      frameRate: 6,
      repeats: -1,
      frames: this.anims.generateFrameNumbers('cat', {
        frame: [0, 1, 2, 3, 4, 5]
      })
    })


    // SOUND
    // this.sound.pauseOnBlur = false;
    // this.sound.play('music', {
    //   loop: true
    // })


    playButton.setInteractive();

    playButton.on('pointerover', () => {
      console.log('play hover')
      hoverSprite.setVisible(true);
      hoverSprite.play('walk');
      hoverSprite.x = playButton.x - playButton.width;
      hoverSprite.y = playButton.y;

    });

    playButton.on('pointerout', () => {
      console.log('play out')
      hoverSprite.setVisible(false)
  
    });

    playButton.on('pointerup', () => {
      console.log('play clicked')
      this.scene.start(CST.SCENES.LOAD);
    });



    optionsButton.setInteractive();

    optionsButton.on('pointerover', () => {
      console.log('play hover')
      hoverSprite.setVisible(true);
      hoverSprite.play('walk');
      hoverSprite.x = playButton.x - playButton.width;
      hoverSprite.y = playButton.y;

    });

    optionsButton.on('pointerout', () => {
      console.log('play out')
      hoverSprite.setVisible(false)
  
    });

    optionsButton.on('pointerup', () => {
      console.log('play clicked')
      this.scene.launch(CST.SCENES.LOAD);
    });

    console.log('2')
  }
}