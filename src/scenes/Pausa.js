import Phaser from "phaser";
// import events from "./EventCenter";
import { getPhrase } from "../services/traducciones";

export default class Pausa extends Phaser.Scene {
  constructor() {
    super("pausa");
  }

  init(language) {
    this.language = language;
  }

  create() {
    const botonVolver = this.add
      .text(1000, 500, getPhrase("volver"), {fontFamily: 'Amatic SC', fontSize: "70px" })
      .setOrigin(0.5)
      .setInteractive();

    botonVolver.on("pointerover", () => {
      botonVolver.setStyle({ backgroundColor: "#888888" });
    });

    botonVolver.on("pointerout", () => {
      botonVolver.setStyle({ backgroundColor: "#000000" });
    });

    botonVolver.on("pointerup", () => {
      this.scene.stop("ui");
      this.scene.start("menu");
    });

    const botonReiniciar = this.add
      .text(1000, 600, getPhrase("reiniciar"), { fontFamily: 'Amatic SC', fontSize: "70px" })
      .setOrigin(0.5)
      .setInteractive();

    botonReiniciar.on("pointerover", () => {
      botonReiniciar.setStyle({ backgroundColor: "#888888" });
    });

    botonReiniciar.on("pointerout", () => {
      botonReiniciar.setStyle({ backgroundColor: "#000000" });
    });

    botonReiniciar.on("pointerup", () => {
      this.scene.pause("pause");
      this.scene.start("juego");
    });
  }
}
