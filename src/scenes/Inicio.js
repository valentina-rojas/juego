import Phaser from "phaser";
// import events from "./EventCenter";
import { EN_US, ES_AR } from "../enums/lenguajes";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getTranslations } from "../services/traducciones";

export default class Inicio extends Phaser.Scene {
  #textSpanish;

  #textEnglish;
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
      .rectangle(width / 1.5, height / 2, 150, 75, 0xffffff)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        getTranslations(ES_AR);
        console.log("idioma: ES_AR");
        this.iniciarEscena();
      });

    this.#textSpanish = this.add
      .text(buttonSpanish.x, buttonSpanish.y, "Español", {
        color: "#000000",
      })
      .setOrigin(0.5);

    const buttonEnglish = this.add
      .rectangle(width / 2.5, height / 2, 150, 75, 0xffffff)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        getTranslations(EN_US);
        console.log("idioma: EN_US");
        this.iniciarEscena();
      });

    this.#textEnglish = this.add
      .text(buttonEnglish.x, buttonEnglish.y, "Inglés", {
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

    await getTranslations(language, this.updateWasChangedLanguage);
  }

  iniciarEscena() {
    this.scene.start("menu", { language: this.#language });
  }
}
