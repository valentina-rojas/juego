import Phaser from "phaser";
 import events from "./EventCenter";


export default class Objetos extends Phaser.Physics.Arcade.Sprite {
    jugador;
  
    body;
  
    recolectables;
  
    puerta;
  
    llave;
  
    palanca;

    ojos;
  
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);
  
      scene.add.existing(this);
      scene.physics.add.existing(this);
  
      this.setCollideWorldBounds(true);
      this.body.setImmovable(true);
      this.body.allowGravity = false;
    }

    recolectarLlave() {
        this.llave.disableBody(true, true);
        this.recolectables += 1;
        events.emit("mostrarLlave");
        this.puerta.setTexture("puerta-abierta");
        console.log("llave recolectada");
        setTimeout(() => {
          this.ojos.setTexture("ojos").setVisible(true);
        }, 2000);
       
      }
    
      recolectarPalanca() {
        this.palanca.disableBody(true, true);
        this.recolectables += 1;
        events.emit("mostrarLlave");
        this.puerta.setTexture("puerta-abierta");
        console.log("palanca recolectada");
      }
  }



   