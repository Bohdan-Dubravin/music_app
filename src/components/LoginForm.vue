<template>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block text-white mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block bg-gray-700 w-full border border-transparent py-1.5 px-3 text-white transition duration-500 focus:outline-none focus:border-gray-300 rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block text-white mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="block bg-gray-700 w-full border border-transparent py-1.5 px-3 text-white transition duration-500 focus:outline-none focus:border-gray-300 rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full mb-4 bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Login
    </button>
  </vee-form>
  <button
    @click.prevent="googleLogin"
    type="submit"
    class="text-center relative w-full bg-[#4285f4] text-white font-bold py-[12px] px-4 rounded transition hover:bg-[#3874d3]"
  >
    <img
      src="/assets/img/Google_Logo.svg"
      alt="google-logo"
      class="bg-white p-[5px] rounded absolute top-[7px] left-2"
    />
    Sign in with Google
  </button>
</template>
<script>
import { loginSchema } from '../utils/validation'
import { mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useModalStore } from '@/stores/modal'

export default {
  name: 'LoginComponent',
  data() {
    return {
      loginSchema,
    }
  },

  methods: {
    ...mapActions(useUserStore, ['authenticate', 'googleAuthenticate']),
    ...mapActions(useModalStore, ['toggleIsOpen']),
    async login(values) {
      try {
        await this.authenticate(values)
        this.toggleIsOpen()
      } catch (error) {
        console.log(error)
      }
    },
    async googleLogin() {
      try {
        await this.googleAuthenticate()
        this.toggleIsOpen()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style></style>
