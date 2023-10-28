import Phaser from "phaser";

export default class Login extends Phaser.Scene {
  firebase;

  constructor() {
    super("login");
  }

  create() {
    this.add
      .text(1000, 100, "Login", {
        fontSize: 48,
      })
      .setOrigin(0.5);

    this.add
      .text(1000, 300, "Ingresar de forma Anonima", {
        fontSize: 24,
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
  }
}
