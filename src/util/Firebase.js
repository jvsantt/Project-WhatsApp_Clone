const firebase = require("firebase");
require("firebase/firestore");

export class Firebase {
  constructor() {
    this._config = {
      apiKey: "AIzaSyAsaKjeBq4rvmiJXTwZsgTSYR1MGOcLqls",
      authDomain: "whatsapp-clone-8239f.firebaseapp.com",
      databaseURL: "https://whatsapp-clone-8239f.firebaseio.com",
      projectId: "whatsapp-clone-8239f",
      storageBucket: "whatsapp-clone-8239f.appspot.com",
      messagingSenderId: "393633598535"
    };
    this.init();
  }

  init() {
    if (!window._initializedFirebase) {
      firebase.initializeApp(this._config);

      firebase.firestore().settings({});

      window._initializedFirebase = true;
    }
  }

  static db() {
    return firebase.firestore();
  }

  static hd() {
    return firebase.storage();
  }

  initAuth() {
    return new Promise((s, f) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          let token = result.credential.accessToken;
          let user = result.user;

          s({
            user,
            token
          });
        })
        .catch(err => {
          f(err);
        });
    });
  }
}
