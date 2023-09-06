import Phaser from "phaser";
// import events from "./EventCenter";
import Jugador from "../components/Jugador";

export default class Juego extends Phaser.Scene {
  constructor() {
    super("juego");
  }



  create() {

    // agrega el personaje principal al escenario
    this.player = new Jugador(this, 400, 300, "alma");
  }
}
