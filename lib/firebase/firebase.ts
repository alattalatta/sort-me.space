import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebase from 'firebase/app';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDx-aqcWadZGFklRIX9EuovN4u0_kVkAKc',
    authDomain: 'sort-me-yang.firebaseapp.com',
    databaseURL: 'https://sort-me-yang.firebaseio.com',
    projectId: 'sort-me-yang',
    storageBucket: 'sort-me-yang.appspot.com',
    messagingSenderId: '74383486611',
  });
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
