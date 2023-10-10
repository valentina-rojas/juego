import Phaser from "phaser";
import { getLanguageConfig, getTranslations } from "../services/traducciones";

export default class Preload extends Phaser.Scene {
  #language
  constructor() {
    super("preload");
  }

  preload() {

    this.#language = getLanguageConfig();
    alert(this.#language)

    this.load.image("fondo1", "assets/sprites/nivel 1/pared-n1.png");
    this.load.image("muebles1", "assets/sprites/nivel 1/objetos-quietos-n1.png");
    this.load.image("suelo1", "assets/sprites/nivel 1/piso-n1.png");
    this.load.image("llave","assets/sprites/nivel 1/llave-n1.png" )
    this.load.image("puerta-cerrada", "assets/sprites/nivel 1/puerta-cerrada-n1.png" )
    this.load.image("puerta-abierta", "assets/sprites/nivel 1/puerta-abierta-n1.png" )
    this.load.image("caja", "assets/sprites/nivel 1/caja-n1.png")

    this.load.image("logo", "assets/escenas/Logo.png")
    this.load.image("creditos", "assets/escenas/creditos.png")
    this.load.image("ajustes", "assets/escenas/ajustes.png")

    this.load.tilemapTiledJSON("nivel1", "assets/tilemap/nivel1.json");
    this.load.tilemapTiledJSON("nivel2", "assets/tilemap/nivel2.json");

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

    getTranslations(this.#language, () => {
      this.scene.start("inicio", { language: this.#language });
    });


  }
}
