import { getAnalytics } from "firebase/analytics";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import {
	CACHE_SIZE_UNLIMITED,
	collection,
	getDocs,
	getFirestore,
	initializeFirestore,
	memoryLocalCache,
	persistentLocalCache,
	persistentMultipleTabManager,
	query,
	where,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: "events-attendance-e2218.firebaseapp.com",
	projectId: "events-attendance-e2218",
	storageBucket: "events-attendance-e2218.appspot.com",
	messagingSenderId: "907723575897",
	appId: "1:907723575897:web:859466eee8c85f0c34d748",
	measurementId: "G-PF92KSL83T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const db = getFirestore(app);

const db = initializeFirestore(app, {
	localCache: persistentLocalCache(
		/*settings*/ { tabManager: persistentMultipleTabManager() },
	),
});

export { auth, provider, db };
