import { CST } from '../../CST.js';

export class Intro extends Phaser.Scene {
  gameState = {};

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
      actions: {},
      timers: [],
    };

    // make things ADAPTIVE
    function setAdaptiveScale(element) {
      if (!state.initScale.hasOwnProperty(element.name)) {
        state.initScale[element.name] = element.scale
      }      

      const initScale = state.initScale[element.name]
      const heightScale = window.innerHeight / state.heightStart;
      element.setScale(initScale * heightScale);
    }

    function setAdaptivePosition(element) {
      if (!state.initPosition.hasOwnProperty(element.name)) {
        state.initPosition[element.name] = [element.x, element.y]
      }  
      const heightScale = window.innerHeight / state.heightStart;
      const widthScale = window.innerWidth / state.widthStart;
      element.x = state.initPosition[element.name][0] * widthScale
      element.y = state.initPosition[element.name][1] * heightScale
    }
 
    // adaptive on SCREEN TURN
    const resizeListener = window.addEventListener('resize', function() {
      // IN ORDER TO WORK MUST GIVE NAMES TO ELEMENTS !!!!!!!!!!!!!
      // setAdaptiveScale(soundButtonContainer);
      setAdaptiveScale(girlTalkSprite);
      setAdaptiveScale(manTalkSprite);
      setAdaptiveScale(background);

      // setAdaptivePosition(soundButtonContainer)
      setAdaptivePosition(girlTalkSprite)
      setAdaptivePosition(manTalkSprite)
      setAdaptivePosition(background)
    }, true);

    
    // here we start to ADD things to the scene

    // SOUND
    this.sound.pauseOnBlur = false;  // will not stop in other window
    let music = this.sound.add('music', {
      loop: true
    });
    music.play();

    // Sound button container
    const soundOn = this.add.image(0, 0, 'sound_on_button');
    const soundOff = this.add.image(0, 0, 'sound_off_button').setAlpha(0);
    const soundButtonContainer = this.add.container(window.innerWidth * 0.1, window.innerHeight * 0.9).setDepth(3);
    soundButtonContainer.add(soundOn);
    soundButtonContainer.add(soundOff);
    const soundButtonScaleFactor = window.innerHeight / soundOn.height;
    soundButtonContainer.setScale(0.1 * soundButtonScaleFactor);
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
      
    // adaptive BACKGROUND
    const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'title_bg').setAlpha(0);
    const scaleX = this.cameras.main.width / background.width;
    const scaleY = this.cameras.main.height / background.height;
    const backgroundScale = Math.max(scaleX, scaleY);
    background.setScale(backgroundScale);

    // character SPRITE
    const girlTalkSprite = this.add.sprite(window.innerWidth / 2 - 200, window.innerHeight / 2, 'girl-sprite');

    const characterScaleFactor = window.innerHeight / girlTalkSprite.height;
    girlTalkSprite.setScale(characterScaleFactor);

    const manTalkSprite = this.add.sprite(window.innerWidth / 2 + 200, window.innerHeight / 2, 'man-sprite');
    manTalkSprite.setScale(characterScaleFactor);

    // // MESSAGE
    // // girl
    // const girlMessage = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'girl-message');
    // const girlMessageScaleFactor = window.innerHeight / soundOn.height;
    // girlMessage.setScale(0.7 * girlMessageScaleFactor);
    // girlMessage.setAlpha(0);

    // // man
    // const manMessage = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'man-message');
    // const manMessageScaleFactor = window.innerHeight / soundOn.height;
    // manMessage.setScale(0.7 * manMessageScaleFactor);
    // manMessage.setAlpha(0);

     // create ANIMATION
    this.anims.create({
      key: 'girl-talk',
      frameRate: 5,
      repeat: 1,
      frames: this.anims.generateFrameNumbers('girl-sprite', {
        frames: [1, 0]
      }),
    });

    this.anims.create({
      key: 'man-talk',
      frameRate: 5,
      repeat: 1,
      frames: this.anims.generateFrameNumbers('man-sprite', {
        frames: [0, 1]
      }),
    });

    // // custom ANIMATIONS (character actions)
    // girlTalkSprite.x = - girlTalkSprite.width;
    // manTalkSprite.x = window.innerWidth + manTalkSprite.width;

    // fadeElementTo(background, 0.5, 1);
    // fadeElementTo(background, 0.51, 6);

    // const charOneToCenter = manTalkSprite.x - window.innerWidth / 2
    // const charTwoToCenter = manTalkSprite.x - window.innerWidth / 2
    // moveElementBy(manTalkSprite, - charTwoToCenter, 0, 1);

    // customTimer(() => {
    //   manMessage.setAlpha(1)
    // }, 1000);
    // customTimer(() => {
    //   manMessage.setAlpha(0)
    // }, 3000);
    // customTimer(() => {
    //   girlMessage.setAlpha(1)
    // }, 5000);
    // customTimer(() => {
    //   girlMessage.setAlpha(0)
    // }, 7000);


    
    // manTalkSprite.play({
    //   key: 'man-talk',
    //   repeat: 4,
    //   delay: 1000
    // });
    // moveElementBy(manTalkSprite, 0.1, 0, 2);
    // moveElementBy(manTalkSprite, charTwoToCenter, 0, 1);

    // moveElementBy(girlTalkSprite, charOneToCenter, 0, 1);
    // girlTalkSprite.play({
    //   key: 'girl-talk',
    //   repeat: 4,
    //   delay: 5000
    // });
    // moveElementBy(girlTalkSprite, 0.1, 0, 2);
    // moveElementBy(girlTalkSprite, 0, 100, 1);

    // fadeElementTo(background, 1, 1);


    // giving names to element NEED for adaptiveness
    manTalkSprite.name = 'manTalkSprite'; 
    girlTalkSprite.name = 'girlTalkSprite'; 
    background.name = 'background';
    // manMessage.name = 'manMessage';
    // girlMessage.name = 'manMessage';
    soundButtonContainer.name = 'soundButtonContainer';
    
    // setTimeout(()=> {
    //   this.scene.start(CST.SCENES.FIRST_SCREEN);
    // }, 8000)



    girlTalkSprite.x = 100


    function moveElementBy(element, moveX, moveY, seconds) {
      return new Promise((res) => {
        let iterations = Math.ceil(seconds * 1000 / 16);
        const xStep = moveX / iterations;
        const xEnd = element.x + moveX;
        const yStep = moveY / iterations;
        const yEnd = element.y + moveY;

        const interval = setInterval(()=>{
          element.x += xStep;
          element.y += yStep;
          iterations--;

          if(iterations === 0) {
            element.x = xEnd;
            element.y = yEnd;
            clearInterval(interval);
            res('moveElementBy finished');
          }
        }, 16);
      }) 
    }

    function scaleElementBy(element, scaleBy, seconds) {
      return new Promise((res) => {
        let iterations = Math.ceil(seconds * 1000 / 16);
        const scaleEnd = element.scale * scaleBy;
        const scaleStep = (scaleEnd - element.scale) / iterations;
        let currentScale = element.scale

        const interval = setInterval(()=>{
          currentScale += scaleStep;
          element.setScale(currentScale)
          iterations--;

          if(iterations === 0) {
            element.setScale(scaleEnd);
            clearInterval(interval);
            res('scaleElementBy finished');
          }
        }, 16);
      }) 
    }


    function fadeElementTo(element, fadeTo, seconds) {
      return new Promise((res) => {
        let iterations = Math.ceil(seconds * 1000 / 16);
        const fadeStep = (fadeTo - element.alpha) / iterations;
        let currentFade = element.alpha

        const interval = setInterval(()=>{
          currentFade += fadeStep;
          element.setAlpha(currentFade)
          iterations--;

          if(iterations === 0) {
            element.setAlpha(fadeTo);
            clearInterval(interval);
            res('fadeElementTo finished');
          }
        }, 16);
      }) 
    }



    const moover2 = async() => {
      scaleElementBy(girlTalkSprite, 1.5, 3);
      scaleElementBy(manTalkSprite, 1.5, 3);
      moveElementBy(manTalkSprite, 0, 150, 3);
      await moveElementBy(girlTalkSprite, 0, 150, 3);
    }

    const moover3 = async() => {
      await fadeElementTo(background, 0.6, 2);
      await fadeElementTo(manTalkSprite, 0, 2);
      await fadeElementTo(manTalkSprite, 1, 2);
      await moveElementBy(manTalkSprite, -300, 0, 2);
      await moveElementBy(manTalkSprite, 0, 0, 2);
      await moveElementBy(manTalkSprite, 300, 0, 2);

      await moveElementBy(girlTalkSprite, 300, 0, 2);
      await moveElementBy(girlTalkSprite, 0, 0, 1);

      await moover2();
    }

    moover3();




















  }

  update() {

  }
}