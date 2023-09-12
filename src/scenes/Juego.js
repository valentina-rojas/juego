import Phaser from "phaser";
// import events from "./EventCenter";
import Jugador from "../components/Jugador";

export default class Juego extends Phaser.Scene {
  jugador;

  constructor() {
    super("juego");
  }

  create() {
    const map = this.make.tilemap({ key: "nivel1" });

    const capaFondo = map.addTilesetImage("fondo", "fondo1");

    map.createLayer("background", capaFondo, 0, 0);

    map.getObjectLayer("objects");

    const spawnPoint = map.findObject("objects", (obj) => obj.name === "jugador");

    // agrega el personaje al escenario
    this.jugador = new Jugador(
      this,
      spawnPoint.x,
      spawnPoint.y,
      "alma"
    ).setScale(0.5);
  }

  update() {
    // movimiento del jugador
    this.jugador.movimiento();
  }
}
