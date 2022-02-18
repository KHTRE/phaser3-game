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
    
    let screenScale;
    let widthScale;
    let heightScale;

    const scaleFactor = window.innerHeight / 869; 
    console.log(scaleFactor)

    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.2, 'logo').setDepth(1)

    let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'title_bg')
    let scaleX = this.cameras.main.width / background.width
    let scaleY = this.cameras.main.height / background.height
    let scale = Math.max(scaleX, scaleY)
    background.setScale(scale).setScrollFactor(0)

    let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.4, 'play_button').setDepth(1);

    let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.6, 'options_button').setDepth(1);

    // sprites
    let hoverSprite = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, 'girl-sprite');
    hoverSprite.setScale(scaleFactor);
    hoverSprite.setVisible(false)


    // create ANIMATION

    this.anims.create({
      key: 'talk',
      frameRate: 2,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('girl-sprite', {
        frames: [0, 1]
      })
    })


    // SOUND
    // this.sound.pauseOnBlur = false;
    // this.sound.play('music', {
    //   loop: true
    // })


    playButton.setInteractive();

    playButton.on('pointerover', () => {
      hoverSprite.setVisible(true);
      hoverSprite.play('talk');
      // hoverSprite.x = playButton.x - playButton.width;
      // hoverSprite.y = playButton.y;
      // hoverSprite.x = 400 * scaleFactor;
      // hoverSprite.y = 450 * scaleFactor;

    });

    // playButton.on('pointerout', () => {
    //   console.log('play out')
    //   hoverSprite.setVisible(false)
  
    // });

    playButton.on('pointerup', () => {
      // console.log('play clicked')
      // this.scene.start(CST.SCENES.LOAD);

    });



    // optionsButton.setInteractive();

    // optionsButton.on('pointerover', () => {
    //   console.log('play hover')
    //   hoverSprite.setVisible(true);
    //   hoverSprite.play('walk');
    //   hoverSprite.x = playButton.x - playButton.width;
    //   hoverSprite.y = playButton.y;

    // });

    // optionsButton.on('pointerout', () => {
    //   console.log('play out')
    //   hoverSprite.setVisible(false)
  
    // });

    // optionsButton.on('pointerup', () => {
    //   console.log('play clicked')
    //   this.scene.launch(CST.SCENES.LOAD);
    // });

    console.log('back', background)
    const widthStart = window.innerWidth;
    const heightStart = window.innerHeight;
    const initBgWidth = background.width;

    console.log('girl', hoverSprite)

    window.addEventListener('resize', function(event) {

      let widthScale = window.innerWidth / widthStart;
      let heightScale = window.innerHeight / heightStart;
      let bgWScale = window.innerHeight / initBgWidth;


    
 
      background.setX(window.innerWidth / 2);
      background.setY(window.innerHeight / 2);
      hoverSprite.setX(window.innerWidth / 2);
      hoverSprite.setY(window.innerHeight / 2);
      playButton.setX(window.innerWidth / 2);
      hoverSprite.setScale(scaleFactor * heightScale)

      console.log('heightScale', heightScale)
      console.log('widthScale', heightScale)
      console.log('scale', scale)
      // background.setScale(scale * widthScale)


      console.log('bgWScale', bgWScale)
      console.log('heightScale', heightScale)
      console.log('widthScale', widthScale)


      if (widthStart > heightStart) {
        console.log('no!!!!!!!!!!!!!!!!!!!')
        background.setScale(scale * heightScale)
      } else {
        console.log('YYYYYYYYYYYYYYY!!!!!!!!!!!!!!!!!!!')
        // background.setScale(scale * widthScale)
        // background.setScale(scale / widthScale)
      }

      


    }, true);
  }
}