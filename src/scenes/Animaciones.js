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
    this.scene.stop("juego");

    // pantalla completa
    this.input.keyboard.on('keydown-F', () => {
      this.fullscreenElement = this.scale.fullscreenTarget;
      
      if (this.scale.isFullscreen) {
          this.scale.stopFullscreen();
      } else {
          this.scale.startFullscreen();
      }
  });
  this.scale.fullscreenTarget = this.game.canvas;

  // sonidos y música
  this.musicaAnimacion = this.sound.add("musicaAnimacion", { loop: false });
  this.puertaAnimacion = this.sound.add("puerta-animacion", { loop: false });
  this.wooshAnimacion = this.sound.add("woosh-animacion", { loop: false });
  this.wooshLargo = this.sound.add("woosh-largo", { loop: false });
  this.tragarAnimacion = this.sound.add("tragar-animacion", { loop: false });
  this.tragarAnimacion.setVolume(0.6);
  this.sueloRoto = this.sound.add("suelo-roto", { loop: false });


    if (this.nivel === 0) {
      console.log("animacion1");

      this.add.image(957, 540, "fondo-viñeta");

      this.musicaAnimacion.play();

      this.tweens.add({
        targets: this.add.image(-1500, 300, "viñeta1"),
        x: 955,
        ease: "Power1",
        duration: 1000,
        onComplete: () => {
          setTimeout(() => {
             this.tweens.add({
              targets: this.add.image(270, 1500, "viñeta2"),
              y: 800,
              ease: "Power1",
              duration: 1000,
              onComplete: () => {
                setTimeout(() => {
                   this.tweens.add({
                    targets: this.add.image(720, 1500, "viñeta3"),
                    y: 800,
                    ease: "Power1",
                    duration: 1000,
                    onComplete: () => {
                      setTimeout(() => {
                        this.wooshAnimacion.play();
                         this.tweens.add({
                          targets: this.add.image(1090, 1500, "viñeta4"),
                          y: 800,
                          ease: "Power1",
                          duration: 1000,
                          onComplete: () => {
                            setTimeout(() => {
                             this.tweens.add({
                                targets: this.add.image(1400, 1500, "viñeta5"),
                                y: 800,
                                ease: "Power1",
                                duration: 1000,
                                onComplete: () => {
                                  setTimeout(() => {
                                     this.tweens.add({
                                      targets: this.add.image(1740, 1500, "viñeta6"),
                                      y: 800,
                                      ease: "Power1",
                                      duration: 1000,
                                      onComplete: () => {
                                        this.tragarAnimacion.play();
                                        setTimeout(() => {
                                          this.add.image(957, 540, "fondo-viñeta");
                                           this.tweens.add({
                                            targets: this.add.image(-1500, 250, "viñeta7"),
                                            x: 955,
                                            ease: "Power1",
                                            duration: 1000,
                                            onComplete: () => {
                                              this.wooshLargo.play();
                                              setTimeout(() => {
                                                this.tweens.add({
                                                  targets: this.add.image(-1500, 600, "viñeta8"),
                                                  x: 955,
                                                  ease: "Power1",
                                                  duration: 1000,
                                                  onComplete: () => {
                                                    setTimeout(() => {
                                                      this.puertaAnimacion.play();
                                                       this.tweens.add({
                                                        targets: this.add.image(-1500, 900, "viñeta9"),
                                                        x: 955,
                                                        ease: "Power1",
                                                        duration: 500,
                                                        onComplete: () => {},
                                                      });
                                                    }, 1000); 
                                                  },
                                                });
                                              }, 1000); 
                                            },
                                          });
                                        }, 1500); 
                                      },
                                    });
                                  }, 500); 
                                },
                              });
                            }, 1000); 
                          },
                        });
                      }, 1000); 
                    },
                  });
                }, 1000); 
              },
            });
          }, 1000); 
        },
      });

   
      setTimeout(() => {
        this.musicaAnimacion.stop();
        this.nivel += 1;
        this.scene.start("juego", { nivel: this.nivel });
      }, 20000);
    }

    if (this.nivel === 4) {
      console.log("animacion2");
      this.add.image(957, 540, "fondo-viñeta");


       this.tweens.add({
        targets: this.add.image(370, -1500, "viñeta10"),
        y: 300,
        ease: "Power1",
        duration: 1000,
        onComplete: () => {
          setTimeout(() => {
            this.tweens.add({
              targets: this.add.image(1070, -1500, "viñeta11"),
              y: 300,
              ease: "Power1",
              duration: 1000,
              onComplete: () => {
                setTimeout(() => {
                   this.tweens.add({
                    targets: this.add.image(1650, -1500, "viñeta12"),
                    y: 300,
                    ease: "Power1",
                    duration: 1000,
                    onComplete: () => {
                      this.sueloRoto.play();
                      setTimeout(() => {
                       this.tweens.add({
                          targets: this.add.image(-1500, 800, "viñeta13"),
                          x: 730,
                          ease: "Power1",
                          duration: 1000,
                          onComplete: () => {
                            setTimeout(() => {
                               this.tweens.add({
                                targets: this.add.image(1650, 1500, "viñeta14"),
                                y: 800,
                                ease: "Power1",
                                duration: 1000,
                                onComplete: () => {
                                  this.add.image(957, 540, "fondo-viñeta");
                                  setTimeout(() => {
                                    this.tweens.add({
                                      targets: this.add.image(-1500, 250, "viñeta15"),
                                      x: 955,
                                      ease: "Power1",
                                      duration: 1000,
                                      onComplete: () => {
                                        setTimeout(() => {
                                          this.tweens.add({
                                            targets: this.add.image(-1500, 750, "viñeta16"),
                                            x: 965,
                                            ease: "Power1",
                                            duration: 1000,
                                            onComplete: () => {
                                            },
                                          });
                                        }, 1000); 
                                      },
                                    });
                                  }, 1000); 
                                },
                              });
                            }, 1000); 
                          },
                        });
                      }, 1000); 
                    },
                  });
                }, 1000); 
              },
            });
          }, 1000); 
        },
      });

   
      setTimeout(() => {
        events.off("colisionConInterruptor");
        events.off("temporizador");
        events.off("colisionConPalanca");
        this.scene.start("menu", { nivel: this.nivel });
        this.sound.stopAll();
      }, 14000);
    }
  }
}
