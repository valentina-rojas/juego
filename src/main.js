import Phaser from "phaser";
import Juego from "./scenes/Juego";
import UI from "./scenes/UI";
import Menu from "./scenes/Menu";
import Preload from "./scenes/Preload";
import Creditos from "./scenes/Creditos";
import Ajustes from "./scenes/Ajustes";
import Pausa from "./scenes/Pausa";
import Inicio from "./scenes/Inicio";
import Animaciones from "./scenes/Animaciones";
import FirebasePlugin from "./plugins/FirebasePlugin";
import Login from "./scenes/Login";
import Puntajes from "./scenes/Puntajes";

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: false,
    },
  },
  scene: [Preload, Login, Inicio, Menu, Creditos, Ajustes, Puntajes , Pausa, Juego, UI, Animaciones],
  plugins: {
    global: [
      {
        key: "FirebasePlugin",
        plugin: FirebasePlugin,
        start: true,
        mapping: "firebase",
      },
    ],
  },
 
};

export default new Phaser.Game(config);
