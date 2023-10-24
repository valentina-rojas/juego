import Phaser from "phaser";
import Enemigo from "./Enemigo";
import events from "./EventCenter";

export default class Objetos extends Phaser.Physics.Arcade.Sprite {
  jugador;

  body;

  timer;

  cuadro;

  baldosa;

  puerta;

  caja3;

  nivel;

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.body.setImmovable(true);
    this.body.allowGravity = false;

    this.scene = scene; //
    this.interruptor = null;
    this.cuadro = null;
  }

  abrirPuerta() {
    console.log("colision puerta");

    if (this.recolectables >= 1) {
      console.log("puerta abierta");
      this.nivel += 1;

      if (this.nivel < 4) {
        this.scene.start("juego", { nivel: this.nivel });
      } else {
        console.log("animacion2");
        this.scene.start("animaciones", { nivel: this.nivel });
      }
    }
  }

  presionarBaldosa() {
    if (!this.baldosaPresionada) {
      this.baldosaPresionada = true;

      console.log("baldosa presionada");
      this.cuadro.disableBody(true, true);

      this.interruptor = new Objetos(this, 1400, 600, "palancaNo").setScale(
        0.2
      );
      events.emit("colisionConInterruptor", this.interruptor);
    }
  }

  puertaTemporizada() {
    this.interruptor.disableBody(true);
    this.recolectables += 1;
    this.puerta.setTexture("puerta-abierta2");
    this.interruptor.setTexture("palancaSi");
    console.log("puerta abierta");

    console.log(this.timer);

    this.enemigoFinal = new Enemigo(this, 400, 500, "manos");
    this.enemigoFinal.movimientoEnemigo();

    events.emit("temporizador", this.enemigoFinal);
  }

  updateTimer() {
    this.timer -= 1;
    console.log(this.timer);

    if (this.timer === 0) {
      this.recolectables = 0;
      this.puerta.setTexture("puerta-cerrada");
      console.log("puerta cerrada");
    }
  }
}
