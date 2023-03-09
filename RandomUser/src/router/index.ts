import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import RandomUser from '@/views/RandomUser.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: "/RandomUser",
    name: "RandomUser",
    redirect: '/RandomUser/AllUser',
    component: RandomUser,
    children: [
      {
        path: "AllUser",
        name: "AllUser",
        component: () => import("@/views/RandomUser/AllUser.vue"),
      },
      {
        path: "MyFavorite",
        name: "MyFavorite",
        component: () => import("@/views/RandomUser/MyFavorite.vue"),
      },
    ]
  },
  
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
