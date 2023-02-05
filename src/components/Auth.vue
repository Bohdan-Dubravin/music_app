<template>
  <div
    v-if="!user.userLoggedIn && store.isOpen"
    class="fixed z-10 min-h-screen inset-0 overflow-y-auto flex align-middle items-center"
    :class="store.hiddenClass"
    id="modal"
  >
    <div class="flex items-end justify-center mx-auto text-center">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->

      <div
        class="inline-block align-bottom min-w-[300px] md:min-w-[400px] bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="p-6 text-left">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl text-white font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div
              class="modal-close cursor-pointer z-50"
              @click="store.toggleIsOpen"
            >
              <i class="fas fa-times text-white"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center first:mr-3">
              <a
                class="block rounded py-3 px-4 transition"
                :class="{
                  'hover:bg-[rgba(185,141,221,0.12)] font-bold text-[#d6a4ff] bg-[rgba(214,164,255,0.12)]':
                    tab === 'login',
                  'bg-[rgba(131,129,129,0.12)] font-bold text-white':
                    tab === 'register',
                }"
                href="#"
                @click.prevent="changeTab('login')"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                href="#"
                :class="{
                  'hover:bg-[rgba(185,141,221,0.12)] font-bold text-[#d6a4ff] bg-[rgba(214,164,255,0.12)]':
                    tab === 'register',
                  'bg-[rgba(131,129,129,0.12)] font-bold text-white':
                    tab === 'login',
                }"
                @click.prevent="changeTab('register')"
                >Register</a
              >
            </li>
          </ul>
          <login-form v-if="tab === 'login'" />
          <register-form v-if="tab === 'register'" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';

export default {
  name: 'Auth',
  components: { LoginForm, RegisterForm },
  setup() {
    const store = useModalStore();
    const user = useUserStore();
    const tab = ref('login');

    function changeTab(tabName) {
      tab.value = tabName;
    }

    return {
      store,
      tab,
      changeTab,
      user,
    };
  },
};
</script>
<style></style>
