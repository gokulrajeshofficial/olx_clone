import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyByBTxuOQXfOlvbMceqA4Q7-gYnhVu9bpM",
    authDomain: "react-olx-3b1de.firebaseapp.com",
    projectId: "react-olx-3b1de",
    storageBucket: "react-olx-3b1de.appspot.com",
    messagingSenderId: "630255920180",
    appId: "1:630255920180:web:e94c6fdb755f4e26cf1661",
    measurementId: "G-ME7ZWJ5944"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore();
  export default app;