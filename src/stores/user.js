import { defineStore } from 'pinia';
import { ref } from 'vue';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/utils/firestoreConfig';
import { updateProfile } from 'firebase/auth';
import { addDoc, collection, setDoc } from 'firebase/firestore/lite';

export const useUserStore = defineStore('user', () => {
  const userLoggedIn = ref(false);

  function toggleIsLoggedIn() {
    userLoggedIn.value = !userLoggedIn.value;
  }

  async function register(values) {
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    await setDoc(collection(db, 'users/' + user.user.uid), {
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

  return { toggleIsLoggedIn, userLoggedIn, register };
});
