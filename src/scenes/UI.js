import Phaser from "phaser";
import events from "./EventCenter";

export default class UI extends Phaser.Scene {
  constructor() {
    super("ui");
  }

  init(data) {
    this.nivel = data.nivel || 1;
    this.recolectables = data.recolectables || 0;
  }

  create() {
    this.nivelTexto = this.add.text(1600, 50, `Nivel ${  this.nivel}`, {
      fontSize: "50px",
    });

    const botonVolver = this.add
      .text(100, 50, "pausa", { fontSize: "50px" })
      .setOrigin(0.5)
      .setInteractive();

    botonVolver.on("pointerover", () => {
      botonVolver.setStyle({ backgroundColor: "#888888" });
    });

    botonVolver.on("pointerout", () => {
      botonVolver.setStyle({ backgroundColor: "#000000" });
    });

    botonVolver.on("pointerup", () => {
      this.scene.stop("juego");
      this.scene.launch("pausa");
    });

     // escuchar eventos
   events.on("mostrarLlave", this.mostrarLlave, this);
   events.on("actualizarNivel", this.actualizarNivel, this);
  }

  mostrarLlave(){

    console.log ("imagen en ui");

    this.add.image(1800, 80, "llave");

  }

  actualizarNivel(data) {
    this.nivel = data.nivel;

    this.nivelTexto.setText(`Nivel ${  this.nivel}`);
  }
}
