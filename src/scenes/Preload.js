import Phaser from "phaser";
import { getLanguageConfig, getTranslations } from "../services/traducciones";
// import WebFont from "webfontloader"; 

export default class Preload extends Phaser.Scene {
  #language

  constructor() {
    super("preload");
  }

  preload() {

    this.#language = getLanguageConfig();


    this.load.image("fondo1", "assets/sprites/nivel 1/pared-n1.png");
    this.load.image("fondo2", "assets/sprites/nivel 2/fondo2.png");
    this.load.image("fondo3", "assets/sprites/nivel 3/fondo3.jpg");
    this.load.image("suelo1", "assets/sprites/nivel 1/piso-n1.png");
    this.load.image("suelo2", "assets/sprites/nivel 2/piso-n2.png");
    this.load.image("suelo3", "assets/sprites/nivel 3/suelo3.jpeg");
    this.load.image("techo2", "assets/sprites/nivel 2/roturas-techo-n2.jpeg");
    this.load.image("muebles1", "assets/sprites/nivel 1/objetos-quietos-n1.png");
    this.load.image("muebles2", "assets/sprites/nivel 2/objetos-quietos-n2.png");
    this.load.image("plataformas2", "assets/sprites/nivel 2/cama-repisa-n2.png");

    // puertas
    this.load.image("puerta-cerrada", "assets/sprites/nivel 1/puerta-cerrada-n1.png")
    this.load.image("puerta-abierta", "assets/sprites/nivel 1/puerta-abierta-n1.png")

    this.load.image("puerta-cerrada2", "assets/sprites/nivel 2/puerta-derecha-cerrada-n2.png")

    this.load.image("puerta-abierta2", "assets/sprites/nivel 2/puerta-derecha-abierta-n2.png")
    this.load.image("puerta-maderas", "assets/sprites/nivel 2/puerta-maderas-n2.png")
    this.load.image("puerta-izquierda2", "assets/sprites/nivel 2/puerta-izquierda-n2.png")

    // objetos
    this.load.image("llave","assets/sprites/nivel 1/llave-n1.png" )
    this.load.image("llaveSilueta","assets/sprites/nivel 1/llave-silueta-n1.png" )
    this.load.image("jarron","assets/sprites/nivel 2/jarron-n2.png" )
    this.load.image("palanca","assets/sprites/nivel 2/palanca-n2.png" )
    this.load.image("palancaSilueta","assets/sprites/nivel 2/palanca-silueta-n2.png" )
    this.load.image("caja", "assets/sprites/nivel 1/caja-n1.png")


    // escenas fijas
    this.load.image("logo", "assets/escenas/Logo.png")
    this.load.image("creditos", "assets/escenas/creditos.png")
    this.load.image("ajustes", "assets/escenas/ajustes.png")
    this.load.image("animacion1", "assets/sprites/animacion1.jpeg");


    // mapas
    this.load.tilemapTiledJSON("nivel1", "assets/tilemap/nivel1.json");
    this.load.tilemapTiledJSON("nivel2", "assets/tilemap/nivel2.json");
    this.load.tilemapTiledJSON("nivel3", "assets/tilemap/nivel3.json");

    // personajes
    this.load.image("manos", "assets/sprites/mano.png");

    this.load.spritesheet("alma", "assets/sprites/alma.png", {
      frameWidth: 132,
      frameHeight: 180,
    });


  /* WebFont.load({
      custom: {
          families: ['Amatic SC'],
          urls: ['assets/fuentes/tipografias.css'],
      },
  }); */

  
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
