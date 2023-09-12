import Phaser from "phaser";
// import events from "./EventCenter";
import Jugador from "../components/Jugador";

export default class Juego extends Phaser.Scene {
  jugador;

  constructor() {
    super("juego");
  }

  create() {
    // agrega el personaje principal al escenario
    this.jugador = new Jugador(this, 400, 300, "alma").setScale(0.5);
  }

  update() {
    // movimiento del jugador
    this.jugador.movimiento();
  }
}
