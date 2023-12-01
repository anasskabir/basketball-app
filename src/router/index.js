import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../pages/layout/DefaultLayout.vue";
import Home from "../pages/Home.vue";
import TeamDetails from "../pages/TeamDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: Home,
        },
        {
          path: "teams/:id",
          name: "teamDetails",
          component: TeamDetails,
        },
      ],
    },
  ],
});

export default router;
