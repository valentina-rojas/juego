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

  tiempo;

  manos;

  baldosaSonido;

  temporizadorSonido;

  musicaAmbiente;

  puertaCerrada;

  i;

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
        this.scene.start("juego", { nivel: this.nivel, tiempo: this.tiempo });
      } else {
        events.emit("puntajes");
        this.temporizadorSonido.stop();
        this.musicaAmbiente.stop();

        this.scene.start("animaciones", {
          nivel: this.nivel,
          tiempo: this.tiempo,
        });
      }
    }
  }

  presionarBaldosa() {
    if (!this.baldosaPresionada) {
      this.baldosaPresionada = true;

      console.log("baldosa presionada");
      this.interruptor = new Objetos(this, 1130, 500, "palancaNo");
      this.cuadro.setTexture("cuadro-abierto");
      this.baldosaSonido.play();

      events.emit("colisionConInterruptor", this.interruptor);
    }
  }

  puertaTemporizada() {
    events.emit("mostrarLlave");

    this.musicaAmbiente.setVolume(0.8);
    this.temporizadorSonido.play();
    this.temporizadorSonido.setVolume(0.3);
    this.interruptor.disableBody(true);
    this.recolectables += 1;
    this.puerta.setTexture("puerta-abierta3");
    console.log("puerta abierta");

    console.log(this.timer);

    this.enemigoFinal = new Enemigo(this, 400, 500, "manos");
    this.enemigoFinal.movimientoEnemigoFinal();

    /*this.enemigoManos = new Enemigo(this, 2000, 500, "manos")
      .setRotation(360)
      .setPipeline("Light2D");

    this.manos.add(this.enemigoManos);
    console.log("nueva mano");*/

    events.emit("temporizador", this.enemigoFinal);
  }

  updateTimer() {
    this.timer -= 1;
    console.log(this.timer);

    if (this.timer === 0) {
      this.recolectables = 0;
      this.temporizadorSonido.stop();
      this.puertaCerrada.play();
      this.puertaCerrada.setVolume(0.5);
      this.musicaAmbiente.setVolume(0.8);
      this.puerta.setTexture("puerta-cerrada3");
      console.log("puerta cerrada");
    }
  }
}
