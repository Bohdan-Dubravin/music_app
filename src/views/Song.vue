<template lang="">
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          @click.prevent="newSong(song)"
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
        >
          <i
            class="fa"
            :class="{ 'fa-play': !playing, 'fa-pause': playing }"
          ></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modifiedName }}</div>
          <div>{{ song.genre }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section id="comments" class="container mx-auto mt-6">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">Comments ({{ comments.length || 0 }})</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <template v-if="userLoggedIn">
            <h2 v-show="isError" class="bg-red-600 text-white rounded p-3">
              Fail to add a comment
            </h2>
            <vee-form :validation-schema="commentSchema" @submit="addComment">
              <vee-field
                as="textarea"
                name="commentText"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
                placeholder="Your comment here..."
              />
              <ErrorMessage
                class="text-red-600 block mb-2"
                name="commentText"
              />
              <button
                type="submit"
                class="py-1.5 px-3 rounded text-white bg-green-600 block"
              >
                Submit
              </button>
            </vee-form>
          </template>
          <h2 v-else class="text-gray-800 font-bold">
            Sign In to add a comment
          </h2>
          <!-- Sort Comments -->
          <select
            v-model="sortOrder"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        v-for="comment in sortedComments"
        :key="comment.docId"
        class="p-6 bg-gray-50 border border-gray-200"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.author }}</div>
          <time class="italic text-sm">{{ comment.datePosted }}</time>
        </div>
        <p>{{ comment.content }}</p>
      </li>
    </ul>
  </main>
</template>
<script>
import { db, auth, commentsCollection } from '@/utils/firestoreConfig'
import {
  doc,
  getDoc,
  Timestamp,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore/lite'
import { commentSchema } from '@/utils/validation'
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
import { usePlayerStore } from '@/stores/player'

export default {
  name: 'Song',

  data() {
    return {
      song: {},
      commentSchema,
      isError: false,
      comments: [],
      sortOrder: 'desc',
    }
  },
  async created() {
    try {
      const docRef = doc(db, 'songs', this.$route.params.id)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        this.$router.push('/')
        return
      }

      this.song = docSnap.data()
      await this.getComments()
    } catch (error) {
      console.log(error)
    }

    const { sort } = this.$route.query

    if (sort === 'asc' || sort === 'desc') {
      this.sortOrder = sort
    }
  },
  methods: {
    ...mapActions(usePlayerStore, ['newSong']),
    async addComment(values, actions) {
      try {
        const comment = {
          content: values.commentText,
          datePosted: Timestamp.fromDate(new Date()),
          songId: this.$route.params.id,
          author: auth.currentUser.displayName,
          uid: auth.currentUser.uid,
        }

        await addDoc(commentsCollection, comment)

        actions.resetForm()
        await this.getComments()
      } catch (error) {
        console.log(error)
      }
    },

    async getComments() {
      const nextQuery = query(
        commentsCollection,
        where('songId', '==', this.$route.params.id)
      )

      const snapshots = await getDocs(nextQuery)
      this.comments = []
      snapshots.forEach((snap) => {
        this.comments.push({
          ...snap.data(),
          datePosted: snap.data().datePosted.toDate(),
          docId: snap.id,
        })
      })
    },
  },

  computed: {
    ...mapState(useUserStore, ['userLoggedIn', 'playing']),
    ...mapState(usePlayerStore, ['playing']),
    sortedComments() {
      return [...this.comments].sort((a, b) => {
        if (this.sortOrder === 'desc') {
          return new Date(b.datePosted) - new Date(a.datePosted)
        } else {
          return new Date(a.datePosted) - new Date(b.datePosted)
        }
      })
    },
  },
  watch: {
    sortOrder(newVal) {
      console.log(newVal)
      this.$router.push({ query: { sort: newVal } })
    },
  },
}
</script>
<style></style>
