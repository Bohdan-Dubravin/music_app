<template>
  <header id="header" class="bg-[rgba(18,18,18,0.8)] z-20">
    <nav
      class="container mx-auto flex justify-start items-center max-w-[1154px]"
    >
      <!-- App Name -->
      <router-link
        class="text-white hover:text-white font- uppercase text-2xl mr-4 flex items-center"
        exact-active-class="no-active"
        to="/"
      >
        <img
          src="/assets/img/main-icon.svg
        "
          alt="music-icon"
          class="w-[60px]"
        />
        Music</router-link
      >
      <HamburgerMenuComponent />
      <ul class="ml-auto flex lg:hidden">
        <li>
          <router-link class="p-2 mr-5 text-white font-bold text-lg" to="/about"
            >About</router-link
          >
        </li>
        <li v-if="!userStore.userLoggedIn">
          <a
            class="p-2 hover:text-white font-bold text-lg main-btn"
            href="#"
            @click.prevent="toggleAuthModal"
            >Login / Register</a
          >
        </li>
        <template v-else="userLoggedIn">
          <li>
            <router-link
              class="p-2 mr-5 text-white font-bold text-lg"
              to="/manage"
              >Manage</router-link
            >
          </li>
          <li>
            <a
              @click.prevent="signOut()"
              class="p-2 hover:text-white font-bold text-lg main-btn hover:bg-[rgba(240,88,88,0.8)]"
              href="#"
              >Log out</a
            >
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>
<script>
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';
import { useRouter, useRoute } from 'vue-router';
import HamburgerMenuComponent from './ui/HamburgerMenuComponent.vue';
export default {
  name: 'Header',
  setup() {
    const modalStore = useModalStore();
    const userStore = useUserStore();
    const router = useRouter();
    const route = useRoute();
    function toggleAuthModal() {
      modalStore.toggleIsOpen();
    }
    async function signOut() {
      try {
        await userStore.signOutProfile();
        console.log(route);
        if (route.meta.requiresAuth) {
          router.push('/');
        }
      } catch (error) {
        console.log(error);
      }
    }
    return { toggleAuthModal, userStore, signOut };
  },
  components: { HamburgerMenuComponent },
};
</script>
<style></style>
