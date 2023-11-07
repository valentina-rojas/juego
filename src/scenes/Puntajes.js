import Phaser from "phaser";
import { getPhrase } from "../services/traducciones";

export default class Puntajes extends Phaser.Scene {
  firebase;

  constructor() {
    super("puntajes");
  }

  create() {
    this.add.image(960, 540, "fondoIdiomas");

    this.add.image(960, 540, "popupPausa");

    this.add
      .text(960, 190, getPhrase("top 10 puntajes"), {
        fontFamily: "Amatic SC, cursive",
        fontSize: "80px",
        color: "#fce5cd",
      })
      .setOrigin(0.5);

    this.firebase.getHighScores().then((scores) => {
      let scrollY = 350;
      scores.forEach((doc) => {
        this.add
          .text(960, scrollY, `${doc.name} - ${doc.score}`, {
            fontFamily: "Amatic SC",
            fontSize: "60px",
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
          .setOrigin(0.5);
        scrollY += 60;

        console.log(`${doc.name} - ${doc.score}`);
      });
    });

    const botonVolver = this.add
      .image(130, 80, "flechaVolver")
      .setOrigin(0.5)
      .setInteractive();

    botonVolver.on("pointerup", () => {
      this.scene.start("menu");
    });
  }
}
