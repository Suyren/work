import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import RanderUser from '@/views/RanderUser.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: "/RanderUser",
    name: "RanderUser",
    redirect: '/RanderUser/AllUser',
    component: RanderUser,
    children: [
      {
        path: "AllUser",
        name: "AllUser",
        component: () => import("@/views/RanderUser/AllUser.vue"),
      },
      {
        path: "MyFavorite",
        name: "MyFavorite",
        component: () => import("@/views/RanderUser/MyFavorite.vue"),
      },
    ]
  },
  
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
