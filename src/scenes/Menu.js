import Phaser from "phaser";
// import events from "./EventCenter";

export default class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  create() {
    this.add.image(600, 500, "logo");

    const botones = [
      { texto: "JUGAR", escenaKey: "juego" },
      { texto: "CRÉDITOS", escenaKey: "creditos" },
      { texto: "AJUSTES", escenaKey: "ajustes" },
    ];

    const posicionIncialY = 400;
    const espaciado = 100;

    botones.forEach((infoBoton, indice) => {
      const boton = this.agregarBoton(
        1200,
        posicionIncialY + indice * espaciado,
        infoBoton.texto,
        infoBoton.escenaKey
      );

      this.interacciones(boton);
    });
  }

  agregarBoton(x, y, texto, escenaKey) {
    const boton = this.add
      .text(x, y, texto, { fontSize: "100px", fontFamily: "AmaticSC-Bold", })
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
      this.scene.start(targetScene);
    });
  }
}
