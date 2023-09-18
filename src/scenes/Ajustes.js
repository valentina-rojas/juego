import Phaser from "phaser";
// import events from "./EventCenter";

export default class Ajustes extends Phaser.Scene {
  constructor() {
    super("ajustes");
  }


  create() {
    const botonVolver = this.add
      .text(1000, 500, "volver", { fontSize: "50px" })
      .setOrigin(0.5)
      .setInteractive();

    botonVolver.on("pointerover", () => {
      botonVolver.setStyle({ backgroundColor: "#888888" });
    });

    botonVolver.on("pointerout", () => {
      botonVolver.setStyle({ backgroundColor: "#000000" });
    });

    botonVolver.on("pointerup", () => {
      this.scene.start("menu");
    });

}

}
