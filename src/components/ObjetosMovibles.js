import Phaser from "phaser";
import events from "./EventCenter";
// import ObjetosRecolectables from "../components/ObjetosRecolectables";

export default class ObjetosMovibles extends Phaser.Physics.Arcade.Sprite {
  body;

  jugador;

  jarron;

  jarronSonido;

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    this.scene = scene;
  }


  romperJarron() {
    this.jarronSonido.play(); 
    this.jarronSonido.setVolume(1);
    console.log("jarron roto");
    const { x } = this.jarron;
    const { y } = this.jarron;
    this.jarron.destroy();

    events.emit("colisionConPalanca", x, y);
  }
}
