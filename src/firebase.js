import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, set, update, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAINLIJy-d-jNY09ydz6O0fqevoPFFPB-s",
  authDomain: "project-homevest.firebaseapp.com",
  databaseURL: "https://project-homevest-default-rtdb.firebaseio.com",
  projectId: "project-homevest",
  storageBucket: "project-homevest.firebasestorage.app",
  messagingSenderId: "788914642826",
  appId: "1:788914642826:web:48b4c99f8311bfacafb273",
  measurementId: "G-XM0M8QTXS5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export async function createUserIfMissing(user) {
  if (!user) return;

  const userRef = ref(db, `users/${user.uid}`);
  const snap = await get(userRef);

  if (!snap.exists()) {
    await set(userRef, {
      uid: user.uid,
      displayName: user.displayName || "",
      email: user.email || "",
      favorites: {},
      listings: {}
    });
    return;
  }

  const data = snap.val() || {};
  const updates = {};
  if (!data.favorites) updates.favorites = {};
  if (!data.listings) updates.listings = {};

  if (Object.keys(updates).length > 0) update(userRef, updates);
}