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

  baldosaSonido;

  temporizadorSonido;

  musicaAmbiente;

  puertaCerrada;

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
        this.temporizadorSonido.stop();
        this.musicaAmbiente.stop();
        console.log("animacion2");
        this.scene.stop("ui");
        this.scene.start("animaciones", { nivel: this.nivel });
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
    this.musicaAmbiente.setVolume(0.8);
    this.temporizadorSonido.play();
    this.temporizadorSonido.setVolume(0.3);
    this.interruptor.disableBody(true);
    this.recolectables += 1;
    this.puerta.setTexture("puerta-abierta3");
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
      this.temporizadorSonido.stop();
      this.puertaCerrada.play();
      this.puertaCerrada.setVolume(0.5);
      this.musicaAmbiente.setVolume(1.5);
      this.puerta.setTexture("puerta-cerrada3");
      console.log("puerta cerrada");
    }
  }
}
