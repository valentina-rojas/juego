import Phaser from "phaser";
import { getPhrase } from "../services/traducciones";

export default class Login extends Phaser.Scene {
  firebase;

  constructor() {
    super("login");
  }

  init({ language }) {
    this.language = language;
  }

  create() {
    this.add.image(960, 540, "fondoIdiomas");

    this.add
      .text(960, 200, getPhrase("log in"), {
        fontFamily: "Amatic SC",
        fontSize: "80px",
      })
      .setOrigin(0.5);

    this.add
      .text(960, 600, getPhrase("ingresar de forma anonima"), {
        fontFamily: "Amatic SC",
        fontSize: "80px",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.firebase
          .signInAnonymously()
          .then(() => {
            this.scene.start("menu");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });

    this.add
      .text(960, 700, getPhrase("ingresar con google"), {
        fontFamily: "Amatic SC",
        fontSize: "80px",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.firebase
          .signInWithGoogle()
          .then(() => {
            this.scene.start("menu");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });
  }
}
