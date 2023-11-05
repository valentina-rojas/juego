import Phaser from "phaser";
import events from "../components/EventCenter";

export default class UI extends Phaser.Scene {
  firebase;

  constructor() {
    super("ui");
  }

  init(data) {
    this.nivel = data.nivel || 1;
    this.recolectables = data.recolectables || 0;
  }

  create() {
    this.input.keyboard.on("keydown-P", () => {
      this.pausarJuego();
    });

    // escuchar eventos
    events.on("mostrarLlave", this.mostrarLlave, this);

    if (this.nivel === 1) {
      this.imagenNivel = this.add.image(1800, 80, "llaveSilueta");
    } 
    
    if (this.nivel === 2) {
      this.imagenNivel = this.add
        .image(1800, 80, "palancaSilueta")
        .setScale(0.3);
    }

    if (this.nivel === 3) {
      this.imagenNivel = this.add
        .image(1800, 80, "interruptorSilueta")
       
    }



  }

  mostrarLlave() {
    if (this.nivel === 1) {
      this.imagenNivel.setTexture("llave");
    }
    if (this.nivel === 2) {
      this.imagenNivel.setTexture("palanca").setScale(0.3);
    }

    if (this.nivel === 3) {
      this.imagenNivel.setTexture("palancaNo");
    }

  }

  pausarJuego() {
    this.scene.pause("juego");

    this.scene.launch("pausa");
  }
}
