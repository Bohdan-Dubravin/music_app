<template>
  <!-- Header -->
  <Header />

  <router-view></router-view>
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
}
</script>
