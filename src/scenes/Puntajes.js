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

        console.log(`${doc.name} - ${doc.score}`)
      });
    });

    const botonVolver = this.add
      .image(130, 80,"flechaVolver")
      .setOrigin(0.5)
      .setInteractive();

    botonVolver.on("pointerup", () => {
      this.scene.start("menu");
    });
  }
}
