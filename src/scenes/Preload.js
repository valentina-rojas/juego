import Phaser from "phaser";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("alma", "assets/sprites/alma.png");
    this.load.image("fondo1", "assets/sprites/nivel 1/pared-n1.png");
    this.load.image("suelo1", "assets/sprites/nivel 1/piso-n1.png");



    this.load.tilemapTiledJSON("nivel1", "assets/tilemap/nivel1.json");
  }

  create() {
    this.scene.start("menu");
  }
}
