import Phaser from "phaser";
// import events from "./EventCenter";
import { getPhrase } from "../services/traducciones";

export default class Creditos extends Phaser.Scene {
  constructor() {
    super("creditos");
  }

  init(language) {
    this.language = language;
  }

  create() {
    this.add.image(960, 542, "creditos");

    this.add
      .text(960, 100, getPhrase("equipo sombras"), {
        fontFamily: "Amatic SC",
        fontSize: "120px",
        color: "#fce5cd",
      })
      .setOrigin(0.5);

    this.add.text(200, 300, getPhrase("programación y diseño"), {
      fontFamily: "Amatic SC",
      fontSize: "60px",
      color: "#fce5cd",
    });

    this.add.text(750, 300, getPhrase("programación y diseño"), {
      fontFamily: "Amatic SC",
      fontSize: "60px",
      color: "#fce5cd",
    });

    this.add.text(1400, 300, getPhrase("arte y diseño"), {
      fontFamily: "Amatic SC",
      fontSize: "60px",
      color: "#fce5cd",
    });

    const botonVolver = this.add
      .image(130, 80, "flechaVolver")
      .setOrigin(0.5)
      .setInteractive();

    botonVolver.on("pointerup", () => {
      this.scene.start("menu");
    });
  }
}
