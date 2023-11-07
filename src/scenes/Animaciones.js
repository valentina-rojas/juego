import Phaser from "phaser";
import events from "../components/EventCenter";

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
    this.scene.stop("ui");


    this.scene.stop("ui");



   if ( this.nivel === 0){
    console.log("animacion1")

    this.add.image(957, 540, "fondo-viñeta");

    const tweens1 = this.tweens.add({
      targets: this.add.image(-1500, 300, "viñeta1"),
      x: 955,
      ease: "Power1",
      duration: 1000,
      onComplete: () => {
        const tweens2 = this.tweens.add({
          targets: this.add.image(270, 1500, "viñeta2"),
          y: 800,
          ease: "Power1",
          duration: 1000,
          onComplete: () => {
           
            const tweens3 = this.tweens.add({
              targets: this.add.image(720, 1500, "viñeta3"),
              y: 800,
              ease:"Power1",
              duration:1000,
              onComplete: () => {
                const tweens4 = this.tweens.add({
                  targets:  this.add.image(1090, 1500, "viñeta4"),
                    y: 800,
                    ease:"Power1",
                    duration:1000,
                    onComplete: () => { 
                      const tweens5 = this.tweens.add({
                      targets:  this.add.image(1400, 1500, "viñeta5"),
                        y: 800,
                        ease:"Power1",
                        duration:1000,
                        onComplete: () => { 
                          const tweens6 = this.tweens.add({
                            targets:  this.add.image(1740, 1500, "viñeta6"),
                              y: 800,
                              ease:"Power1",
                              duration:1000,
                              onComplete: () => {
                                this.add.image(957, 540, "fondo-viñeta");
                                const tweens7 = this.tweens.add({
                                  targets:  this.add.image(-1500, 250, "viñeta7"),
                                  x: 955,
                                  ease:"Power1",
                                  duration:1000,
                                  onComplete : () => {
                                    const tweens8 = this.tweens.add({
                                      targets:  this.add.image(-1500, 600, "viñeta8"),
                                      x: 955,
                                      ease:"Power1",
                                      duration:1000,
                                      onComplete : () => {
                                        const tweens9 = this.tweens.add({
                                          targets:  this.add.image(-1500, 900, "viñeta9"),
                                          x: 955,
                                          ease:"Power1",
                                          duration:1000,
                                          onComplete : () => {}          
                                        })
                                      }
                                    })
                                  }
                                })
                              }
                          })
                        }
                    })
                    }
                })
              }
            })
          }
        })
      }
    });

    setTimeout(() => {
      this.nivel += 1;
      this.scene.start(("juego"),{ nivel: this.nivel });  
    }, 12000);
   
   }

   
   if ( this.nivel === 4){
    console.log("animacion2")
    
    this.add.image(957, 540, "fondo-viñeta");

    const tweens10 = this.tweens.add({
      targets: this.add.image(370, -1500, "viñeta10"),
      y: 300,
      ease: "Power1",
      duration: 1000,
    onComplete: () => {
      const tweens11 = this.tweens.add({
        targets: this.add.image(1070, -1500, "viñeta11"),
        y: 300,
        ease: "Power1",
        duration: 1000,
      onComplete: () => {
        const tweens12 = this.tweens.add({
          targets: this.add.image(1650, -1500, "viñeta12"),
          y: 300,
          ease: "Power1",
          duration: 1000,
        onComplete: () => {
          const tweens13 = this.tweens.add({
            targets: this.add.image(-1500, 800, "viñeta13"),
            x: 730,
            ease: "Power1",
            duration: 1000,
          onComplete: () => {
            const tweens14 = this.tweens.add({
              targets: this.add.image(1650, 1500, "viñeta14"),
              y: 800,
              ease: "Power1",
              duration: 1000,
            onComplete: () => {
              this.add.image(957, 540, "fondo-viñeta");
              const tweens15 = this.tweens.add({
                targets: this.add.image(-1500, 250, "viñeta15"),
                x: 955,
                ease: "Power1",
                duration: 1000,
              onComplete: () => {
                const tweens16 = this.tweens.add({
                  targets: this.add.image(-1500, 750, "viñeta16"),
                  x: 965,
                  ease: "Power1",
                  duration: 1000,
                onComplete: () => {
                }
                })
              }
              })
            }
            })        
          }
          })
        }   
        })
      }
      })  
    }
    
    })

    setTimeout(() => {
      events.off("colisionConInterruptor");
      events.off("temporizador");
      events.off("colisionConPalanca");
      this.scene.start(("menu"),{ nivel: this.nivel });  
    }, 12000);
}
  }
}
