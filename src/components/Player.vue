<template>
  <!-- Player -->
  <div
    class="fixed z-50 backdrop-blur-xl bottom-0 left-0 bg-[rgba(49,49,49,0.6)] px-4 py-2 w-full"
  >
    <!-- Track Info -->
    <div class="text-center" v-if="currentSong.modifiedName">
      <span class="song-title text-gray-200 font-bold"
        >{{ currentSong.modifiedName }} by
      </span>

      <span class="song-artist text-gray-200">{{
        currentSong.displayName
      }}</span>
    </div>
    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="toggleAudio">
        <i
          class="fa text-gray-100 text-xl"
          :class="{ 'fa-play': !playing, 'fa-pause': playing }"
        ></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime text-gray-200">{{ seek }}</div>
      <!-- Scrub Container  -->
      <div
        @click.prevent="updateSeek"
        class="w-full h-2 rounded bg-zinc-700 relative cursor-pointer"
      >
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-gray-100 text-lg"
          :style="{ left: playerProgress }"
        >
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-gray-100 to-gray-100"
          :style="{ width: playerProgress }"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration text-gray-200">{{ duration }}</div>
    </div>
  </div>
</template>
<script>
import { usePlayerStore } from '@/stores/player';
import { mapState, mapActions } from 'pinia';
export default {
  name: 'Player',
  methods: {
    ...mapActions(usePlayerStore, ['toggleAudio', 'updateSeek']),
  },
  computed: {
    ...mapState(usePlayerStore, [
      'playing',
      'duration',
      'seek',
      'playerProgress',
      'currentSong',
    ]),
  },
};
</script>
<style lang=""></style>
