import Phaser from "phaser";
// import events from "./EventCenter";

export default class UI extends Phaser.Scene {
  constructor() {
    super("ui");
  }



  create() {
    this.texto = this.add.text(700, 15, "UI", {
      fontSize: "20px",
    });
}
}