<template>
  <!-- Header -->
  <Header />

  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <Player />
  <!-- Auth Modal -->
  <auth></auth>
</template>

<script>
import Header from '@/components/Header.vue'
import Auth from '@/components/Auth.vue'
import { mapActions } from 'pinia'
import { auth } from '@/utils/firestoreConfig'
import { useUserStore } from './stores/user'
import Player from './components/Player.vue'
export default {
  name: 'App',
  components: {
    Header,
    Auth,
    Player,
  },
  methods: {
    ...mapActions(useUserStore, ['setIsLoggedIn']),
  },
  created() {
    if (auth.currentUser) {
      this.setIsLoggedIn()
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    },
  },
}
</script>

<style>
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-enter-active {
  transition: all 0.5s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.5s ease-in;
}
</style>
