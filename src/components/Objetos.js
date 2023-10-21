import Phaser from "phaser";
// import events from "./EventCenter"
export default class Objetos extends Phaser.Physics.Arcade.Sprite {
  
  body;

  constructor(scene, x, y, texture) {
    
    super(scene, x, y, texture);

    console.log("scene",scene)
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    
    this.body.setImmovable(true);
    this.body.allowGravity = false;

   
  }


  
}
