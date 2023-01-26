import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Howl } from 'howler';
import timeFormat from '@/utils/timeFormat';

export const usePlayerStore = defineStore('player', () => {
  const currentSong = ref({});
  const sound = ref({});
  const seek = ref('00:00');
  const duration = ref('00:00');
  const playerProgress = ref('0%');

  const newSong = async (song) => {
    if (sound.value instanceof Howl) {
      sound.value.unload();
    }

    currentSong.value = song;

    sound.value = new Howl({ src: [song.url], html5: true });
    sound.value.play();
    sound.value.on('play', () => {
      requestAnimationFrame(progress);
    });
  };

  const toggleAudio = async () => {
    if (!sound.value.playing) {
      return;
    }
    if (sound.value.playing()) {
      sound.value.pause();
    } else {
      sound.value.play();
    }
  };
  const progress = () => {
    seek.value = timeFormat.formatTime(sound.value.seek());
    duration.value = timeFormat.formatTime(sound.value.duration());

    playerProgress.value = `${
      (sound.value.seek() / sound.value.duration()) * 100
    }%`;

    if (sound.value.playing()) {
      requestAnimationFrame(progress);
    }
  };

  const playing = computed(() => {
    if (sound.value.playing) {
      return sound.value.playing();
    }

    return false;
  });

  return {
    newSong,
    toggleAudio,
    playing,
    seek,
    duration,
    playerProgress,
    currentSong,
  };
});
