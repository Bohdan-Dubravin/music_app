<template>
  <header id="header" class="bg-[rgba(18,18,18,0.8)] z-20">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        exact-active-class="no-active"
        to="/"
        >Music</router-link
      >

      <div class="flex flex-grow items-center">
        <ul class="flex flex-row mt-1">
          <li>
            <router-link class="px-2 text-white" to="/about">About</router-link>
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else="userLoggedIn">
            <li>
              <router-link class="px-2 text-white" to="/manage"
                >Manage</router-link
              >
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
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
export default {
  name: 'Header',
  setup() {
    const modalStore = useModalStore()
    const userStore = useUserStore()
    const router = useRouter()
    const route = useRoute()
    function toggleAuthModal() {
      modalStore.toggleIsOpen()
    }

    async function signOut() {
      try {
        await userStore.signOutProfile()
        console.log(route)
        if (route.meta.requiresAuth) {
          router.push('/')
        }
      } catch (error) {
        console.log(error)
      }
    }
    return { toggleAuthModal, userStore, signOut }
  },
}
</script>
<style></style>
