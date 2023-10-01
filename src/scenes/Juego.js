import Phaser from "phaser";
import Enemigo from "../components/Enemigo";
 import events from "./EventCenter";
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

    const objectsLayer = map.getObjectLayer("objects");

    objectsLayer.objects.forEach((objData) => {
     
      const { x = 0, y = 0, name, } = objData;
      switch (name) {
        case "jugador": {
        
          this.jugador = new Jugador(
            this,
            x,
            y,
            "alma"
          ).setScale(0.5);
          break;
        }
        case "puerta": {
          this.puerta = new Objetos(
            this,
            x,
            y,
            "puerta-cerrada"
          );
          break;
        }
        case "llave": {          
          this.llave = new Objetos(
            this,
            x,
            y,
            "llave"
          );
          break;
        }
        case "caja": {          
          this.caja = new ObjetosMovibles(
            this, 
            x, 
            y, 
            "caja")
          break;
        }
        default: {
          
          break;
        }
      }
    });

    // condicionales para nivel 2  // agregar enemigo 

    if (this.nivel === 2 ){

      this.time.addEvent({
        delay:5000,
        callback: this.manosRandom,
        callbackScope: this,
        loop: true
      }
      )
      
      console.log("enemigo");

      ;
    }

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

     /* this.physics.add.collider(
        this.manos,
        this.jugador,
        this.perderJuego,
        null,
        this
      ); */
  
    //  this.physics.add.collider(this.manos, pisoLayer, this.desaparecerManos, null, this)


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

    // iluminacion

    this.lights.enable();
  }

  update() {
    this.jugador.movimiento();
  }

  recolectarObjeto() {
    this.llave.disableBody(true, true);
    this.recolectables += 1;
     events.emit("mostrarLlave");
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

  manosRandom(){
    this.manos = new Enemigo (this, this.jugador.x-100, this.jugador.y - 1000, "caja");
    console.log("nueva mano");
  }

  desaparecerManos(){
      this.manos.destroy();
      console.log("mano eliminada");
  }

  perderJuego(){
    this.scene.start(("juego"),{ nivel: this.nivel });
  }

}
