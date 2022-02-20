import { CST } from '../../CST.js';

export class FirstScreen extends Phaser.Scene {

  constructor() {
    super({
      key: CST.SCENES.FIRST_SCREEN
    }) 
  }

  init() {
    console.log('started')
    console.log(this)
  }

  create() {

  }

  update() {

  }
}