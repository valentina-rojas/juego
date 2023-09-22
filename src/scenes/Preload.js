import Phaser from "phaser";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("alma", "assets/sprites/alma.png");
    this.load.image("fondo1", "assets/sprites/nivel 1/pared-n1.png");
    this.load.image("muebles1", "assets/sprites/nivel 1/objetos-quietos-n1.png");
    this.load.image("suelo1", "assets/sprites/nivel 1/piso-n1.png");
    this.load.image("llave","assets/sprites/nivel 1/llave-n1.png" )
    this.load.image("puerta-cerrada", "assets/sprites/nivel 1/puerta-cerrada-n1.png" )
    this.load.image("puerta-abierta", "assets/sprites/nivel 1/puerta-abierta-n1.png" )
    this.load.image("caja", "assets/sprites/nivel 1/caja-n1.png")



    this.load.tilemapTiledJSON("nivel1", "assets/tilemap/nivel1.json");
    this.load.tilemapTiledJSON("nivel2", "assets/tilemap/nivel2.json");
  }

  create() {
    this.scene.start("menu");
  }
}
