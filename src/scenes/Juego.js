import Phaser from "phaser";
// import events from "./EventCenter";
import Jugador from "../components/Jugador";
import Objetos from "../components/Objetos";
import ObjetosMovibles from "../components/ObjetosMovibles";

export default class Juego extends Phaser.Scene {
  jugador;

  nivel;

  constructor() {
    super("juego");
  }

  init(data) {
    this.recolectables = 0;
    this.nivel = data.nivel || 1;
  }

  create() {
    this.scene.launch("ui",  {
      nivel: this.nivel,
    recolectables: this.recolectables});

    const mapKey = `nivel${this.nivel}`;
    const map = this.make.tilemap({ key: mapKey });


    const capaFondo = map.addTilesetImage("fondo", "fondo1");
    map.createLayer("background", capaFondo, 0, 0);

    const capaMuebles = map.addTilesetImage("muebles", "muebles1");
    map.createLayer("furniture", capaMuebles, 0, 0);

    const capaPiso = map.addTilesetImage("suelo", "suelo1");
    const pisoLayer = map.createLayer("floor", capaPiso, 0, 0);
    pisoLayer.setCollisionByProperty({ colision: true });

    map.getObjectLayer("objects");

    const jugadorSpawn = map.findObject(
      "objects",
      (obj) => obj.name === "jugador"
    );

    const llaveSpawn = map.findObject("objects", (obj) => obj.name === "llave");
    const puertaSpawn = map.findObject(
      "objects",
      (obj) => obj.name === "puerta"
    );
    const cajaSpawn = map.findObject("objects", (obj) => obj.name === "caja");

    // agregar la puerta al escenario
    this.puerta = new Objetos(
      this,
      puertaSpawn.x,
      puertaSpawn.y,
      "puerta-cerrada"
    );

    // agrega el personaje al escenario
    this.jugador = new Jugador(
      this,
      jugadorSpawn.x,
      jugadorSpawn.y,
      "alma"
    ).setScale(0.5);

    // agrega la llave al escenario
    this.llave = new Objetos(
      this,
      llaveSpawn.x,
      llaveSpawn.y,
      "llave"
    );

    // agregar caja al escenario
    this.caja = new ObjetosMovibles(this, cajaSpawn.x, cajaSpawn.y, "caja")
    ;


    this.physics.add.overlap(
      this.jugador,
      this.llave,
      this.recolectarObjeto,
      null,
      this
    );

    this.physics.add.overlap(
      this.puerta,
      this.jugador,
      this.abrirPuerta,
      null,
      this
    );

    this.physics.add.collider(this.jugador, pisoLayer);
    this.physics.add.collider(this.llave, pisoLayer);
    this.physics.add.collider(this.puerta, pisoLayer);
    this.physics.add.collider(this.caja, pisoLayer);
    this.physics.add.collider(this.jugador, this.caja);

    // cámara sigue al jugador
    this.cameras.main.startFollow(this.jugador);
    // world bounds
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // camera dont go out of the map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update() {
    // movimiento del jugador
    this.jugador.movimiento();
  }

  recolectarObjeto() {
    this.llave.disableBody(true, true);
    this.recolectables += 1;
    // events.emit("mostrarLlave");
    this.puerta.setTexture("puerta-abierta");
    console.log("llave recolectada");
  }

  abrirPuerta() {
    console.log("colision puerta");
    
    if (this.recolectables >= 1) {
      
      console.log("puerta abierta");
      this.nivel += 1;
      this.scene.start(("juego"),{ nivel: this.nivel });
    }
  }
}
