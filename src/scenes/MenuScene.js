import { CST } from '../../CST.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.MENU
    }) 
  }

  init(data) {

    // this.scale.startFullscreen() // FULLSCREEN!!!!!!!!!!!!
  }

  create() {

    const state = {
      initScale: {},
      initPosition: {},
    };
    
    
    const scaleFactor = window.innerHeight / 869; // character hight

    // adaptive BACKGROUND
    let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'title_bg')
    let scaleX = this.cameras.main.width / background.width
    let scaleY = this.cameras.main.height / background.height
    let scale = Math.max(scaleX, scaleY)
    background.setScale(scale).setScrollFactor(0)
    
    // BASE SCALE
    const baseScale = scale

    // BUTTONS
    let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.4, 'play_button').setDepth(1);
    let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.6, 'options_button').setDepth(1);


    // SPRITE
    let girlTalkSprite = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, 'girl-sprite');
    girlTalkSprite.setScale(scaleFactor);
    girlTalkSprite.setVisible(false)

    

    // TEXT CONTAINER
    let box = this.add.rectangle(0, 0, 148, 50, 0x6666ff);
    box.setStrokeStyle(4, 0xefc53f);
    let text = this.add.text(0, 0, "Some text 123 but \nit will go for sure", {font: "16px Arial", fill: "#ffffff"});
    text.setOrigin(0.5);

    const textContainer = this.add.container(400, 300);
    textContainer.add(box);
    textContainer.add(text);   
    textContainer.setScale(2)


    // Sound button container
    const soundOn = this.add.image(0, 0, 'sound_on_button');
    const soundOff = this.add.image(0, 0, 'sound_off_button').setAlpha(0);
    const soundButtonContainer = this.add.container(window.innerWidth * 0.1, window.innerHeight * 0.9);
    soundButtonContainer.add(soundOn);
    soundButtonContainer.add(soundOff);
    soundButtonContainer.setScale(0.1 * baseScale, 0.1 * baseScale);
    soundOn.setInteractive();
    soundOff.setInteractive();

    soundOn.on('pointerup', () => {
      music.pause();
      soundOff.setAlpha(100);
      soundOn.setAlpha(0);
    });
    soundOff.on('pointerup', () => {
      music.resume();
      soundOff.setAlpha(0);
      soundOn.setAlpha(100);
    });




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
    // this.sound.pauseOnBlur = false;  // will not stop in other window
    let music = this.sound.add('music', {
      loop: true
    })

    music.play()




    //OVERLAY
    // setTimeout(() => {
    // const overlay = this.add.renderTexture(0, 0, 600, 600);
    // overlay.fill(0x000000, 0.7);
    // }, 1000);



    //FADE OUT on space
    this.input.keyboard.once('keydown-SPACE', () => {
      // fade to black
    this.cameras.main.fadeOut(1000, 0, 0, 0)

    setTimeout(() => {
      this.cameras.main.fadeIn(1000, 0, 0, 0)
    }, 2000)
    })



    let newGirl = this.add.sprite(1100, 150, 'girl-sprite');
    newGirl.setAlpha(0)



    // SET FADE TO SPRITES
    const setFadeToSprite = (sprite, seconds = 1, reverse = false) => {
      let fadeCoefficient;
      let fade;

      if (reverse) {
        fadeCoefficient = 1;
        fade = setInterval(() => {
          fadeCoefficient -= 0.01;
          sprite.setAlpha(fadeCoefficient)
    
          if (fadeCoefficient <= 0) {
            clearInterval(fade)
          }
        }, seconds * 10);
      } else {
        fadeCoefficient = 0;
        fade = setInterval(() => {
          fadeCoefficient += 0.01;
          sprite.setAlpha(fadeCoefficient)
    
          if (fadeCoefficient >= 1) {
            clearInterval(fade)
          }
        }, seconds * 10);
      }
    }

    setFadeToSprite(newGirl, 5, true);
    setFadeToSprite(background);


    







    playButton.setInteractive();

    playButton.on('pointerover', () => {
      girlTalkSprite.setVisible(true);
      girlTalkSprite.play('talk');

      text.setText('123'); //change text

    });

    playButton.on('pointerout', () => {

    });

    playButton.on('pointerup', () => {

    });



    

    const widthStart = window.innerWidth;
    const heightStart = window.innerHeight;

    const setAdaptiveScale = (element) => {
      if (!state.initScale.hasOwnProperty(element.type)) {
        state.initScale[element.type] = element.scale
      }      

      const initScale = state.initScale[element.type]
      console.log('init Scale =', initScale)
      const heightScale = window.innerHeight / heightStart;
      element.setScale(initScale * heightScale);
    }

    const setAdaptivePosition = (element) => {
      if (!state.initPosition.hasOwnProperty(element.type)) {
        console.log(element.x, element.y)
        state.initPosition[element.type] = [element.x, element.y]
      }  

      const heightScale = window.innerHeight / heightStart;
      const widthScale = window.innerWidth / widthStart;
      element.x = state.initPosition[element.type][0] * widthScale
      element.y = state.initPosition[element.type][1] * heightScale
    }
 

    window.addEventListener('resize', function(event) {
      // let heightScale = window.innerHeight / heightStart;
 
      // background.setX(window.innerWidth / 2);
      // background.setY(window.innerHeight / 2);
      // girlTalkSprite.setX(window.innerWidth / 2);
      // girlTalkSprite.setY(window.innerHeight / 2);
      playButton.setX(window.innerWidth / 2);

      // girlTalkSprite.setScale(scaleFactor * heightScale);
      // soundButtonContainer.setScale(soundButtonContainer.scale * heightScale);


      setAdaptiveScale(soundButtonContainer);
      setAdaptiveScale(girlTalkSprite);
      setAdaptiveScale(background);

      setAdaptivePosition(soundButtonContainer)
      setAdaptivePosition(girlTalkSprite)
      setAdaptivePosition(background)


      // background.setScale(scale * heightScale);
    }, true);
  }
}