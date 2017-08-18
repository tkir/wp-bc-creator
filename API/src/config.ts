import * as firebase from 'firebase';

export class Config {

  private configRef;

  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAaby9VirSsKxdzJmXn1RDtjg9WOCZ_rU8',
      authDomain: 'html-pdf-api-config.firebaseapp.com',
      databaseURL: 'https://html-pdf-api-config.firebaseio.com',
      storageBucket: 'html-pdf-api-config.appspot.com',
      messagingSenderId: '709495799979'
    });

    this.configRef = firebase.database().ref('BusinessCardEditor');
  }

  public get(key: string, cb) {
    this.configRef.once('value')
      .then(snap => {
        let res: any = snap.val();
        key.split('.')
          .forEach(k => res = res[k]);
        cb(null, res);
      })
      .catch(err => cb(err, null));
  }
}
