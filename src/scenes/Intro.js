import { CST } from '../../CST.js';

export class Intro extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.INTRO
    }) 
  }

  init() {

    // FULLSCREEN
    // this.scale.startFullscreen() 
  }

  create() {

    const state = {
      initScale: {},
      initPosition: {},
      widthStart: window.innerWidth,
      heightStart: window.innerHeight,
      movement: {},
      delay: {},
    };
      
    // adaptive BACKGROUND
    const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'title_bg').setAlpha(0);
    const scaleX = this.cameras.main.width / background.width;
    const scaleY = this.cameras.main.height / background.height;
    const backgroundScale = Math.max(scaleX, scaleY);
    background.setScale(backgroundScale);

    // BUTTONS
    // const playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.4, 'play_button').setDepth(1);
    // const optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.6, 'options_button').setDepth(1);

    // character SPRITE
    const girlTalkSprite = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, 'girl-sprite');
    const characterScaleFactor = window.innerHeight / girlTalkSprite.height;
    girlTalkSprite.setScale(characterScaleFactor);
    // girlTalkSprite.setVisible(false)

    const girlTalkSprite2 = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, 'girl-sprite');
    const characterScaleFactor2 = window.innerHeight / girlTalkSprite.height;
    girlTalkSprite2.setScale(characterScaleFactor);

    // TEXT CONTAINER
    // let box = this.add.rectangle(0, 0, 148, 50, 0x6666ff);
    // box.setStrokeStyle(4, 0xefc53f);
    // let text = this.add.text(0, 0, "Some text 123 but \nit will go for sure", {font: "16px Arial", fill: "#ffffff"});
    // text.setOrigin(0.5);

    // const textContainer = this.add.container(400, 300);
    // textContainer.add(box);
    // textContainer.add(text);   
    // textContainer.setScale(1.5 * characterScaleFactor)


    // Sound button container
    const soundOn = this.add.image(0, 0, 'sound_on_button');
    const soundOff = this.add.image(0, 0, 'sound_off_button').setAlpha(0);
    const soundButtonContainer = this.add.container(window.innerWidth * 0.1, window.innerHeight * 0.9);
    soundButtonContainer.add(soundOn);
    soundButtonContainer.add(soundOff);
    soundButtonContainer.setScale(0.1 * characterScaleFactor);
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
      }),
    });



    // SOUND
    this.sound.pauseOnBlur = false;  // will not stop in other window
    let music = this.sound.add('music', {
      loop: true
    });
    music.play();




    //OVERLAY
    // setTimeout(() => {
    // const overlay = this.add.renderTexture(0, 0, 600, 600);
    // overlay.fill(0x000000, 0.7);
    // }, 1000);

    // //FADE OUT on space
    // this.input.keyboard.once('keydown-SPACE', () => {
    //   this.cameras.main.fadeOut(1000, 0, 0, 0)

    //   setTimeout(() => {
    //     this.cameras.main.fadeIn(1000, 0, 0, 0)
    //   }, 2000)
    // })

    

    girlTalkSprite.x = -girlTalkSprite.width;
    girlTalkSprite2.x = girlTalkSprite.width * 4;
    setFadeToSprite(background, 0, 0.5);

    moveElementBy(girlTalkSprite2, -750, 0, 1)
    moveElementBy(girlTalkSprite2, 0.1, 0, 2)
    moveElementBy(girlTalkSprite2, 700, 0, 1)

    moveElementBy(girlTalkSprite, 750, 0, 1)
    moveElementBy(girlTalkSprite, 0.1, 0, 2)
    moveElementBy(girlTalkSprite, 0, 50, 1)
   



 
  
    // will MOVE selected element (move to 0.01 to delay)
    function moveElementBy(element, x, y, seconds) {
      const moveElement = () => {
        state.movement[element.type] = true;

        const iterations = seconds * 1000 / 16;
        const xStart = element.x;
        const xEnd = xStart + x;
        const yEnd = element.y + y;

        const move = setInterval(() => {
          element.x += x / iterations;
          element.y += y / iterations;
          const xInPlace = Math.abs(element.x - xEnd) <= Math.abs(x / iterations);
          const yInPlace = Math.abs(element.y - yEnd) <= Math.abs(y / iterations);

          if (xInPlace && yInPlace) {
            element.x = xEnd;
            clearInterval(move);
            state.movement[element.type] = false;
          }
        }, 16);
      };

      if (!state.movement.hasOwnProperty(element.type) || state.movement[element.type] === false) {
        moveElement();
      } else {
        const wait = setInterval(() => {
          if (state.movement[element.type] === false) {
            moveElement();
            clearInterval(wait);
          }
        }, 16);
      } 
    }




    // playButton.setInteractive();

    // playButton.on('pointerover', () => {
    //   girlTalkSprite.setVisible(true);
    //   girlTalkSprite.play('talk');
    // });

    // playButton.on('pointerout', () => {

    // });

    // playButton.on('pointerup', () => {

    // });
    
    // set FADE to SPRITE
    function setFadeToSprite(
      sprite, 
      start = 0, 
      end = 1, 
      seconds = 1
    ) {
      let fadeCoefficient = start;
      let fade;

      if (start > end) {
        fade = setInterval(() => {
          fadeCoefficient -= 0.01;
          sprite.setAlpha(fadeCoefficient);
    
          if (fadeCoefficient <= end) {
            clearInterval(fade);
          }
        }, seconds * 10);
      } else {
        fade = setInterval(() => {
          fadeCoefficient += 0.01;
          sprite.setAlpha(fadeCoefficient);
    
          if (fadeCoefficient >= end) {
            clearInterval(fade);
          }
        }, seconds * 10);
      }
    }

    // make things ADAPTIVE
    function setAdaptiveScale(element) {
      if (!state.initScale.hasOwnProperty(element.type)) {
        state.initScale[element.type] = element.scale
      }      

      const initScale = state.initScale[element.type]
      const heightScale = window.innerHeight / state.heightStart;
      element.setScale(initScale * heightScale);
    }

    function setAdaptivePosition(element) {
      if (!state.initPosition.hasOwnProperty(element.type)) {
        state.initPosition[element.type] = [element.x, element.y]
      }  

      const heightScale = window.innerHeight / state.heightStart;
      const widthScale = window.innerWidth / state.widthStart;
      element.x = state.initPosition[element.type][0] * widthScale
      element.y = state.initPosition[element.type][1] * heightScale
    }
 
    // adaptive on SCREEN TURN
    const resizeListener = window.addEventListener('resize', function() {
      setAdaptiveScale(soundButtonContainer);
      setAdaptiveScale(girlTalkSprite);
      setAdaptiveScale(background);

      setAdaptivePosition(soundButtonContainer)
      setAdaptivePosition(girlTalkSprite)
      setAdaptivePosition(background)
    }, true);

  }

  
  update() {
    // this.move(girlTalkSprite)
  }
}