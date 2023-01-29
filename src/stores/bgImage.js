import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useImageStore = defineStore('bgImage', () => {
  const imageUrl = ref('');

  function changeImage(url) {
    imageUrl.value = url;
  }

  return { imageUrl, changeImage };
});
