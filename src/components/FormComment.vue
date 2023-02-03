<template>
  <div class="bg-zinc-900 rounded-xl relative flex flex-col p-6 mt-10">
    <h2 v-show="isError" class="bg-red-600 text-white rounded p-3">
      Fail to add a comment
    </h2>
    <vee-form :validation-schema="commentSchema" @submit="addComment">
      <vee-field
        as="textarea"
        rows="4"
        name="commentText"
        class="block bg-zinc-700 w-full border border-transparent py-1.5 px-3 text-white transition duration-500 focus:outline-none focus:border-gray-300 rounded resize-none"
        placeholder="Your comment here..."
      />
      <ErrorMessage class="text-red-600 block mb-2" name="commentText" />
      <button type="submit" class="py-1.5 px-3 mt-2 main-btn">
        Post Comment
      </button>
    </vee-form>
  </div>
</template>
<script>
import {
  Timestamp,
  addDoc,
  updateDoc,
  increment,
  doc,
} from 'firebase/firestore/lite'
import { commentSchema } from '@/utils/validation'
import { auth, commentsCollection, db } from '@/utils/firestoreConfig'
export default {
  name: 'FormComment',

  data() {
    return {
      commentSchema,
      isError: false,
    }
  },
  props: {
    getComments: {
      type: Function,
      required: true,
    },
    songId: {
      type: String,
      required: true,
    },
  },
  methods: {
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
        const songRef = doc(db, 'songs', this.songId)
        await updateDoc(songRef, { comment_count: increment(1) })
        actions.resetForm()
        await this.getComments()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style></style>
