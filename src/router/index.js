import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: 'form',
    component: () => import('@/views/form.vue'),
  },
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
});

export default router;
