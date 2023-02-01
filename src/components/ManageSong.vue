<template>
  <div class="border border-zinc-700 p-3 mb-4 rounded-lg">
    <div v-if="!showForm">
      <h4 class="inline-block text-lg font-bold text-gray-200">
        {{ song.modifiedName }}
      </h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
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
      <vee-form
        :validation-schema="songSchema"
        @submit="editSong"
        :initial-values="song"
      >
        <div class="mb-3">
          <label class="inline-block mb-2 text-zinc-500">Song Title</label>
          <vee-field
            type="text"
            name="modifiedName"
            class="block w-full py-1.5 px-3 text-zinc-400 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modifiedName" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2 text-zinc-500">Genre</label>
          <vee-field
            type="text"
            name="genre"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="block text-red-600" name="genre" />

          <input
            v-if="!songImage"
            type="file"
            name="file"
            id="fileInput"
            class="hidden-input"
            @change="addImg"
            ref="file"
            accept=".pdf,.jpg,.jpeg,.png"
          />

          <div class="w-[200px] h-[200px]">
            <img
              v-if="songImage"
              :src="songImage"
              alt="songImage"
              class="w-full h-full object-cover object-center"
            />
          </div>
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
import { deleteDoc, doc, updateDoc } from 'firebase/firestore/lite'
import { db, storage } from '@/utils/firestoreConfig'
import {
  deleteObject,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@firebase/storage'
export default {
  name: 'SongItem',
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
    },
  },

  data() {
    return {
      songSchema,
      showForm: false,
      songImage: null,
      imageData: null,
    }
  },
  methods: {
    addImg(event) {
      this.imageData = event.target.files[0]

      let input = this.$refs.file
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader()
        reader.onload = (e) => {
          this.songImage = e.target.result
        }
        reader.readAsDataURL(file[0])
      }
    },

    async editSong(values) {
      const newValues = values

      try {
        if (this.songImage) {
          const storageRef = ref(storage, `images/${this.imageData.name}`)
          const uploadTask = await uploadBytesResumable(
            storageRef,
            this.imageData
          )
          newValues.songImage = await getDownloadURL(storageRef)
        }

        const songRef = doc(db, 'songs', this.song.songId)
        await updateDoc(songRef, newValues)
      } catch (error) {
        console.log(error)
        return
      }

      this.updateSong(this.index, newValues)
      this.showForm = false
      this.updateUnsavedFlag(false)
    },
    async deleteSong() {
      try {
        const storageRef = ref(storage, `songs/${this.song.originalName}`)
        await deleteObject(storageRef)

        await deleteDoc(doc(db, 'songs', this.song.songId))

        this.$emit('deleteSong', this.song.songId)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style lang=""></style>
