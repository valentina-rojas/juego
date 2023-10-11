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
    this.nivelTexto = this.add.text(1600, 40, `Nivel ${  this.nivel}`, {
      fontFamily: 'Amatic SC',
      fontSize: "60px",
    });

    const botonPausa = this.add
      .text(100, 50, "pausa", { fontFamily: 'Amatic SC', fontSize: "60px" })
      .setOrigin(0.5)
      .setInteractive();

    botonPausa.on("pointerover", () => {
      botonPausa.setStyle({ backgroundColor: "#888888" });
    });

    botonPausa.on("pointerout", () => {
      botonPausa.setStyle({ backgroundColor: "#000000" });
    });

    botonPausa.on("pointerup", () => {
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
