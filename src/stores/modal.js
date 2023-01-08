import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false);

  const hiddenClass = computed(() => (!isOpen.value ? 'hidden' : ''));

  function toggleIsOpen() {
    isOpen.value = !isOpen.value;
  }

  return { isOpen, toggleIsOpen, hiddenClass };
});
