<template>
  <li
    class="w-full h-full flex flex-col bg-zinc-900 hover:bg-zinc-800 !p-[12px] transition duration-300 rounded-[12px] hover:-translate-y-2"
  >
    <div
      @click.prevent="playSong"
      class="cursor-pointer relative group w-full h-[250px] mb-[16px]"
    >
      <div
        class="absolute-center duration-200 invisible group-hover:visible transition-all h-0 w-0 group-hover:w-[72px] group-hover:h-[72px] bg-[rgba(0,0,0,0.5)] z-20 absolute rounded-full border"
      >
        <img
          class="top-[50%] left-[50%] translate-x-[-40%] translate-y-[-50%] !rotate-90 absolute w-[20px]"
          src="/assets/img/triangle.svg"
          alt="play-img"
        />
      </div>
      <img
        :src="song.songImage || '/assets/img/main-icon.svg'"
        alt="songImage"
        class="w-full [h-200px] object-cover rounded-md"
        :class="{ 'object-scale-down border border-zinc-500': !song.songImage }"
      />
    </div>
    <div>
      <router-link
        :to="{ name: 'song', params: { id: song.songId } }"
        class="font-bold block text-gray-600 hover:text-gray-600"
      >
        <p class="text-center truncate">{{ song.displayName }}</p>
        <p class="text-white text-center truncate">
          {{ song.modifiedName }}
        </p></router-link
      >
    </div>

    <div class="text-gray-200 text-lg bg-zinc-800 p-2 rounded-md mt-auto">
      <router-link
        custom
        :to="{ name: 'song', params: { id: song.songId }, hash: '#comments' }"
        v-slot="{ navigate }"
      >
        <p class="comments flex items-center" @click="navigate">
          <span class="mr-auto"> Comments</span>
          <i class="fa fa-comments mx-2 text-gray-600"></i>
          {{ song.comment_count }}
        </p>
      </router-link>
    </div>
  </li>
</template>
<script>
import { mapActions } from 'pinia'
import { usePlayerStore } from '@/stores/player'
import { useImageStore } from '@/stores/bgImage'

export default {
  props: {
    song: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(usePlayerStore, ['newSong']),
    ...mapActions(useImageStore, ['changeImage']),
    playSong() {
      this.newSong(this.song)
      this.changeImage(this.song.songImage)
    },
  },
}
</script>
<style></style>
