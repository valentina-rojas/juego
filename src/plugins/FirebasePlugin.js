import Phaser from "phaser";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8RgGgZmq7BpaD7speM_Qu3RNAn3Tt1_c",
  authDomain: "liberate-de-las-sombras.firebaseapp.com",
  projectId: "liberate-de-las-sombras",
  storageBucket: "liberate-de-las-sombras.appspot.com",
  messagingSenderId: "726170531922",
  appId: "1:726170531922:web:d06e3364b7137646c9078b",
};

export default class FirebasePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
    this.auth = getAuth(app);
    this.onLoggedInCallback = () => {};

    this.authStateChangedUnsubscribe = onAuthStateChanged(this.auth, (user) => {
      if (user && this.onLoggedInCallback) {
        this.onLoggedInCallback();
      }
    });
  }

  async signInAnonymously() {
    const credentials = await signInAnonymously(this.auth);
    return credentials.user;
  }
}
