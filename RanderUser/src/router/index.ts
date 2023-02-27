import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
export const routes: RouteRecordRaw[] = [
  {
    path: "/RanderUser",
    name: "RanderUser",
    component: () => import("@/views/RanderUser.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
