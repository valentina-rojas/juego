import Phaser from "phaser";
import { getLanguageConfig, getTranslations } from "../services/traducciones";
// import WebFont from "webfontloader";

export default class Preload extends Phaser.Scene {
  #language;

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
    this.load.image(
      "muebles1",
      "assets/sprites/nivel 1/objetos-quietos-n1.png"
    );
    this.load.image(
      "muebles2",
      "assets/sprites/nivel 2/objetos-quietos-n2.png"
    );
    this.load.image(
      "muebles3",
      "assets/sprites/nivel 3/objetos-quietos-n3.png"
    );
    this.load.image(
      "plataformas2",
      "assets/sprites/nivel 2/cama-repisa-n2.png"
    );
    this.load.image(
      "plataformas3",
      "assets/sprites/nivel 3/plataformas-n3.png"
    );

    // puertas
    this.load.image(
      "puerta-cerrada",
      "assets/sprites/nivel 1/puerta-cerrada-n1.png"
    );
    this.load.image(
      "puerta-abierta",
      "assets/sprites/nivel 1/puerta-abierta-n1.png"
    );
    this.load.image(
      "puerta-cerrada2",
      "assets/sprites/nivel 2/puerta-derecha-cerrada-n2.png"
    );
    this.load.image(
      "puerta-abierta2",
      "assets/sprites/nivel 2/puerta-derecha-abierta-n2.png"
    );
    this.load.image(
      "puerta-maderas",
      "assets/sprites/nivel 2/puerta-maderas-n2.png"
    );
    this.load.image(
      "puerta-izquierda2",
      "assets/sprites/nivel 2/puerta-izquierda-n2.png"
    );
    this.load.image(
      "puerta-izquierda3",
      "assets/sprites/nivel 3/puerta-izquierda-n3.png"
    );
    this.load.image(
      "puerta-abierta3",
      "assets/sprites/nivel 3/puerta-derecha-abierta-n3.png"
    );
    this.load.image(
      "puerta-cerrada3",
      "assets/sprites/nivel 3/puerta-derecha-cerrada-n3.png"
    );

    // objetos
    this.load.image("llave", "assets/sprites/nivel 1/llave-n1.png");
    this.load.image(
      "llaveSilueta",
      "assets/sprites/nivel 1/llave-silueta-n1.png"
    );
    this.load.image("jarron", "assets/sprites/nivel 2/jarron-n2.png");
    this.load.image("palanca", "assets/sprites/nivel 2/palanca-n2.png");
    this.load.image(
      "palancaSilueta",
      "assets/sprites/nivel 2/palanca-silueta-n2.png"
    );
    this.load.image("caja", "assets/sprites/nivel 1/caja-n1.png");
    this.load.image("baldosa", "assets/sprites/nivel 3/baldosa.png");
    this.load.image("cuadro", "assets/sprites/nivel 3/cuadro-derecho-n3.png");
    this.load.image(
      "cuadro-abierto",
      "assets/sprites/nivel 3/cuadro-movido-n3.png"
    );
    this.load.image("palancaNo", "assets/sprites/nivel 3/interruptor-n3.png");
    this.load.image(
      "interruptorSilueta",
      "assets/sprites/nivel 3/interruptor-silueta-n3.png"
    );
    this.load.image("cacerolas", "assets/sprites/nivel 3/cacerolas-n3.png");
    this.load.image("olla", "assets/sprites/nivel 3/olla-n3.png");
    this.load.image(
      "bolsaCemento",
      "assets/sprites/nivel 1/bolsa-cemento-n1.png"
    );

    this.load.image("roturas", "assets/sprites/nivel 2/roturas-techo-n2.png");

    // escenas fijas
    this.load.image("flechaVolver", "assets/escenas/flecha-volver.png");
    this.load.image("fondoMenu", "assets/escenas/menu/menu-principal.png");
    this.load.image("popupPausa", "assets/escenas/menu/pop-up.png");
    this.load.image("cartelUI", "assets/escenas/elemento-ui.png");

    this.load.image("creditos", "assets/escenas/creditos.png");
    this.load.image("ajustes", "assets/escenas/ajustes.png");
    this.load.image("animacion1", "assets/sprites/animacion1.jpeg");
    this.load.image("animacion2", "assets/sprites/animacion2.jpeg");

    this.load.image(
      "banderaEspañol",
      "assets/escenas/idiomas/bandera-español.png"
    );
    this.load.image(
      "banderaIngles",
      "assets/escenas/idiomas/bandera-ingles.png"
    );
    this.load.image(
      "banderaPortugues",
      "assets/escenas/idiomas/bandera-portugues.png"
    );
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
      frameHeight: 1080,
    });

    this.load.spritesheet("ojos", "assets/sprites/OjosSprite-316x184.png", {
      frameWidth: 316,
      frameHeight: 184,
    });

    // Viñetas introduccion
    this.load.image(
      "fondo-viñeta",
      "assets/sprites/Animacion 1/fondo-c-inicio.png"
    );
    this.load.image(
      "viñeta1",
      "assets/sprites/Animacion 1/viñeta1-c-inicio.png"
    );
    this.load.image(
      "viñeta2",
      "assets/sprites/Animacion 1/viñeta2-c-inicio.png"
    );
    this.load.image(
      "viñeta3",
      "assets/sprites/Animacion 1/viñeta3-c-inicio.png"
    );
    this.load.image(
      "viñeta4",
      "assets/sprites/Animacion 1/viñeta4-c-inicio.png"
    );
    this.load.image(
      "viñeta5",
      "assets/sprites/Animacion 1/viñeta5-c-inicio.png"
    );
    this.load.image(
      "viñeta6",
      "assets/sprites/Animacion 1/viñeta6-c-inicio.png"
    );
    this.load.image(
      "viñeta7",
      "assets/sprites/Animacion 1/viñeta7-c-inicio.png"
    );
    this.load.image(
      "viñeta8",
      "assets/sprites/Animacion 1/viñeta8-c-inicio.png"
    );
    this.load.image(
      "viñeta9",
      "assets/sprites/Animacion 1/viñeta9-c-inicio.png"
    );

    // Viñetas conclusion
    this.load.image("viñeta10", "assets/sprites/Animacion 2/viñeta1-c-fin.png");
    this.load.image("viñeta11", "assets/sprites/Animacion 2/viñeta2-c-fin.png");
    this.load.image("viñeta12", "assets/sprites/Animacion 2/viñeta3-c-fin.png");
    this.load.image("viñeta13", "assets/sprites/Animacion 2/viñeta4-c-fin.png");
    this.load.image("viñeta14", "assets/sprites/Animacion 2/viñeta5-c-fin.png");
    this.load.image("viñeta15", "assets/sprites/Animacion 2/viñeta6-c-fin.png");
    this.load.image("viñeta16", "assets/sprites/Animacion 2/viñeta7-c-fin.png");

    this.load.spritesheet("ojos", "assets/sprites/OjosSprite-316x184.png", {
      frameWidth: 316,
      frameHeight: 184,
    });

    this.load.spritesheet("muro", "assets/sprites/SombraSprite-769x1080.png", {
      frameWidth: 769,
      frameHeight: 1080,
    });

    // sonidos
    this.load.audio("pasos", "assets/audio/pasos.mp3");
    this.load.audio("temporizador", "assets/audio/temporizador1.ogg");
    this.load.audio("jarron", "assets/audio/jarron.wav");
    this.load.audio("baldosa", "assets/audio/baldosa.mp3");
    this.load.audio("cuadro-abierto", "assets/audio/cuador-abierto.mp3");
    this.load.audio("puerta-cerrada", "assets/audio/puerta-cerrada.mp3");
    this.load.audio("arrastrar-jarron", "assets/audio/arrastrarJarron.ogg");
    // musica
    this.load.audio("musicaAmbiente", "assets/audio/musicaAmbiente.mp3");
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
      repeat: -1,
    });

    this.anims.create({
      key: "aparecerOjos",
      frames: this.anims.generateFrameNumbers("ojos", {
        start: 0,
        end: 12,
      }),
      frameRate: 6,
      repeat: 0,
    });

    this.anims.create({
      key: "perseguir",
      frames: this.anims.generateFrameNumbers("muro", {
        start: 0,
        end: 10,
      }),
      frameRate: 6,
      repeat: -1,
    });

    getTranslations(this.#language, () => {
      this.scene.start("inicio", { language: this.#language });
    });
  }
}
