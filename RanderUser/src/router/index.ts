import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
export const routes: RouteRecordRaw[] = [
  {
    path: "/RanderUser",
    name: "RanderUser",
    component: () => import("@/views/RanderUser.vue"),
  },
  {
    path: "/NestedKey",
    name: "NestedKey",
    component: () => import("@/views/NestedKey.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
