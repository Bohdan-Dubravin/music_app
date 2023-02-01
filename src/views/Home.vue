<template>
  <main>
    <section class="h-[300px]">
      <h1 class="uppercase font-bold text-5xl text-gray-200 max-w-[400px]">
        Add Share Listen Music from anywhere
      </h1>
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="rounded relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold">
          <span class="card-title">Songs</span>
          <!-- Icon -->
          <i
            class="fa fa-headphones-alt float-right text-green-400 text-xl"
          ></i>
        </div>
        <!-- Playlist -->
        <ol class="gridItems" id="playlist">
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
