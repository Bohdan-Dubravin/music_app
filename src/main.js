import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VeeValidate from './utils/validation';

import App from './App.vue';
import router from './router';

import './assets/base.css';
import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VeeValidate);

app.mount('#app');
