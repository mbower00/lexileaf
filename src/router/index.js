import { createRouter, createWebHistory } from "vue-router";
import ExploreView from "../views/ExploreView.vue";
import PracticeView from "../views/PracticeView.vue";

const routes = [
  {
    path: "/",
    name: "explore",
    component: ExploreView,
  },
  {
    path: "/practice",
    name: "practice",
    component: PracticeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
