import Phaser from "phaser";
// import events from "./EventCenter";
import { getPhrase } from "../services/traducciones";

export default class Ajustes extends Phaser.Scene {
  constructor() {
    super("ajustes");
  }

  init(language) {
    this.language = language;
  }

  create() {
    this.add.image(960, 540, "fondoIdiomas");
    this.add.image(960, 540, "ajustes");

    this.add
      .text(960, 190, getPhrase("AYUDA"), {
        fontFamily: "Amatic SC, cursive",
        fontSize: "120px",
        color: "#fce5cd",
      })
      .setOrigin(0.5);

    this.add
      .text(960, 930, getPhrase("presiona la letra 'P' para pausar el juego"), {
        fontFamily: "Amatic SC, cursive",
        fontSize: "60px",
        color: "#fce5cd",
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: "#4b443d",
          blur: 5,
          stroke: false,
          fill: true,
        },
      })
      .setOrigin(0.5);

    const botonVolver = this.add
      .image(130, 80, "flechaVolver")
      .setOrigin(0.5)
      .setInteractive();

    botonVolver.on("pointerup", () => {
      this.scene.start("menu");
    });
  }
}
