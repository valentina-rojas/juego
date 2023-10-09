import Phaser from "phaser";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("fondo1", "assets/sprites/nivel 1/pared-n1.png");
    this.load.image("fondo2", "assets/sprites/nivel 2/fondo2.png");
    this.load.image("fondo3", "assets/sprites/nivel 3/fondo3.jpg");
    this.load.image("muebles1", "assets/sprites/nivel 1/objetos-quietos-n1.png");
    this.load.image("suelo1", "assets/sprites/nivel 1/piso-n1.png");
    this.load.image("suelo2", "assets/sprites/nivel 2/suelo2.jpg");
    this.load.image("suelo3", "assets/sprites/nivel 3/suelo3.jpeg");
    this.load.image("llave","assets/sprites/nivel 1/llave-n1.png" )
    this.load.image("puerta-cerrada", "assets/sprites/nivel 1/puerta-cerrada-n1.png" )
    this.load.image("puerta-abierta", "assets/sprites/nivel 1/puerta-abierta-n1.png" )
    this.load.image("caja", "assets/sprites/nivel 1/caja-n1.png")

    this.load.image("manos", "assets/sprites/mano.png");

    this.load.image("logo", "assets/escenas/Logo.png")
    this.load.image("creditos", "assets/escenas/creditos.png")
    this.load.image("ajustes", "assets/escenas/ajustes.png")

    this.load.tilemapTiledJSON("nivel1", "assets/tilemap/nivel1.json");
    this.load.tilemapTiledJSON("nivel2", "assets/tilemap/nivel2.json");
    this.load.tilemapTiledJSON("nivel3", "assets/tilemap/nivel3.json");

    this.load.spritesheet("alma", "assets/sprites/alma.png", {
      frameWidth: 132,
      frameHeight: 180,
    });
  }

  create() {

    this.anims.create({
      key: "caminarIzquierda",
      frames: this.anims.generateFrameNumbers("alma", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "quieto",
      frames: [{ key: "alma", frame: 6 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "caminarDerecha",
      frames: this.anims.generateFrameNumbers("alma", {
        start: 7,
        end: 12,
      }),
      frameRate: 10,
      repeat: -1,
    });


    this.scene.start("menu");
  }
}
