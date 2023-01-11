import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '@/utils/firestoreConfig';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore/lite';

export const useUserStore = defineStore('user', () => {
  const userLoggedIn = ref(false);

  function toggleIsLoggedIn() {
    userLoggedIn.value = !userLoggedIn.value;
  }

  function setIsLoggedIn() {
    userLoggedIn.value = true;
  }

  async function authenticate(values) {
    const user = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    userLoggedIn.value = true;

    console.log(user);
  }

  async function register(values) {
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    const docRef = doc(db, 'users', `${user.user.uid}`);

    await setDoc(docRef, {
      name: values.name,
      email: values.email,
      age: values.age,
      country: values.country,
    });

    await updateProfile(user.user, {
      displayName: values.name,
    });

    userLoggedIn.value = true;
  }

  return {
    toggleIsLoggedIn,
    userLoggedIn,
    register,
    setIsLoggedIn,
    authenticate,
  };
});
