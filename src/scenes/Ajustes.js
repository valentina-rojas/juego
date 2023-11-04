import Phaser from "phaser";
// import events from "./EventCenter";
//import { getPhrase } from "../services/traducciones";

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

    const botonVolver = this.add
    .image(130, 80,"flechaVolver")
    .setOrigin(0.5)
    .setInteractive();

  botonVolver.on("pointerup", () => {
    this.scene.start("menu");
  });
  }
}
