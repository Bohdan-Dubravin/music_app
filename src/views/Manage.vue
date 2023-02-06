<template>
  <section class="p-4 max-w-[1154px] lg:p-0 mx-auto mt-6">
    <h1 class="uppercase font-bold text-5xl mb-10 text-white max-w-[500px]">
      Manage and upload songs the way you want
    </h1>
    <div class="grid md:grid md:grid-cols-3 md:gap-4">
      <Upload :addSong="addSong" class="mb-8" />
      <div class="col-span-2">
        <div class="bg-zinc-800 rounded-xl relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title text-gray-200">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-indigo-600 text-2xl"
            ></i>
          </div>
          <div class="p-6 transition-all">
            <!-- Composition Items -->
            <song-item
              v-for="(song, i) in songs"
              :key="song.songId"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              @deleteSong="deleteSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { useUserStore } from '@/stores/user'
import Upload from '@/components/Upload.vue'
import { collection, query, where, getDocs } from 'firebase/firestore/lite'
import { auth, db } from '@/utils/firestoreConfig'

import SongItem from '@/components/ManageSong.vue'
export default {
  name: 'manage',
  data() {
    return { songs: [], unsavedFlag: false }
  },
  async mounted() {
    const q = query(
      collection(db, 'songs'),
      where('uid', '==', auth.currentUser.uid)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((song) => {
      this.songs.push({ ...song.data(), songId: song.id })
    })
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modifiedName = values.modifiedName
      this.songs[i].genre = values.genre
    },
    deleteSong(songId) {
      console.log(songId)
      this.songs = this.songs.filter((song) => song.songId !== songId)
    },

    addSong(song) {
      this.songs.push(song)
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value
    },
  },
  components: { Upload, SongItem },
  beforeRouteEnter(to, from, next) {
    const userStore = useUserStore()
    if (userStore.userLoggedIn) {
      next()
    } else {
      next('/')
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   if (!this.updateUnsavedFlag) {
  //     next()
  //   } else {
  //     const leave = confirm('You have unsaved changes. Do yo want to leave?')
  //     next(leave)
  //   }
  // },
}
</script>
<style></style>
