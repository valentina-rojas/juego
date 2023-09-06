import Phaser from "phaser";
// import events from "./EventCenter";


export default class Jugador extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);
      
    
      scene.add.existing(this);
      scene.physics.add.existing(this);
      
   
      this.setCollideWorldBounds(true); 
      this.setBounce(0.2); 
      this.setGravityY(1000); 
    }
}
