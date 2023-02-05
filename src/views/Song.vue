<template>
  <main class="mx-auto max-w-[1216px]">
    <h1 class="mt-6 uppercase font-bold text-5xl text-white max-w-[500px]">
      Listen and leave a comment to your favorite song
    </h1>
    <section class="mb-8 py-14">
      <div class="flex items-center">
        <div class="w-[416px] h-[416px] mr-[80px]">
          <img
            class="w-full h-full rounded-[10px]"
            :src="song.songImage"
            alt="song-image"
          />
        </div>
        <div class="grow">
          <!-- Play/Pause Button -->
          <div class="flex items-center">
            <button
              @click.prevent="newSong(song)"
              type="button"
              class="z-20 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
            >
              <i
                class="fa"
                :class="
                  playing && currentSong.url === song.url
                    ? 'fa-pause'
                    : 'fa-play'
                "
              ></i>
            </button>
            <div class="text-left ml-8">
              <!-- Song Info -->
              <p class="text-3xl text-gray-200 font-bold">
                {{ song.modifiedName }}
              </p>
              <p class="text-gray-200 italic">{{ song.genre }}</p>
            </div>
          </div>
          <FormComment
            :songId="song.songId"
            :getComments="getComments"
            v-if="userLoggedIn"
          />

          <h2
            v-else
            class="bg-[rgba(14,13,14,0.12)] text-gray-200 rounded-xl p-4 mt-6 font-bold cursor-pointer"
            @click.prevent="toggleIsOpen"
          >
            Sign In to add a comment
          </h2>
        </div>
      </div>
    </section>
    <section id="comments" class="container mx-auto mt-6">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-600">
        <!-- Comment Count -->
        <span class="card-title text-gray-200"
          >Comments ({{ comments.length || 0 }})</span
        >
        <i class="fa fa-comments float-right text-gray-400 text-2xl"></i>
      </div>
      <select
        v-model="sortOrder"
        class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="desc">Latest</option>
        <option value="asc">Oldest</option>
      </select>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        v-for="comment in sortedComments"
        :key="comment.docId"
        class="p-4 bg-zinc-900 r mb-2 rounded-xl"
      >
        <!-- Comment Author -->
        <div class="mb-2">
          <h4 class="font-bold text-gray-200">{{ comment.author }}</h4>
          <time class="italic text-sm text-gray-200">{{
            comment.datePosted
          }}</time>
        </div>
        <p class="text-gray-200">{{ comment.content }}</p>
      </li>
    </ul>
  </main>
</template>
<script>
import { db, commentsCollection } from '@/utils/firestoreConfig';
import { doc, getDoc, getDocs, query, where } from 'firebase/firestore/lite';
import { commentSchema } from '@/utils/validation';
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '@/stores/user';
import FormComment from '@/components/FormComment.vue';
import { useImageStore } from '@/stores/bgImage';
import { usePlayerStore } from '@/stores/player';
import { useModalStore } from '@/stores/modal';

export default {
  name: 'Song',
  components: { FormComment },
  data() {
    return {
      song: {},
      commentSchema,
      isError: false,
      comments: [],
      sortOrder: 'desc',
    };
  },
  async created() {
    try {
      const docRef = doc(db, 'songs', this.$route.params.id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        this.$router.push('/');
        return;
      }

      this.song = docSnap.data();
      console.log(this.song);
      this.changeImage(this.song.songImage);

      await this.getComments();
    } catch (error) {
      console.log(error);
    }

    const { sort } = this.$route.query;

    if (sort === 'asc' || sort === 'desc') {
      this.sortOrder = sort;
    }
  },
  methods: {
    ...mapActions(usePlayerStore, ['newSong']),
    ...mapActions(useImageStore, ['changeImage']),
    ...mapActions(useModalStore, ['toggleIsOpen']),

    async getComments() {
      const nextQuery = query(
        commentsCollection,
        where('songId', '==', this.$route.params.id)
      );

      const snapshots = await getDocs(nextQuery);
      this.comments = [];
      snapshots.forEach((snap) => {
        this.comments.push({
          ...snap.data(),
          datePosted: snap.data().datePosted.toDate().toLocaleTimeString(),
          docId: snap.id,
        });
      });
    },
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn', 'playing']),
    ...mapState(usePlayerStore, ['playing', 'currentSong']),
    sortedComments() {
      return [...this.comments].sort((a, b) => {
        if (this.sortOrder === 'desc') {
          return new Date(b.datePosted) - new Date(a.datePosted);
        } else {
          return new Date(a.datePosted) - new Date(b.datePosted);
        }
      });
    },
  },

  watch: {
    sortOrder(newVal) {
      this.$router.push({ query: { sort: newVal } });
    },
  },
};
</script>
<style></style>
