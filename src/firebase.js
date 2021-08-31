import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore"; // 파이어베이스 데이터베이스
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTO_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig); // 여기서만 사용할것

export const authService = firebase.auth(); //다른 컴포넌트에서 참조할것이므로 익스포트하고
export const firebaseInstance = firebase;
export const dbService = firebase.firestore(); //홈에서 데이터베이스를 저장할거다
export const storageService = firebase.storage();
//오토 서비스를 잘 받아오는지?
