import Phaser from "phaser";
// import events from "./EventCenter";

export default class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  create() {
    const button = this.add
      .text(300, 400, "jugar")
      .setOrigin(0.5)
      .setInteractive();

    button.on("pointerover", () => {
      button.setStyle({ backgroundColor: "#888888" });
    });

    button.on("pointerout", () => {
      button.setStyle({ backgroundColor: "#000000" });
    });

    button.on("pointerup", () => {
      this.scene.start("juego");
    });
  }
}
