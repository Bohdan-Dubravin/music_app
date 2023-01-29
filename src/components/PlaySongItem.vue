<template>
  <li
    class="w-full h-full flex flex-col bg-zinc-900 hover:bg-zinc-800 !p-[12px] transition rounded-[12px] hover:-translate-y-2"
  >
    <div
      @click.prevent="newSong(song)"
      class="relative group w-full h-[250px] mb-[16px]"
    >
      <div
        class="absolute-center transition-all invisible group-hover:visible w-[72px] h-[72px] bg-[rgba(0,0,0,0.5)] z-20 absolute rounded-full border"
      >
        <img
          class="top-[50%] left-[50%] translate-x-[-40%] translate-y-[-50%] !rotate-90 absolute w-[20px]"
          src="/assets/img/triangle.svg"
          alt="play-img"
        />
      </div>
      <img
        :src="song.songImage"
        alt="songImage"
        class="w-full [h-200px] object-cover rounded-md"
      />
    </div>
    <div>
      <router-link
        :to="{ name: 'song', params: { id: song.songId } }"
        class="font-bold block text-gray-600"
      >
        <p class="text-center truncate">{{ song.displayName }}</p>
        <p class="text-white text-center truncate">
          {{ song.modifiedName }}
        </p></router-link
      >
      <span class="text-gray-500 text-sm">Artist Name</span>
    </div>

    <div class="text-gray-600 text-lg">
      <router-link
        custom
        :to="{ name: 'song', params: { id: song.songId }, hash: '#comments' }"
        v-slot="{ navigate }"
      >
        <span class="comments" @click="navigate">
          <i class="fa fa-comments text-gray-600"></i>
          {{ song.comment_count }}
        </span>
      </router-link>
    </div>
  </li>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { usePlayerStore } from '@/stores/player';
export default {
  props: {
    song: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(usePlayerStore, ['newSong']),
  },
};
</script>
<style></style>
