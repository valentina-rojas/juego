import Phaser from "phaser";
// import events from "./EventCenter";

export default class Objetos extends Phaser.Physics.Arcade.Sprite {
  

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    
    

   
  }

  
}
