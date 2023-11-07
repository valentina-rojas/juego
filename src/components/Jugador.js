import Phaser from "phaser";
import events from "./EventCenter";

export default class Jugador extends Phaser.Physics.Arcade.Sprite {
  velocidad;

  body;

  cursor;

  nivel;

  jugador;

  pasos;

  musicaAmbiente;

  cameras;

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setBounce(0.2);
    this.setGravityY(1350);

    this.velocidad = 250;

    this.cursor = scene.input.keyboard.createCursorKeys();

    this.scene = scene;
  }

  movimiento() {
    if (this.cursor.left.isDown) {
      this.body.setVelocityX(-this.velocidad);
      // this.pasos.play();
      this.anims.play("caminarIzquierda", true);
    } else if (this.cursor.right.isDown) {
      this.body.setVelocityX(this.velocidad);
      this.anims.play("caminarDerecha", true);
    } else {
      this.body.setVelocityX(0);
      this.anims.play("quieto", true);
    }

    if (this.cursor.up.isDown && this.body.blocked.down) {
      this.body.setVelocityY(-1050);
    }
  }

  morir() {
    this.scene.stop("ui");
    this.scene.pause("juego");
    this.musicaAmbiente.setVolume(0.1);

    this.cameras.main.fadeIn(6);

    setTimeout(() => {
      this.scene.start("juego", { nivel: this.nivel });
      events.off("colisionConInterruptor");
      events.off("temporizador");
      events.off("colisionConPalanca");
      console.log("muerte");
    }, 1500);
  }
}
