import Phaser from "phaser";
import events from "./EventCenter";
// import ObjetosRecolectables from "../components/ObjetosRecolectables";

export default class ObjetosMovibles extends Phaser.Physics.Arcade.Sprite {
  body;

  jugador;

  jarron;

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    // this.body.setDamping(true); // Habilitar el amortiguador
    //  this.body.setDrag(0.000001); // Configurar el valor del amortiguador
    this.scene = scene;
  }

  romperJarron() {
    console.log("jarron roto");
    const { x } = this.jarron;
    const { y } = this.jarron;
    this.jarron.destroy();

    events.emit("colisionConPalanca", x, y);
  }
}
