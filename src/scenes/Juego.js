import Phaser from "phaser";
import Enemigo from "../components/Enemigo";
import events from "../components/EventCenter";
import Jugador from "../components/Jugador";
import Objetos from "../components/Objetos";
import ObjetosMovibles from "../components/ObjetosMovibles";
import ObjetosRecolectables from "../components/ObjetosRecolectables";

export default class Juego extends Phaser.Scene {
  manos;

  nivel;

  luces;

  constructor() {
    super("juego");
  }

  init(data) {
    this.recolectables =  0;
    this.nivel = data.nivel || 1;
    this.timer = 15;
    this.baldosaPresionada = false;
    this.interruptor = null;
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
          this.llave = new ObjetosRecolectables(
            this,
            x,
            y,
            "llave"
          ).setPipeline("Light2D");
          break;
        }
        case "caja": {
          this.caja = new ObjetosMovibles(this, x, y, "caja")
            .setDamping(true)
            .setDrag(0.000001)
            .setPipeline("Light2D");
          break;
        }
        case "caja3": {
          this.caja3 = new ObjetosMovibles(this, x, y, "caja")
            .setDamping(true)
            .setDrag(0.000001)
            .setPipeline("Light2D");
          break;
        }
        case "jarron": {
          this.jarron = new ObjetosMovibles(this, x, y, "jarron").setPipeline(
            "Light2D"
          );
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
        case "madera": {
          this.madera = new Objetos(this, x, y, "#")
            .setScale(0.3)
            .setVisible(false)
            .setPipeline("Light2D");
          break;
        }
        case "ojos": {
          this.ojos = new Objetos(this, x, y, "ojos")
          .setVisible(false)
          .setPipeline("Light2D")
          .setScale(0.3);
          break;
        }
        default: {
          break;
        }
      }
    });

    this.manos = this.physics.add.group();

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
        this.jugador.morir,
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

      this.physics.add.collider(
        pisoLayer,
        this.jarron,
        this.jarron.romperJarron,
        null,
        this
      );

      this.physics.add.collider(this.jugador, plataformasLayer);
      this.physics.add.collider(this.jarron, plataformasLayer);

      events.on("colisionConPalanca", (x, y) => {
        this.palanca = new ObjetosRecolectables(this, x, y, "palanca").setScale(
          0.7
        );
        this.physics.add.overlap(
          this.jugador,
          this.palanca,
          this.palanca.recolectarPalanca,
          null,
          this
        );
      });
    }

    // condicionales para nivel 3
    if (this.nivel === 3) {
      this.physics.add.collider(this.jugador, this.caja3);

      this.physics.add.overlap(
        this.caja3,
        this.baldosa,
        this.baldosa.presionarBaldosa,
        null,
        this
      );

      this.physics.add.overlap(
        this.jugador,
        this.baldosa,
        this.baldosa.presionarBaldosa,
        null,
        this
      );

      events.on("colisionConInterruptor", (interruptor) => {
        this.physics.add.overlap(
          this.jugador,
          interruptor,
          this.baldosa.puertaTemporizada,
          null,
          this
        );
      });

      events.on("temporizador", (enemigoFinal) => {
        this.time.addEvent({
          delay: 1000,
          callback: this.baldosa.updateTimer,
          callbackScope: this,
          loop: true,
        });

        this.tweens.add({
          targets: [this.cameras.main.startFollow(this.jugador)],
          x: -10,
          y: 10,
          duration: 150,
          ease: "Bounce.easeIn",
          repeat: -1,
          yoyo: true,
        });
        console.log("temblor");

        this.physics.add.collider(
          this.jugador,
          enemigoFinal,
          this.jugador.morir,
          null,
          this
        );

        this.physics.add.overlap(
          this.manos,
          this.jugador,
          this.jugador.morir,
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
      });
    }

    // agregado de fisicas
    this.physics.add.overlap(
      this.jugador,
      this.llave,
      this.llave.recolectarLlave,
      null,
      this
    );

    this.physics.add.collider(
      this.puerta,
      this.jugador,
      this.puerta.abrirPuerta,
      null,
      this
    );

    this.physics.add.collider(this.jugador, pisoLayer);
    this.physics.add.collider(this.puerta, pisoLayer);
    this.physics.add.collider(this.caja, pisoLayer);
    this.physics.add.collider(this.madera, pisoLayer);
    this.physics.add.collider(this.caja, this.madera);
    this.physics.add.collider(this.jugador, this.caja);
    this.physics.add.collider(this.jugador, this.jarron);

    this.cameras.main.startFollow(this.jugador);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.map = (map.widthInPixels, map.heightInPixels);
  }

  update() {
    this.jugador.movimiento();
    this.actualizarLuz();
    this.estadoBaldosa();
  }

  estadoBaldosa() {
    if (
      this.baldosaPresionada &&
      !this.physics.overlap(this.jugador, this.baldosa) &&
      !this.physics.overlap(this.caja3, this.baldosa)
    ) {
      console.log("baldosa liberada");
      this.liberarBaldosa();
    }
  }

  liberarBaldosa() {
    if (this.baldosaPresionada === true) {
      this.baldosaPresionada = false;

      console.log("baldosa liberada");
      this.cuadro.setVisible(true);
      this.interruptor.disableBody(true);
      this.interruptor.setVisible(false);
    }
  }

  actualizarLuz() {
    this.luces.x = this.jugador.x;
    this.luces.y = this.jugador.y;
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
}
