import Phaser from "phaser";

export default class Animaciones extends Phaser.Scene {

  temporizadorSonido;
  musicaAmbiente;

  constructor() {
    super("animaciones");
  }

  init(data) {
    this.nivel = data.nivel || 0;
  }

  create() {
  
   if ( this.nivel === 0){
    console.log("animacion1")

    this.add.image(1000, 400, "animacion1");
    setTimeout(() => {
      this.nivel += 1;
      this.scene.start(("juego"),{ nivel: this.nivel });  
    }, 1500);
   
   }

   
   if ( this.nivel === 4){
    this.temporizadorSonido.mute=true;
    this.musicaAmbiente.stop();
    console.log("animacion2")
    this.add.image(1000, 400, "animacion1");
    setTimeout(() => {
      this.scene.start(("menu"),{ nivel: this.nivel });  
    }, 3000);
}
  }
}
