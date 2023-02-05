<template>
  <div class="absolute -z-10 top-0 w-full">
    <img
      class="absolute opacity-0 top-0 delay-200 transition-all duration-[1000ms] object-cover w-[100%] max-h-[500px]"
      :class="{ 'opacity-100': currentImg === 1 }"
      :src="firstImageUrl || '/assets/img/OqH4GUk.jpeg'"
      alt="bg-img"
    />
    <img
      class="absolute opacity-0 delay-200 top-0 transition-all duration-[1000ms] object-cover w-[100%] max-h-[500px]"
      :src="secondImageUrl || '/assets/img/OqH4GUk.jpeg'"
      :class="{ 'opacity-100': currentImg === 0 }"
      alt="bg-img"
    />
  </div>
  <div class="backdrop-blur-xl pb-4 -z-20">
    <Header />
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
  <Player />
  <auth></auth>
</template>

<script>
import Header from '@/components/Header.vue';
import Auth from '@/components/Auth.vue';
import { mapActions, mapState } from 'pinia';
import { auth } from '@/utils/firestoreConfig';
import { useUserStore } from '@/stores/user';
import { useImageStore } from '@/stores/bgImage';
import Player from './components/Player.vue';

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
  computed: {
    ...mapState(useImageStore, [
      'firstImageUrl',
      'secondImageUrl',
      'currentImg',
    ]),
  },
  created() {
    if (auth.currentUser) {
      this.setIsLoggedIn();
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    },
  },
};
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
