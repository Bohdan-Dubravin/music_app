import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useImageStore = defineStore('bgImage', () => {
  const firstImageUrl = ref('')
  const secondImageUrl = ref('')
  const currentImg = ref(1)

  function changeImage(url) {
    currentImg.value = currentImg.value === 1 ? 0 : 1
    if (currentImg.value === 1) {
      firstImageUrl.value = url
    } else {
      secondImageUrl.value = url
    }
  }

  return { firstImageUrl, secondImageUrl, changeImage, currentImg }
})
