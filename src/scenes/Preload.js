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
    this.load.image("fondo3", "assets/sprites/nivel 3/fondo3.png");
    this.load.image("suelo1", "assets/sprites/nivel 1/piso-n1.png");
    this.load.image("suelo2", "assets/sprites/nivel 2/piso-n2.png");
    this.load.image("suelo3", "assets/sprites/nivel 3/piso-n3.png");
    this.load.image("muebles1", "assets/sprites/nivel 1/objetos-quietos-n1.png");
    this.load.image("muebles2", "assets/sprites/nivel 2/objetos-quietos-n2.png");
    this.load.image("muebles3", "assets/sprites/nivel 3/objetos-quietos-n3.png");
    this.load.image("plataformas2", "assets/sprites/nivel 2/cama-repisa-n2.png");
    this.load.image("plataformas3", "assets/sprites/nivel 3/plataformas-n3.png");

    // puertas
    this.load.image("puerta-cerrada", "assets/sprites/nivel 1/puerta-cerrada-n1.png")
    this.load.image("puerta-abierta", "assets/sprites/nivel 1/puerta-abierta-n1.png")

    this.load.image("puerta-cerrada2", "assets/sprites/nivel 2/puerta-derecha-cerrada-n2.png")

    this.load.image("puerta-abierta2", "assets/sprites/nivel 2/puerta-derecha-abierta-n2.png")
    this.load.image("puerta-maderas", "assets/sprites/nivel 2/puerta-maderas-n2.png")
    this.load.image("puerta-izquierda2", "assets/sprites/nivel 2/puerta-izquierda-n2.png")

    this.load.image("puerta-izquierda3", "assets/sprites/nivel 3/puerta-izquierda-n3.png")
    this.load.image("puerta-abierta3", "assets/sprites/nivel 3/puerta-derecha-abierta-n3.png")
    this.load.image("puerta-cerrada3", "assets/sprites/nivel 3/puerta-derecha-cerrada-n3.png")

    // objetos
    this.load.image("llave","assets/sprites/nivel 1/llave-n1.png" )
    this.load.image("llaveSilueta","assets/sprites/nivel 1/llave-silueta-n1.png" )
    this.load.image("jarron","assets/sprites/nivel 2/jarron-n2.png" )
    this.load.image("palanca","assets/sprites/nivel 2/palanca-n2.png" )
    this.load.image("palancaSilueta","assets/sprites/nivel 2/palanca-silueta-n2.png" )
    this.load.image("caja", "assets/sprites/nivel 1/caja-n1.png")
    this.load.image("baldosa", "assets/sprites/nivel 3/baldosa.png")
    this.load.image("cuadro", "assets/sprites/nivel 3/cuadro-derecho-n3.png")
    this.load.image("cuadro-abierto", "assets/sprites/nivel 3/cuadro-movido-n3.png")
    this.load.image("palancaNo", "assets/sprites/nivel 3/interruptor-n3.png")
    this.load.image("olla", "assets/sprites/nivel 3/olla-n3.png")

    // escenas fijas
    this.load.image("fondoMenu", "assets/escenas/menu/menu-principal.png")
    this.load.image("popupPausa", "assets/escenas/menu/pop-up.png")

    this.load.image("creditos", "assets/escenas/creditos.png")
    this.load.image("ajustes", "assets/escenas/ajustes.png")
    this.load.image("animacion1", "assets/sprites/animacion1.jpeg");

    this.load.image("banderaEspañol", "assets/escenas/idiomas/bandera-español.png");
    this.load.image("banderaIngles", "assets/escenas/idiomas/bandera-ingles.png");
    this.load.image("banderaPortugues", "assets/escenas/idiomas/bandera-portugues.png");
    this.load.image("fondoIdiomas", "assets/escenas/idiomas/idioma-fondo.png");

    // mapas
    this.load.tilemapTiledJSON("nivel1", "assets/tilemap/nivel1.json");
    this.load.tilemapTiledJSON("nivel2", "assets/tilemap/nivel2.json");
    this.load.tilemapTiledJSON("nivel3", "assets/tilemap/nivel3.json");

    // personajes
    this.load.spritesheet("alma", "assets/sprites/alma.png", {
      frameWidth: 132,
      frameHeight: 180,
    });

    this.load.spritesheet("manos", "assets/sprites/Manos-321x944.png", {
      frameWidth: 321,
      frameHeight: 944,
    });


    //sonidos
    this.load.audio("pasos", "assets/audio/pasos.mp3");
    this.load.audio("temporizador", "assets/audio/temporizador1.ogg");
    this.load.audio("jarron", "assets/audio/jarron.wav");
    this.load.audio("baldosa", "assets/audio/baldosa.mp3");
    this.load.audio("cuadro-abierto", "assets/audio/cuador-abierto.mp3");
    this.load.audio("puerta-cerrada", "assets/audio/puerta-cerrada.mp3");
    this.load.audio("arrastrar-jarron", "assets/audio/arrastrarJarron.ogg");
    //musica 
    this.load.audio("musicaAmbiente", "assets/audio/musicaAmbiente.mp3"); 


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

    this.anims.create({
      key: "atrapar",
      frames: this.anims.generateFrameNumbers("manos", {
        start: 0,
        end: 5,
      }),
      frameRate: 6,
      repeat: 1,
    });
   

    getTranslations(this.#language, () => {
      this.scene.start("inicio", { language: this.#language });
    });
  
  }
}
