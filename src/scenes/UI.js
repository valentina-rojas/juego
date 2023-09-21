import Phaser from "phaser";
import events from "./EventCenter";

export default class UI extends Phaser.Scene {
  constructor() {
    super("ui");
  }

  init(data){

    this.llaveRecolectada = data.llaveRecolectada || 0;

  }

  create() {
    this.texto = this.add.text(1800, 50, "UI", {
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
  }

  mostrarLlave(){

    console.log ("imagen en ui");

    this.add.image(1800, 80, "llave");

  }
}
