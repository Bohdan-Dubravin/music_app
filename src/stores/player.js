import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Howl } from 'howler'

export const usePlayerStore = defineStore('player', () => {
  const currentSong = ref({})
  const sound = ref({})
  const seek = ref('00:00')
  const duration = ref('00:00')

  const newSong = async (song) => {
    currentSong.value = song

    sound.value = new Howl({ src: [song.url], html5: true })
    console.log(sound.value)
    sound.value.play()
    sound.value.on('play', () => {
      requestAnimationFrame(progress.value)
    })
  }

  const toggleAudio = async () => {
    if (!sound.value.playing) {
      return
    }
    if (sound.value.playing()) {
      sound.value.pause()
    } else {
      sound.value.play()
    }
  }
  const progress = () => {
    seek.value === sound.value.seek()
  }
  const playing = computed(() => {
    if (sound.value.playing) {
      return sound.value.playing()
    }

    return false
  })

  return { newSong, toggleAudio, playing, seek, duration }
})
