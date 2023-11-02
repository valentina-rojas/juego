import Phaser from "phaser";
// import events from "./EventCenter";
//import { getPhrase } from "../services/traducciones";

export default class Creditos extends Phaser.Scene {
  constructor() {
    super("creditos");
  }

  init(language) {
    this.language = language;
  }

  create() {
    this.add.image(960, 542, "creditos");

    const botonVolver = this.add
      .image(130, 80,"flechaVolver")
      .setOrigin(0.5)
      .setInteractive();

    botonVolver.on("pointerup", () => {
      this.scene.start("menu");
    });
  }
}
