import Phaser from "phaser";
// import events from "./EventCenter";
import { EN_US, ES_AR, PT_BR } from "../enums/lenguajes";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getTranslations } from "../services/traducciones";

export default class Inicio extends Phaser.Scene {
  #textSpanish;

  #textEnglish;

  #textPortuguese;

  #language;

  #wasChangedLanguage = TODO;

  constructor() {
    super("inicio");
  }

  init({ language }) {
    this.language = language;
  }

  create() {
    const { width, height } = this.scale;

    const buttonSpanish = this.add
      .rectangle(width / 1.5, height / 2, 200, 85, 0xffffff)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        getTranslations(ES_AR);
        console.log("idioma: ES_AR");
        this.iniciarEscena();
      });

    this.#textSpanish = this.add
      .text(buttonSpanish.x, buttonSpanish.y, "Español", {
        fontFamily: 'Amatic SC',
        fontSize: "70px",
        color: "#000000",
      })
      .setOrigin(0.5);

    const buttonEnglish = this.add
      .rectangle(width / 2.5, height / 2, 200, 85, 0xffffff)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, async () => {
        await getTranslations(EN_US);
        console.log("idioma: EN_US");
        this.iniciarEscena();
      });

    this.#textEnglish = this.add
      .text(buttonEnglish.x, buttonEnglish.y, "Inglés", {
        fontFamily: 'Amatic SC',
        fontSize: "70px", 
        color: "#000000",
      })
      .setOrigin(0.5);

      const buttonPortuguese = this.add
      .rectangle(100, 200, 200, 85, 0xffffff)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, async () => {
        await getTranslations(PT_BR);
        console.log("idioma: PT_BR");
        this.iniciarEscena();
      });

    this.#textPortuguese = this.add
      .text(buttonPortuguese.x, buttonPortuguese.y, "Portugués", {
        color: "#000000",
      })
      .setOrigin(0.5);
  }

  update() {
    if (this.#wasChangedLanguage === FETCHED) {
      this.#wasChangedLanguage = READY;
    }
  }

  updateWasChangedLanguage = () => {
    this.#wasChangedLanguage = FETCHED;
  };

  async getTranslations(language) {
    this.language = language;
    this.#wasChangedLanguage = FETCHING;

    getTranslations(language, this.updateWasChangedLanguage);
  }

  iniciarEscena() {
    this.scene.start("menu", { language: this.#language });
  }
}
