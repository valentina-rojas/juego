import Phaser from "phaser";
// import events from "./EventCenter";

export default class UI extends Phaser.Scene {
  constructor() {
    super("ui");
  }



  create() {
    this.texto = this.add.text(1800, 50, "UI", {
      fontSize: "50px",
    });

}
}