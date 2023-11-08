import Phaser from "phaser";
// import events from "./EventCenter";

export default class Enemigo extends Phaser.Physics.Arcade.Sprite {
  velocidad;

  body;

  manos;

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setBounce(0.2);
    this.setGravityY(1350);

    this.velocidad = 241;

    this.manosVolver = 1000;
  }

  aparicionOjos() {
    this.anims.play("aparecerOjos", true);
  }

  desactivarGravedad() {
    if (this.texture.key === "ojos") {
      this.body.allowGravity = false;
    }
  }

  movimientoEnemigo() {
    this.body.setVelocityX(this.velocidad);
    this.anims.play("atrapar", true);
  }

  movimientoEnemigoFinal() {
    this.body.setVelocityX(this.velocidad);
    this.anims.play("perseguir", true);
  }

  movimientoEnemigoManos() {
    this.body.setVelocityX(this.velocidad);
    this.anims.play("atrapar", true);
  }
}
