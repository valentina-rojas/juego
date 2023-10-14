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

    const fondoKey = `fondo${this.nivel}`;
    const capaFondo = map.addTilesetImage("fondo", fondoKey );
    map.createLayer("background", capaFondo, 0, 0);

    const mueblesKey = `muebles${this.nivel}`;
    const capaMuebles = map.addTilesetImage("muebles", mueblesKey);
    map.createLayer("furniture", capaMuebles, 0, 0);

    const pisoKey = `suelo${this.nivel}`;
    const capaPiso = map.addTilesetImage("suelo", pisoKey);
    const pisoLayer = map.createLayer("floor", capaPiso, 0, 0);
    pisoLayer.setCollisionByProperty({ colision: true });

    const objectsLayer = map.getObjectLayer("objects");

    this.manos = this.physics.add.group();
    this.jarron = this.physics.add.group();

    objectsLayer.objects.forEach((objData) => {
     
      const { x = 0, y = 0, name, } = objData;
      switch (name) {
        case "jugador": {
        
          this.jugador = new Jugador(
            this,
            x,
            y,
            "alma"
          );
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
            "caja").setSize(360, 320).setOffset(10, 10)
          break;
        }

        case "jarron": {          
          const jarron = new ObjetosMovibles(
            this, 
            x, 
            y, 
            "jarron")
            this.jarron.add(jarron)
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
        delay:2000,
        callback: this.manosRandom,
        callbackScope: this,
        loop: true
      }
      )
      
      console.log("enemigo");

      console.log("manos",this.manos)

     this.physics.add.overlap(
      this.manos,
      this.jugador,
      this.perderJuego,
      null,
      this
    );



   this.physics.add.collider(this.manos, pisoLayer, this. desaparecerManos,null,this);
    }

    // condicionales para nivel 3  // agregar enemigo final

    if(this.nivel === 3) {

   this.enemigoFinal = new Enemigo(
   this,
   400,
   500,
   "manos"
    );

  this.enemigoFinal.movimientoEnemigo();

  this.physics.add.collider(this.jugador, this.enemigoFinal, this.perderJuego, null,this)
    }

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
  

    // cámara sigue al jugador
    this.cameras.main.startFollow(this.jugador);
    // world bounds
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // camera dont go out of the map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    

    
  }

  update() {
    this.jugador.movimiento();
  }

  romperJarron(jarron){
    console.log ("jarron roto")
    const x = jarron.x;
    const y = jarron.y;
    jarron.destroy();
    this.llave2 = new Objetos (this, x, y, "llave");

    this.physics.add.overlap(
      this.jugador,
      this.llave2,
      this.recolectarLlave2,
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

  recolectarLlave2() {
    this.llave2.disableBody(true, true);
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

    if ( this.nivel === 4){
      console.log("animacion2")

      this.scene.start(("animaciones"),{ nivel: this.nivel }); 
  }
  }
  
  manosRandom(){
    const manos= new Enemigo (this, this.jugador.x-200, this.jugador.y - 1000, "manos");
    this.manos.add(manos)


    console.log("nueva mano");
  }

  desaparecerManos(manos){
  
      manos.destroy();
      console.log("mano eliminada");
  }

  perderJuego(){
    console.log(this)
    this.scene.start(("juego"),{ nivel: this.nivel });
  }

}
