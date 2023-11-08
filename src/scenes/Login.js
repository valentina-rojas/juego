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
        fontSize: "100px",
        color: "#fce5cd",
      })
      .setOrigin(0.5);

    const botonAnonimo = this.add
      .text(960, 500, getPhrase("ingresar de forma anonima"), {
        fontFamily: "Amatic SC",
        fontSize: "100px",
        color: "#fce5cd",
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

    botonAnonimo.on("pointerover", () => {
      botonAnonimo.setStyle({ color: "#b0a08f" });
    });

    botonAnonimo.on("pointerout", () => {
      botonAnonimo.setStyle({ color: "#fce5cd" });
    });

    const botonGoogle = this.add
      .text(960, 650, getPhrase("ingresar con google"), {
        fontFamily: "Amatic SC",
        fontSize: "100px",
        color: "#fce5cd",
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

    botonGoogle.on("pointerover", () => {
      botonGoogle.setStyle({ color: "#b0a08f" });
    });

    botonGoogle.on("pointerout", () => {
      botonGoogle.setStyle({ color: "#fce5cd" });
    });
  }
}
