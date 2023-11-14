import Phaser from "phaser";
import events from "../components/EventCenter";
import { getPhrase } from "../services/traducciones";

export default class Pausa extends Phaser.Scene {

  musicaAmbiente;

  constructor() {
    super("pausa");

  }

  init(data) {
    this.language = data.language;
  }

  create() {

    this.add.image(960, 540, "popupPausa").setScale(0.8);

    this.add
      .text(960, 250, getPhrase("pausa"), {
        fontFamily: "Amatic SC, cursive",
        fontSize: "120px",
        color: "#fce5cd",
      })
      .setOrigin(0.5);

    const botonVolver = this.add
      .text(960, 450, getPhrase("volver"), {
        fontFamily: "Amatic SC",
        fontSize: "90px",
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

    botonVolver.on("pointerover", () => {
      botonVolver.setStyle({ color: "#b0a08f" });
    });

    botonVolver.on("pointerout", () => {
      botonVolver.setStyle({ color: "#fce5cd" });
    });

    botonVolver.on("pointerup", () => {
      this.scene.stop("juego");
      this.scene.stop("ui");
      this.scene.start("menu");
    });

    const botonReiniciar = this.add
      .text(960, 600, getPhrase("reiniciar"), {
        fontFamily: "Amatic SC",
        fontSize: "90px",
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

    botonReiniciar.on("pointerover", () => {
      botonReiniciar.setStyle({ color: "#b0a08f" });
    });

    botonReiniciar.on("pointerout", () => {
      botonReiniciar.setStyle({ color: "#fce5cd" });
    });

    botonReiniciar.on("pointerup", () => {
      this.scene.pause("pause");
      events.off("colisionConInterruptor");
      events.off("temporizador");
      events.off("colisionConPalanca");
      this.sound.stopAll();
      this.scene.start("juego");
    });

    const botonReanudar = this.add
      .text(960, 750, getPhrase("reanudar"), {
        fontFamily: "Amatic SC",
        fontSize: "90px",
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

    botonReanudar.on("pointerover", () => {
      botonReanudar.setStyle({ color: "#b0a08f" });
    });

    botonReanudar.on("pointerout", () => {
      botonReanudar.setStyle({ color: "#fce5cd" });
    });

    botonReanudar.on ("pointerup", () => {
      this.scene.stop("pausa");
      this.scene.resume("juego");
      this.scene.resume("ui");
    });

    this.input.keyboard.on("keydown-P", () => {
      this.scene.stop("pausa");
      this.scene.resume("juego");
      this.scene.resume("ui");
    });

  }
}
