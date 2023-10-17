import Phaser from "phaser";
// import events from "./EventCenter";
import { EN_US, ES_AR, PT_BR } from "../enums/lenguajes";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getTranslations } from "../services/traducciones";

export default class Inicio extends Phaser.Scene {
  #language;

  #wasChangedLanguage = TODO;

  constructor() {
    super("inicio");
  }

  init({ language }) {
    this.language = language;
  }

  create() {

    this.add.image(960,540,"fondoIdiomas")
  

      const buttonSpanish = this.add
      .image(960, 300, "banderaEspañol")
      .setInteractive()
      
buttonSpanish.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
  getTranslations(ES_AR);
  console.log("idioma: ES_AR");
  this.iniciarEscena();
});
   
    const buttonEnglish = this.add
      .image(500, 700, "banderaIngles")
      .setInteractive()
     

 buttonEnglish .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, async () => {
  await getTranslations(EN_US);
  console.log("idioma: EN_US");
  this.iniciarEscena();
});

      const buttonPortuguese = this.add
      .image(1400, 700, "banderaPortugues")
      .setInteractive()
     


      buttonPortuguese .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, async () => {
        await getTranslations(PT_BR);
        console.log("idioma: PT_BR");
        this.iniciarEscena();
      });

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
