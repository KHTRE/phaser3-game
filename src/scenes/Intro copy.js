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

    function setAdaptivePosition(element, mes = '0') {
      if (!state.initPosition.hasOwnProperty(element.name)) {
        state.initPosition[element.name] = [element.x, element.y]
      }  
      console.log(mes)
      const heightScale = window.innerHeight / state.heightStart;
      const widthScale = window.innerWidth / state.widthStart;
      element.x = state.initPosition[element.name][0] * widthScale
      element.y = state.initPosition[element.name][1] * heightScale
    }
 
    // adaptive on SCREEN TURN
    const resizeListener = window.addEventListener('resize', function() {
      setAdaptiveScale(soundButtonContainer);
      setAdaptiveScale(girlTalkSprite);
      setAdaptiveScale(manTalkSprite);
      setAdaptiveScale(background);

      setAdaptivePosition(soundButtonContainer)
      setAdaptivePosition(girlTalkSprite)
      setAdaptivePosition(manTalkSprite, 'man')
      setAdaptivePosition(background)
    }, true);

     // will MOVE selected element (move to 0.01 to delay)
     function moveElementBy(element, x, y, seconds = 1) {
      const moveElement = () => {
        state.actions[element.type] = true;

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
            state.actions[element.type] = false;
          }
        }, 16);
      };

      if (!state.actions.hasOwnProperty(element.type) || state.actions[element.type] === false) {
        moveElement();
      } else {
        const wait = setInterval(() => {
          if (state.actions[element.type] === false) {
            moveElement();
            clearInterval(wait);
          }
        }, 16);
      } 
    }

    // SCALE element (live)
    function scaleElementBy(element, scaleBy, seconds = 1) {
      const scaleElement = () => {
        state.actions[element.type] = true;

        const iterations = seconds * 1000 / 16;
        const startScale = element.scale;
        const endScale = element.scale * scaleBy;
        let currentScale = startScale
        const step = (endScale - startScale) / iterations;

        const scale = setInterval(() => {
          currentScale += step;
          element.setScale(currentScale); 

          const scaleDone = Math.abs(element.scale - endScale) <= Math.abs(step);

          if (scaleDone) {
            element.setScale(endScale);
            clearInterval(scale);
            state.actions[element.type] = false;
          }
        }, 16);
      };

      if (!state.actions.hasOwnProperty(element.type) || state.actions[element.type] === false) {
        scaleElement();
      } else {
        const wait = setInterval(() => {
          if (state.actions[element.type] === false) {
            scaleElement();
            clearInterval(wait);
          }
        }, 16);
      } 
    }

     // FADE element (live)
     function fadeElementTo(element, fadeTo, seconds = 1) {
      const fadeElement = () => {
        state.actions[element.type] = true;

        const iterations = seconds * 1000 / 16;
        const startFade = element.alpha;
        const endFade = fadeTo;
        let currentFade = startFade;
        const step = (endFade - startFade) / iterations;

        const fade = setInterval(() => {
          currentFade += step;
          element.setAlpha(currentFade); 

          const fadeDone = Math.abs(element.alpha - endFade) <= Math.abs(step);

          if (fadeDone) {
            element.setAlpha(endFade);
            clearInterval(fade);
            state.actions[element.type] = false;
          }
        }, 16);
      };

      if (!state.actions.hasOwnProperty(element.type) || state.actions[element.type] === false) {
        fadeElement();
      } else {
        const wait = setInterval(() => {
          if (state.actions[element.type] === false) {
            fadeElement();
            clearInterval(wait);
          }
        }, 16);
      } 
    }

    // will keep track of TIMERS
    function customTimer(callback, time) {
      const timer = setTimeout(()=>{
        callback();
        state.timers.pop();
      }, time);
      state.timers.push(timer);
    }
  
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
    const girlTalkSprite = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'girl-sprite');

    const characterScaleFactor = window.innerHeight / girlTalkSprite.height;
    girlTalkSprite.setScale(characterScaleFactor);

    const manTalkSprite = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'man-sprite');
    manTalkSprite.setScale(characterScaleFactor);

    // MESSAGE
    // girl
    const girlMessage = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'girl-message');
    const girlMessageScaleFactor = window.innerHeight / soundOn.height;
    girlMessage.setScale(0.7 * girlMessageScaleFactor);
    girlMessage.setAlpha(0);

    // man
    const manMessage = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'man-message');
    const manMessageScaleFactor = window.innerHeight / soundOn.height;
    manMessage.setScale(0.7 * manMessageScaleFactor);
    manMessage.setAlpha(0);

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

    // custom ANIMATIONS (character actions)
    girlTalkSprite.x = - girlTalkSprite.width;
    manTalkSprite.x = window.innerWidth + manTalkSprite.width;

    fadeElementTo(background, 0.5, 1);
    fadeElementTo(background, 0.51, 6);

    const charOneToCenter = manTalkSprite.x - window.innerWidth / 2
    const charTwoToCenter = manTalkSprite.x - window.innerWidth / 2
    moveElementBy(manTalkSprite, - charTwoToCenter, 0, 1);

    customTimer(() => {
      manMessage.setAlpha(1)
    }, 1000);
    customTimer(() => {
      manMessage.setAlpha(0)
    }, 3000);
    customTimer(() => {
      girlMessage.setAlpha(1)
    }, 5000);
    customTimer(() => {
      girlMessage.setAlpha(0)
    }, 7000);


    
    manTalkSprite.play({
      key: 'man-talk',
      repeat: 4,
      delay: 1000
    });
    moveElementBy(manTalkSprite, 0.1, 0, 2);
    moveElementBy(manTalkSprite, charTwoToCenter, 0, 1);

    moveElementBy(girlTalkSprite, charOneToCenter, 0, 1);
    girlTalkSprite.play({
      key: 'girl-talk',
      repeat: 4,
      delay: 5000
    });
    moveElementBy(girlTalkSprite, 0.1, 0, 2);
    moveElementBy(girlTalkSprite, 0, 100, 1);

    fadeElementTo(background, 1, 1);


    // giving names to element
    manTalkSprite.name = 'manTalkSprite'; 
    girlTalkSprite.name = 'girlTalkSprite'; 
    background.name = 'background';
    manMessage.name = 'manMessage';
    girlMessage.name = 'manMessage';
    soundButtonContainer.name = 'soundButtonContainer';
    
    setTimeout(()=> {
      this.scene.start(CST.SCENES.FIRST_SCREEN);
    }, 8000)
  }

  update() {

  }
}