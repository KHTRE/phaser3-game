import { CST } from '../../CST.js';
import { 
  moveElementBy, 
  moveElementTo, 
  scaleElementBy, 
  fadeElementTo 
} from '../Helpers/Actions.js';

export class Intro extends Phaser.Scene {
  sceneState = {      
    needHand: false,
    handDirection: true,
    update: true,
  };

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
      girlOutfit: '',
      girlPrevOutfit: '',
      progress: 0,
      accessories: [
        ['dress', 'shorts'],
        ['-yellow-bag', '-blue-bag'],
        ['-glasses', '-necklace'],
        ['-beach', '-balcony'],
      ],
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
    // adaptive on SCREEN TURN (resize)
    const resizeListener = window.addEventListener('resize', function() {
      setAdaptiveScale(soundButtonContainer);
      setAdaptiveScale(girlTalkSprite);
      setAdaptiveScale(manTalkSprite);
      setAdaptiveScale(background);
      setAdaptiveScale(girlMessage);
      setAdaptiveScale(manMessage);
      setAdaptiveScale(hintMessage);
      setAdaptiveScale(hintText);
      setAdaptiveScale(leftChoiceIcon);
      setAdaptiveScale(rightChoiceIcon);
      setAdaptiveScale(progressBar);
      setAdaptiveScale(arrowRight);
      setAdaptiveScale(arrowLeft);
      setAdaptiveScale(hand);

      setAdaptivePosition(soundButtonContainer);
      setAdaptivePosition(girlTalkSprite);
      setAdaptivePosition(manTalkSprite);
      setAdaptivePosition(background);
      setAdaptivePosition(girlMessage);
      setAdaptivePosition(manMessage);
      setAdaptivePosition(hintMessage);
      setAdaptivePosition(hintText);
      setAdaptivePosition(leftChoiceIcon);
      setAdaptivePosition(rightChoiceIcon);
      setAdaptivePosition(progressBar);
      setAdaptivePosition(arrowRight);
      setAdaptivePosition(arrowLeft);
      setAdaptivePosition(hand);
    }, true);

    
    // here we start to ADD things to the scene

    // SOUND
    // this.sound.pauseOnBlur = false;  // will not stop in other window
    let music = this.sound.add('music', {
      loop: true
    });
    music.play();

    // Sound button container
    const soundOn = this.add.image(0, 0, 'sound-on-button');
    const soundOff = this.add.image(0, 0, 'sound-off-button').setAlpha(0);
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
    const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'title-bg').setAlpha(0);
    const scaleX = this.cameras.main.width / background.width;
    const scaleY = this.cameras.main.height / background.height;
    const backgroundScale = Math.max(scaleX, scaleY);
    background.setScale(backgroundScale);

    // character SPRITE
    const girlTalkSprite = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'girl-sprite');    
    const manTalkSprite = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2 + 10, 'man-sprite');

    const characterScaleFactor = window.innerHeight / girlTalkSprite.height;
    girlTalkSprite.x = - (girlTalkSprite.width / 2) * characterScaleFactor;
    girlTalkSprite.setScale(characterScaleFactor);
    girlTalkSprite.setAlpha(0);    
    manTalkSprite.setScale(characterScaleFactor);
    manTalkSprite.setAlpha(0);

    // CHOICE icons
    const leftChoiceIcon = this.add.image(window.innerWidth * 0.3, window.innerHeight * 0.85, 'dress-icon');
    const choiceIconScaleFactor = window.innerHeight / leftChoiceIcon.height;
    leftChoiceIcon.setScale(0.2 * choiceIconScaleFactor);
    const rightChoiceIcon = this.add.image(window.innerWidth * 0.7, window.innerHeight * 0.85, 'shorts-icon');
    rightChoiceIcon.setScale(0.2 * choiceIconScaleFactor);
    leftChoiceIcon.setAlpha(0);
    rightChoiceIcon.setAlpha(0);

    // PROGRESS bar
    const progressBar = this.add.image(window.innerWidth / 2, window.innerHeight * 0.97, 'progress-bar-0');
    const progressScaleFactor = window.innerHeight / progressBar.height;
    progressBar.setScale(0.015 * progressScaleFactor);
    progressBar.setAlpha(0);

    // ARROWS
    const arrowRight = this.add.image(window.innerWidth * 0.9, window.innerHeight / 2, 'arrow-right');
    const arrowScaleFactor = window.innerHeight / arrowRight.height;
    arrowRight.setScale(0.15 * arrowScaleFactor);
    arrowRight.setAlpha(0);
    const arrowLeft = this.add.image(window.innerWidth * 0.1, window.innerHeight / 2, 'arrow-left');
    arrowLeft.setScale(0.15 * arrowScaleFactor);
    arrowLeft.setAlpha(0);

    // HAND
    const hand = this.sceneState.hand = this.add.image(window.innerWidth * 0.5, window.innerHeight * 0.95, 'hand');
    const handScaleFactor = window.innerHeight / this.sceneState.hand.height;
    this.sceneState.hand.setScale(0.25 * handScaleFactor);
    hand.setAlpha(0);


    // MESSAGES
    // girl
    const girlMessage = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'girl-message');
    const girlMessageScaleFactor = window.innerHeight / girlMessage.height;
    girlMessage.setScale(0.15 * girlMessageScaleFactor);
    girlMessage.setAlpha(0);
    // man
    const manMessage = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'man-message');
    const manMessageScaleFactor = window.innerHeight / manMessage.height;
    manMessage.setScale(0.15 * manMessageScaleFactor);
    manMessage.setAlpha(0);
    // hint
    const hintMessage = this.add.image(window.innerWidth / 2, window.innerHeight * 0.05, 'hint-message');
    const hintMessageScaleFactor = window.innerHeight / hintMessage.height;
    hintMessage.setScale(0.05 * hintMessageScaleFactor, 0.1 * hintMessageScaleFactor);
    hintMessage.setAlpha(0);

    const hintText = this.add.text(hintMessage.x, hintMessage.y, 'Some hint here one', {
      align: 'center',
      wordWrap: {
        width: 150,
    },
    });
    const hintTextScaleFactor = window.innerHeight / hintText.height;
    hintText.setOrigin(0.5);
    hintText.setScale(0.07 * hintTextScaleFactor);
    hintText.setWordWrapWidth(200)
    hintText.setAlpha(0);

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


    


    // The game STARS here
    const mainScenario = async() => {

      // INTRO animation
      fadeElementTo(background, 0.5, 2);
      await fadeElementTo(manTalkSprite, 1, 2);
      manTalkSprite.play({
        key: 'man-talk',
        repeat: 4,
      });
      await fadeElementTo(manMessage, 1, 0.5);
      await fadeElementTo(manMessage, 1, 2);
      await fadeElementTo(manMessage, 0, 0.5);
      await moveElementBy(manTalkSprite, window.innerWidth, 0, 1);
      fadeElementTo(manTalkSprite, 0, 2);
      girlTalkSprite.setAlpha(1);
      await moveElementTo(girlTalkSprite, window.innerWidth / 2, girlTalkSprite.y, 0.5);
      girlTalkSprite.play({
        key: 'girl-talk',
        repeat: 4,
      });
      await fadeElementTo(girlMessage, 1, 0.5);
      await fadeElementTo(girlMessage, 1, 2);
      fadeElementTo(girlMessage, 0, 0.5);
      fadeElementTo(background, 1, 0.5);
      fadeElementTo(hintMessage, 1, 0.5);
      fadeElementTo(progressBar, 1, 0.5);
      fadeElementTo(leftChoiceIcon, 1, 0.5);
      fadeElementTo(rightChoiceIcon, 1, 0.5);
      hintText.setText('Choose your outfit');
      fadeElementTo(hintText, 1, 0.5);
      await moveElementBy(girlTalkSprite, 0, window.innerHeight * 0.1, 0.5);
      girlTalkSprite.setTexture('girl-shy');

      // the GAME itself      

      const handTimer = setTimeout(() => {
        fadeElementTo(hand, 1, 0.5);
        this.sceneState.needHand = true;
      }, 2000);

      leftChoiceIcon.setInteractive();
      rightChoiceIcon.setInteractive();

      leftChoiceIcon.on('pointerover', () => {
        fadeElementTo(leftChoiceIcon, 0.7, 0.3);
      });
      leftChoiceIcon.on('pointerout', () => {
        fadeElementTo(leftChoiceIcon, 1, 0.3);
      });
      rightChoiceIcon.on('pointerover', () => {
        fadeElementTo(rightChoiceIcon, 0.7, 0.3);
      });
      rightChoiceIcon.on('pointerout', () => {
        fadeElementTo(rightChoiceIcon, 1, 0.3);
      });

      leftChoiceIcon.on('pointerup', () => {
        state.girlOutfit = 'girl-in-dress';
        state.girlPrevOutfit = 'girl-in-dress';
        this.sceneState.needHand = false;
        clearTimeout(handTimer);
        fadeElementTo(hand, 0, 0.5);
        makeChoice();        
      });

      rightChoiceIcon.on('pointerup', () => {
        state.girlOutfit = 'girl-in-shorts';
        state.girlPrevOutfit = 'girl-in-shorts';
        this.sceneState.needHand = false;
        clearTimeout(handTimer);
        fadeElementTo(hand, 0, 0.5);
        makeChoice();        
      });

      arrowRight.on('pointerover', () => {
        scaleElementBy(arrowRight, 1.25, 0.3);
      });
      arrowRight.on('pointerout', () => {
        scaleElementBy(arrowRight, 0.8, 0.3);
      });

      arrowRight.on('pointerup', ()=>{
        state.progress++
        confirmChoice();
        arrowRight.off('pointerup')
      });

    }

    // call the main function
    mainScenario();
    
    async function makeChoice() { 
      await fadeElementTo(girlTalkSprite, 0.6, 0.2);
      girlTalkSprite.setTexture(state.girlOutfit);
      fadeElementTo(arrowRight, 1, 0.5);
      arrowRight.setInteractive();
      await fadeElementTo(girlTalkSprite, 1, 0.2);
    }

    const confirmChoice = async () => {
      fadeElementTo(arrowRight, 0, 0.5);

      const handTimer = setTimeout(() => {
        fadeElementTo(hand, 1, 0.5);
        this.sceneState.needHand = true;
      }, 2000);

      leftChoiceIcon.off('pointerup');
      rightChoiceIcon.off('pointerup');

      leftChoiceIcon.on('pointerup', () => {
        state.girlOutfit = state.girlPrevOutfit + state.accessories[state.progress][0];
        this.sceneState.needHand = false;
        clearTimeout(handTimer);
        fadeElementTo(hand, 0, 0.5);
        makeChoice();        
      });
      rightChoiceIcon.on('pointerup', () => {
        state.girlOutfit = state.girlPrevOutfit + state.accessories[state.progress][1];
        this.sceneState.needHand = false;
        clearTimeout(handTimer);
        fadeElementTo(hand, 0, 0.5);
        makeChoice(); 
      });

      progressBar.setTexture(`progress-bar-${state.progress}`)
      fadeElementTo(leftChoiceIcon, 0.6, 0.2);
      await fadeElementTo(rightChoiceIcon, 0.6, 0.2);
      leftChoiceIcon.setTexture('yellow-bag-icon');
      rightChoiceIcon.setTexture('blue-bag-icon');
      fadeElementTo(leftChoiceIcon, 1, 0.2);
      await fadeElementTo(rightChoiceIcon, 1, 0.2);

      arrowRight.off('pointerup')
      arrowRight.on('pointerup', ()=>{
        state.progress++
        state.girlPrevOutfit = state.girlOutfit;
        confirmChoice();
      });
    }

    // giving NAMES to element - NEED for adaptiveness
    manTalkSprite.name = 'manTalkSprite'; 
    girlTalkSprite.name = 'girlTalkSprite'; 
    background.name = 'background';
    manMessage.name = 'manMessage';
    girlMessage.name = 'manMessage';
    soundButtonContainer.name = 'soundButtonContainer';
    hintMessage.name = 'hintMessage';
    hintText.name = 'hintText';
    leftChoiceIcon.name = 'leftChoiceIcon';
    rightChoiceIcon.name = 'rightChoiceIcon';
    progressBar.name = 'progressBar';
    arrowRight.name = 'arrowRight';
    arrowLeft.name = 'arrowLeft';
    hand.name = 'hand';
  }

  update() {
    if (this.sceneState.update && this.sceneState.needHand) {
      if (this.sceneState.handDirection) {
        this.sceneState.hand.x += window.innerWidth / 100;
        if (this.sceneState.hand.x > window.innerWidth * 0.7) {
          this.sceneState.handDirection = false;
          this.sceneState.update = false;
          setTimeout(() => {
            this.sceneState.update = true;
          }, 1500);
        }
      } else if (!this.sceneState.handDirection) {
        this.sceneState.hand.x -= window.innerWidth / 100;
        if (this.sceneState.hand.x < window.innerWidth * 0.33) {
          this.sceneState.handDirection = true;
          this.sceneState.update = false;
          setTimeout(() => {
            this.sceneState.update = true;
          }, 1500);
        }
      }
    }    
  }
}