import Phaser from "phaser";
import events from "./EventCenter";
import Jugador from "../components/Jugador";
import Objetos from "../components/Objetos";

export default class Juego extends Phaser.Scene {
  jugador;

  nivel;
 


  constructor() {
    super("juego");
  }

  init(data){

    this.llaveRecolectada = data.llaveRecolectada || 0;
    this.nivel = data.nivel || 1;

  
  }

  create() {

    this.scene.launch("ui",);

    const mapKey = `nivel${this.nivel}`;


    const map = this.make.tilemap({ key: mapKey });

    const capaFondo = map.addTilesetImage("fondo", "fondo1");

    map.createLayer("background", capaFondo, 0, 0);

    const capaPiso = map.addTilesetImage("suelo", "suelo1");

    const pisoLayer =map.createLayer("floor", capaPiso, 0, 0);

    pisoLayer.setCollisionByProperty({ colision: true });


    map.getObjectLayer("objects");

    const jugadorSpawn = map.findObject("objects", (obj) => obj.name === "jugador");
    const llaveSpawn = map.findObject("objects", (obj) => obj.name === "llave");
    const puertaSpawn = map.findObject("objects", (obj) => obj.name === "puerta");
    const cajaSpawn = map.findObject("objects", (obj) => obj.name === "caja");


    // agrega el personaje al escenario
    this.jugador = new Jugador(
      this,
      jugadorSpawn.x,
      jugadorSpawn.y,
      "alma"
    ).setScale(0.5);

    this.physics.add.collider(this.jugador, pisoLayer);

    // agrega la llave al escenario 
    this.llave = new Objetos(
      this,
      llaveSpawn.x,
      llaveSpawn.y,
      "llave"
    ).setScale(0.5);

    this.physics.add.collider(this.llave, pisoLayer);

    this.physics.add.overlap(
      this.jugador, 
      this.llave,
      this.recolectarObjeto,
      null,
      this 
      );

    // agregar la puerta al escenario
    this.puerta = new Objetos (
      this,
      puertaSpawn.x,
      puertaSpawn.y,
      "puerta-cerrada"
    );

    this.physics.add.collider(this.puerta, pisoLayer);

    this.physics.add.overlap(
      this.jugador, 
      this.puerta,
      this.abrirPuerta,
      () => this.llaveRecolectada === 1,
      this
      );

    // agregar caja al escenario
    this.caja = new Objetos (
      this,
      cajaSpawn.x,
      cajaSpawn.y,
      "caja"
    ).setScale(0.5);

    this.physics.add.collider(this.caja, pisoLayer);

    this.physics.add.collider(this.jugador, this.caja );



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
   this.llave.disableBody (true, true);
   this.llaveRecolectada = 1;
   events.emit ("mostrarLlave")

   console.log(`llave recolectada ${  this.llaveRecolectada}`);
  }




  abrirPuerta() {

    this.puerta.disableBody(true,true);

    console.log("puerta abierta");

    this.nivel +=1;

    this.scene.restart({ llaveRecolectada: 0, nivel: this.nivel });

  }


}
