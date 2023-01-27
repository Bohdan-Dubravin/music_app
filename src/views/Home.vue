<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            et dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
            suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
            pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>
      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>
    <!-- Main Content -->
    <section class="container mx-auto">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">Songs</span>
          <!-- Icon -->
          <i
            class="fa fa-headphones-alt float-right text-green-400 text-xl"
          ></i>
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <play-song-item
            v-for="song in songs"
            :key="song.songId"
            :song="song"
          />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>
<script>
import {
  getDocs,
  query,
  limit,
  orderBy,
  startAfter,
} from 'firebase/firestore/lite'
import { songsCollection } from '@/utils/firestoreConfig'
import PlaySongItem from '@/components/PlaySongItem.vue'
export default {
  name: 'Home',
  data() {
    return {
      songs: [],
      lastDocument: null,
    }
  },
  async mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.getSongs()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement
      const { innerHeight } = window
      const bottomOfPage = Math.round(scrollTop) + innerHeight === offsetHeight
      if (bottomOfPage) {
        this.getSongs()
      }
    },
    async getSongs() {
      let snapshots

      if (!this.lastDocument) {
        const firstQuery = query(
          songsCollection,
          orderBy('modifiedName', 'asc'),
          limit(5)
        )

        snapshots = await getDocs(firstQuery)
        this.lastDocument = snapshots.docs[snapshots.docs.length - 1]
      } else {
        const nextQuery = query(
          songsCollection,
          orderBy('modifiedName', 'asc'),
          startAfter(this.lastDocument),
          limit(5)
        )
        snapshots = await getDocs(nextQuery)
        this.lastDocument = snapshots.docs[snapshots.docs.length - 1]
      }

      snapshots.forEach((snap) => {
        this.songs.push({ ...snap.data(), songId: snap.id })
      })
    },
  },

  components: { PlaySongItem },
}
</script>
<style></style>
