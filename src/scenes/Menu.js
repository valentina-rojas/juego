import Phaser from "phaser";
import { getPhrase } from "../services/traducciones";

export default class Menu extends Phaser.Scene {
  language;
  musicaAmbiente;

  constructor() {
    super("menu");
  }

  init(language) {
    this.language = language;
  }

  create() {
    this.scene.stop("ui");

    console.log(`idioma:${this.language}`);

    this.add.image(960, 540, "fondoMenu");

    const botones = [
      { texto: getPhrase("JUGAR"), escenaKey: "animaciones" },
      { texto: getPhrase("CRÉDITOS"), escenaKey: "creditos" },
      { texto: getPhrase("AYUDA"), escenaKey: "ajustes" },
      { texto: getPhrase("puntajes"), escenaKey: "puntajes" },
    ];

    const posicionIncialY = 400;
    const espaciado = 100;

    botones.forEach((infoBoton, indice) => {
      const boton = this.agregarBoton(
        1500,
        posicionIncialY + indice * espaciado,
        infoBoton.texto,
        infoBoton.escenaKey
      );

      this.interacciones(boton);
    });
  }

  agregarBoton(x, y, texto, escenaKey) {
    const boton = this.add
      .text(x, y, texto, {
        fontFamily: "Amatic SC, cursive",
        fontSize: "80px",
        color: "#fce5cd",
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: "#4b443d",
          blur: 5,
          stroke: false,
          fill: true,
        },
      })
      .setOrigin(0.5)
      .setInteractive();

    boton.setData("escenaKey", escenaKey);

    return boton;
  }

  interacciones(boton) {
    boton.on("pointerover", () => {
      boton.setStyle({ color: "#b0a08f" });
    });

    boton.on("pointerout", () => {
      boton.setStyle({ color: "#fce5cd" });
    });

    boton.on("pointerup", () => {
      const targetScene = boton.getData("escenaKey");
      this.scene.start(targetScene, { language: this.language });
    });
  }
}
