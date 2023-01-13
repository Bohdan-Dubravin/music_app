<template lang="">
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-if="!showForm">
      <h4 class="inline-block text-2xl font-bold">Song Name</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-if="showForm">
      <vee-form :validation-schema="songSchema" @submit="editSong">
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            type="text"
            name="modifiedName"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
          />
          <ErrorMessage class="text-red-600" name="modifiedName" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            type="text"
            name="genre"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          @click.prevent="showForm = !showForm"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>
<script>
import { songSchema } from '@/utils/validation'
import { collection, doc, updateDoc } from 'firebase/firestore/lite'
import { auth, db } from '@/utils/firestoreConfig'
export default {
  name: 'SongItem',
  props: {
    song: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      songSchema,
      showForm: false,
    }
  },
  methods: {
    async editSong(values) {
      try {
        const songRef = doc(db, 'songs', this.song.songId)
        await updateDoc(songRef, values)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style lang=""></style>
