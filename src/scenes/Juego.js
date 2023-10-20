import Phaser from "phaser";
import Enemigo from "../components/Enemigo";
import events from "./EventCenter";
import Jugador from "../components/Jugador";
import Objetos from "../components/Objetos";
import ObjetosMovibles from "../components/ObjetosMovibles";

export default class Juego extends Phaser.Scene {
  jugador;

  manos;

  jarron;

  nivel;

  luces;

  constructor() {
    super("juego");
  }

  init(data) {
    this.recolectables = 0;
    this.nivel = data.nivel || 1;
    this.timer = 30;
    this.baldosaPresionada = false;
  }

  create() {
    this.scene.launch("ui", {
      nivel: this.nivel,
      recolectables: this.recolectables,
    });

    const mapKey = `nivel${this.nivel}`;
    const map = this.make.tilemap({ key: mapKey });

    const fondoKey = `fondo${this.nivel}`;
    const capaFondo = map.addTilesetImage("fondo", fondoKey);
    map.createLayer("background", capaFondo, 0, 0).setPipeline("Light2D");

    const pisoKey = `suelo${this.nivel}`;
    const capaPiso = map.addTilesetImage("suelo", pisoKey);
    const pisoLayer = map
      .createLayer("floor", capaPiso, 0, 0)
      .setPipeline("Light2D");
    pisoLayer.setCollisionByProperty({ colision: true });

    const mueblesKey = `muebles${this.nivel}`;
    const capaMuebles = map.addTilesetImage("muebles", mueblesKey);
    map.createLayer("furniture", capaMuebles, 0, 0).setPipeline("Light2D");

    const objectsLayer = map.getObjectLayer("objects");

    const plataformasKey = `plataformas${this.nivel}`;
    const capaPlataformas = map.addTilesetImage("plataformas", plataformasKey);
    const plataformasLayer = map.createLayer(
      "platforms",
      capaPlataformas,
      0,
      0
    );
    if (plataformasLayer) {
      plataformasLayer
        .setCollisionByProperty({ colision: true })
        .setPipeline("Light2D");
    }

    this.manos = this.physics.add.group();
    this.jarron = this.physics.add.group();

    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "puerta izquierda": {
          this.puertaIzquierda = new Objetos(
            this,
            x,
            y,
            "puerta-izquierda2"
          ).setPipeline("Light2D");
          break;
        }
        case "puerta": {
          this.puerta = new Objetos(this, x, y, "puerta-cerrada").setPipeline(
            "Light2D"
          );
          break;
        }
        case "jugador": {
          this.jugador = new Jugador(this, x, y, "alma").setPipeline("Light2D");
          break;
        }
        case "llave": {
          this.llave = new Objetos(this, x, y, "llave").setPipeline("Light2D");
          break;
        }
        case "caja": {
          this.caja = new ObjetosMovibles(this, x, y, "caja").setPipeline(
            "Light2D"
          );
          break;
        }
        case "caja3": {
          this.caja3 = new ObjetosMovibles(this, x, y, "caja").setPipeline(
            "Light2D"
          );
          break;
        }
        case "jarron": {
          const jarron = new ObjetosMovibles(this, x, y, "jarron").setPipeline(
            "Light2D"
          );
          this.jarron.add(jarron);
          break;
        }
        case "baldosa": {
          this.baldosa = new Objetos(this, x, y, "baldosa")
            .setScale(0.5)
            .setPipeline("Light2D");
          break;
        }
        case "cuadro": {
          this.cuadro = new Objetos(this, x, y, "cuadro").setPipeline(
            "Light2D"
          );
          break;
        }
        default: {
          break;
        }
      }
    });

    this.luces = this.lights.addLight(1000, 500, 200, 0x555556, 5);
    this.lights.enable().setAmbientColor(0x555556);

    // condicionales para nivel 2
    if (this.nivel === 2) {
      this.puerta.setTexture("puerta-cerrada2");

      this.time.addEvent({
        delay: 2000,
        callback: this.manosRandom,
        callbackScope: this,
        loop: true,
      });

      this.physics.add.overlap(
        this.manos,
        this.jugador,
        this.perderJuego,
        null,
        this
      );

      this.physics.add.collider(
        this.manos,
        pisoLayer,
        this.desaparecerManos,
        null,
        this
      );

      this.physics.add.collider(this.jugador, plataformasLayer);
      this.physics.add.collider(this.jarron, plataformasLayer);
    }

    // condicionales para nivel 3
    if (this.nivel === 3) {
      /* this.enemigoFinal = new Enemigo(this, 400, 500, "manos");

      this.enemigoFinal.movimientoEnemigo();

      this.physics.add.collider(
        this.jugador,
        this.enemigoFinal,
        this.perderJuego,
        null,
        this
      );*/

      this.physics.add.collider(this.jugador, this.caja3);

      this.physics.add.overlap(
        this.caja3,
        this.baldosa,
        this.presionarBaldosa,
        null,
        this
      );
    }

    this.physics.add.overlap(
      this.jugador,
      this.baldosa,
      this.presionarBaldosa,
      null,
      this
    );

    // agregado de fisicas
    this.physics.add.overlap(
      this.jugador,
      this.llave,
      this.recolectarObjeto,
      null,
      this
    );

    this.physics.add.collider(
      this.puerta,
      this.jugador,
      this.abrirPuerta,
      null,
      this
    );

    this.physics.add.collider(
      this.jarron,
      pisoLayer,
      this.romperJarron,
      null,
      this
    );

    this.physics.add.collider(this.jugador, pisoLayer);

    this.physics.add.collider(this.puerta, pisoLayer);
    this.physics.add.collider(this.caja, pisoLayer);
    this.physics.add.collider(this.jugador, this.caja);
    this.physics.add.collider(this.jugador, this.jarron);

    this.cameras.main.startFollow(this.jugador);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update() {
    this.jugador.movimiento();
    this.actualizarLuz();
  }

  actualizarLuz() {
    this.luces.x = this.jugador.x;
    this.luces.y = this.jugador.y;
  }

  romperJarron(jarron) {
    console.log("jarron roto");
    const { x } = jarron;
    const { y } = jarron;
    jarron.destroy();
    this.palanca = new Objetos(this, x, y, "palanca");

    this.physics.add.overlap(
      this.jugador,
      this.palanca,
      this.recolectarObjeto2,
      null,
      this
    );
  }

  recolectarObjeto() {
    this.llave.disableBody(true, true);
    this.recolectables += 1;
    events.emit("mostrarLlave");
    this.puerta.setTexture("puerta-abierta");
    console.log("llave recolectada");
  }

  recolectarObjeto2() {
    this.palanca.disableBody(true, true);
    this.recolectables += 1;
    events.emit("mostrarLlave");
    this.puerta.setTexture("puerta-abierta2");
    console.log("llave recolectada");
  }

  presionarBaldosa() {
    if (!this.baldosaPresionada) {
      this.baldosaPresionada = true;

      console.log("baldosa presionada");
      this.cuadro.disableBody(true, true);
      this.interruptor = new Objetos(
        this,
        this.cuadro.x,
        this.cuadro.y,
        "palancaNo"
      ).setScale(0.2);

      this.physics.add.overlap(
        this.jugador,
        this.interruptor,
        this.puertaTemporizada,
        null,
        this
      );
    }
  }

  liberarBaldosa() {
    this.baldosaPresionada = false;

    if (this.baldosaPresionada = false) {
      console.log("baldosa liberada");
      this.cuadro.enableBody(true);
      this.interruptor.disableBody(true);
    }
  }

  puertaTemporizada() {
    this.interruptor.disableBody(true);
    this.recolectables += 1;
    this.puerta.setTexture("puerta-abierta2");
    this.interruptor.setTexture("palancaSi");
    console.log("puerta abierta");

    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });

    console.log(this.timer);

    this.enemigoFinal = new Enemigo(this, 400, 500, "manos");
    this.enemigoFinal.movimientoEnemigo();

    this.physics.add.collider(
      this.jugador,
      this.enemigoFinal,
      this.perderJuego,
      null,
      this
    );
  }

  updateTimer() {
    this.timer -= 1;
    console.log(this.timer);

    if (this.timer === 0) {
      this.perderJuego();
    }
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

  manosRandom() {
    const manos = new Enemigo(
      this,
      this.jugador.x - 200,
      this.jugador.y - 1000,
      "manos"
    ).setPipeline("Light2D");

    manos.movimientoEnemigo();
    this.manos.add(manos);

    console.log("nueva mano");
  }

  desaparecerManos(manos) {
    this.manos.remove(manos, true, true);
    console.log("mano eliminada");
  }

  perderJuego() {
    console.log(this);
    this.scene.start("juego", { nivel: this.nivel });
  }
}
