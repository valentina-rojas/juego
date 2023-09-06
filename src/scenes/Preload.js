import Phaser from "phaser";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("alma", "assets/sprites/alma.png");
    this.load.image("fondo1", "assets/skies/space3.png");

    this.load.tilemapTiledJSON("nivel1", "./public/assets/tilemap/nivel1.json");
  }

  create() {
    this.scene.start("menu");
  }
}
