import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/Login.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/Login', // 登入頁
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  next();
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   if (cookies.get('dev-id-token-str')) {
  //     next();
  //   } else {
  //     next({ name: 'Login' })
  //   }
  // } else {
  //   next();
  // }
})
export default router;
