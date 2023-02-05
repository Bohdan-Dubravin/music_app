<template>
  <div class="block lg:hidden hamburger-wrapper" @click="toggleMenu">
    <div class="hamburger" :class="{ 'hamburger--closed': !isOpen }">
      <div
        class="hamburger__icon bg-white"
        :class="{ 'hamburger__icon--open bg-white': isOpen }"
      ></div>
    </div>

    <div class="menu-overlay" v-if="isOpen"></div>
    <div class="menu bg-zinc-900" :class="{ menu__open: isOpen }">
      <nav class="container mx-auto max-w-[1154px]">
        <!-- App Name -->
        <router-link
          class="text-white hover:text-white mb-6 uppercase text-2xl flex items-center"
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

        <ul class="flex flex-col">
          <li class="mb-4">
            <router-link
              class="p-2 mr-5 mb-4 text-white font-bold text-lg"
              to="/about"
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
            <li class="mb-4">
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
    </div>
  </div>
</template>

<script>
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';
import { useRouter, useRoute } from 'vue-router';
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
  },
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
};
</script>

<style>
.hamburger-wrapper {
  padding: 18px 3px 11px;
  width: 24px;
  height: 31px;
  margin: 0 7px;
  cursor: pointer;
}
.hamburger {
  position: fixed;
  top: 27px;
  right: 30px;
  z-index: 10;
}

.hamburger--closed {
  position: absolute;
}

.hamburger__icon {
  width: 18px;
  height: 2px;
  background-color: white;
  margin: 3px 0;
}
.hamburger__icon::before {
  top: -2px;
}
.hamburger__icon:after {
  bottom: -2px;
}

.hamburger__icon--open {
  height: 0;
  position: relative;
}

.hamburger__select-lang {
  margin-bottom: 20px;
}

.hamburger__icon:before,
.hamburger__icon:after {
  content: '';
  width: 18px;
  height: 2px;
  background: white;
  border-radius: 10px;
  position: absolute;
  transition: transform 0.5s ease;
  left: 0;
}
.hamburger__icon--open:before {
  transform: rotate(45deg);
  transition: transform 0.5s ease;
  top: 0;
}
.hamburger__icon--open:after {
  transform: rotate(-45deg);
  transition: transform 0.5s ease;
  top: 0;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
}

.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
  transform: translateY(-100%);
  transition: transform 0.5s ease;
  padding: 30px;
  padding-top: 60px;
}
.menu__open {
  transform: translateY(0);
}

.menu__link {
  width: 167px;
  height: 40px;
}
</style>
