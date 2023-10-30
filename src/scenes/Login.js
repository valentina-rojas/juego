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
      .text(1000, 200, "Ingresar con Email y contraseña", {
        fontSize: 24,
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        const email = prompt("Email");
        const password = prompt("Password");
        this.firebase
          .signInWithEmail(email, password)
          .then(() => {
            this.scene.start("menu");
          })
          .catch(() => {
            const crearUsuario = window.confirm(
              "Email no encontrado. \n ¿Desea crear un usuario?"
            );
            if (crearUsuario) {
              this.firebase
                .createUserWithEmail(email, password)
                .then(() => {
                  this.scene.start("menu");
                })
                .catch((createUserError) => {
                  console.log(
                    "🚀 ~ file: Login.js:51 ~ .catch ~ error",
                    createUserError
                  );
                });
            }
          });
      });

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

    // agregar un texto centrado "Ingresar con Google" que al hacer clic me levante un popup js para ingresar los datos
    this.add
      .text(1000, 400, "Ingresar con Google", {
        fontSize: 24,
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
