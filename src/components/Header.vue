<template lang="">
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <a class="text-white font-bold uppercase text-2xl mr-4" href="#">Music</a>

      <div class="flex flex-grow items-center">
        <ul class="flex flex-row mt-1">
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else="userLoggedIn">
            <li>
              <a class="px-2 text-white" href="#">Manage</a>
            </li>
            <li>
              <a @click.prevent="signOut()" class="px-2 text-white" href="#"
                >Log out</a
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';
export default {
  name: 'Header',
  setup() {
    const modalStore = useModalStore();
    const userStore = useUserStore();

    function toggleAuthModal() {
      modalStore.toggleIsOpen();
    }

    async function signOut() {
      try {
        await userStore.signOutProfile();
      } catch (error) {
        console.log(error);
      }
    }
    return { toggleAuthModal, userStore, signOut };
  },
};
</script>
<style></style>
