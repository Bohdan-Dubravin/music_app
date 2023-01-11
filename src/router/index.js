import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Manage from '@/views/Manage.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/manage', alias: '/manage-music', component: Manage },
  { path: '/:catchAll(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

export default router;
