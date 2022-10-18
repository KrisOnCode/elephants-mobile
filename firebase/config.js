import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import Constants from 'expo-constants';

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const projectStorage = firebase.storage()
const timestamp = firebase.firestore.Timestamp

export { projectAuth, projectFirestore, projectStorage, timestamp }