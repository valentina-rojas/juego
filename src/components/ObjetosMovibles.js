import Phaser from "phaser";
// import events from "./EventCenter";

export default class ObjetosMovibles extends Phaser.Physics.Arcade.Sprite {
  
body

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    
    
    this.body.setDamping(true); // Habilitar el amortiguador
    this.body.setDrag(0.001); // Configurar el valor del amortiguador
   
  }

  
}