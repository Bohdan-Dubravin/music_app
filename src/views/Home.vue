<template>
  <main class="max-w-[1154px] mx-auto p-4 lg:p-0">
    <section class="h-[300px] mt-[80px]">
      <h1
        class="uppercase font-bold text-3xl lg:text-5xl text-white max-w-[500px]"
      >
        Add Share Listen Music from anywhere
      </h1>
      <p class="max-w-[600px] mt-3 lg:text-xl text-[rgba(255,255,255,0.4)]">
        Create and collect amazing collections, discover new artists on a new
        project.
      </p>
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="rounded relative flex flex-col">
        <div class="pt-6 pb-3 font-bold border-b mb-5">
          <span
            class="card-title uppercase font-bold text-xl lg:text-3xl text-gray-200 max-w-[500px]"
            >Recently posted songs</span
          >
          <!-- Icon -->
          <i class="fa fa-headphones-alt float-right text-gray-200 text-xl"></i>
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
