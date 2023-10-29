import Phaser from "phaser";
import { getPhrase } from "../services/traducciones";


export default class Menu extends Phaser.Scene {
  language;

  constructor() {
    super("menu");
  }

  init(language) {
    this.language = language;
  }

  create() {
    this.scene.stop("ui"); 
    
    console.log(`idioma:${  this.language}`);

    this.add.image(960,540,"fondoMenu")

    const botones = [
      { texto: getPhrase("JUGAR"), escenaKey: "animaciones" },
      { texto: getPhrase("CRÉDITOS"), escenaKey: "creditos" },
      { texto: getPhrase("AYUDA"), escenaKey: "ajustes" },
    ];

    const posicionIncialY = 400;
    const espaciado = 100;

    botones.forEach((infoBoton, indice) => {
      const boton = this.agregarBoton(
        1400,
        posicionIncialY + indice * espaciado,
        infoBoton.texto,
        infoBoton.escenaKey
      );

      this.interacciones(boton);
    });
  }

  agregarBoton(x, y, texto, escenaKey) {
    const boton = this.add
      .text(x, y, texto, { fontFamily: 'Amatic SC, cursive', fontSize: "80px" })
      .setOrigin(0.5)
      .setInteractive();

    boton.setData("escenaKey", escenaKey);

    return boton;
  }

  interacciones(boton) {
    boton.on("pointerover", () => {
      boton.setStyle({ backgroundColor: "#888888" });
    });

    boton.on("pointerout", () => {
      boton.setStyle({ backgroundColor: "#000000" });
    });

    boton.on("pointerup", () => {
      const targetScene = boton.getData("escenaKey");
      this.scene.start(targetScene, { language: this.language });
    });
  }
}
