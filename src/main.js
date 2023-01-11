import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VeeValidate from './utils/validation';
import { auth } from '@/utils/firestoreConfig';
import { onAuthStateChanged } from 'firebase/auth';
import App from './App.vue';
import router from './router';

import './assets/base.css';
import './assets/main.css';

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidate);

    app.mount('#app');
  }
});
