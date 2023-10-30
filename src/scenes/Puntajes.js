import Phaser from "phaser";

export default class Puntajes extends Phaser.Scene {

    firebase;

  constructor() {
    super("puntajes");
  }

  create() {
    this.add
      .text(1000, 100, "Top 10 Scores", {
        fontSize: 48,
      })
      .setOrigin(0.5);

    // agregar los 10 mejores highscore
    this.firebase.getHighScores().then((scores) => {
      let scrollY = 200;
      scores.forEach((doc) => {
        this.add
          .text(1000, scrollY, `${doc.name} - ${doc.score}`, {
            fontSize: 34,
          })
          .setOrigin(0.5);
        scrollY += 30;
      });
    });

    this.add
      .text(1000, 700, "Volver", {
        fontSize: 35,
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("menu");
      });
  }
}