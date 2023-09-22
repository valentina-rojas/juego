import Phaser from "phaser";
// import events from "./EventCenter";

export default class Jugador extends Phaser.Physics.Arcade.Sprite {
  velocidad;

  body;

  cursor;

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setBounce(0.2);
    this.setGravityY(1350);

    this.velocidad = 250;

    this.cursor = scene.input.keyboard.createCursorKeys();
  }

  movimiento() {
    if (this.cursor.left.isDown) {
      this.body.setVelocityX(-this.velocidad);
    } else if (this.cursor.right.isDown) {
      this.body.setVelocityX(this.velocidad);
    } else {
      this.body.setVelocityX(0);
    }

    if (this.cursor.up.isDown && this.body.blocked.down) {
      this.body.setVelocityY(-1050);
    }
  }
}
