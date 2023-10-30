import Phaser from "phaser";
import { getPhrase } from "../services/traducciones";

export default class Puntajes extends Phaser.Scene {
  firebase;

  constructor() {
    super("puntajes");
  }

  create() {
    this.add.image(960, 540, "fondoIdiomas");

    this.add
      .text(960, 100, getPhrase("top 10 puntajes"), {
        fontFamily: "Amatic SC",
        fontSize: "80px",
      })
      .setOrigin(0.5);

    this.firebase.getHighScores().then((scores) => {
      let scrollY = 200;
      scores.forEach((doc) => {
        this.add
          .text(960, scrollY, `${doc.name} - ${doc.score}`, {
            fontFamily: "Amatic SC",
            fontSize: "60px",
          })
          .setOrigin(0.5);
        scrollY += 60;
      });
    });

    this.add
      .text(960, 850, getPhrase("volver"), {
        fontSize: "60px",
        fontFamily: "Amatic SC, cursive",
      })
      .setInteractive()
      .setOrigin(0.5)
      .on("pointerdown", () => {
        this.scene.start("menu");
      });
  }
}
