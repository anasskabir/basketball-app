import { createRouter, createWebHistory } from "vue-router";

// Importing Vue components to be used as page layouts and views.
import DefaultLayout from "../pages/layout/DefaultLayout.vue";
import Home from "../pages/Home.vue";
import TeamDetails from "../pages/TeamDetails.vue";

// Creating the router instance using createRouter.
const router = createRouter({
  // The history mode for the router. Using createWebHistory for modern browser history API.
  history: createWebHistory(import.meta.env.BASE_URL),

  // Defining routes
  routes: [
    {
      
      path: "/", 

      component: DefaultLayout, // component for the root path.

      children: [
        {
          // child route for the homepage.
          path: "/",
          name: "home",
          component: Home,
        },
        {
          // dynamic child route for team details, with :id as a route parameter.
          path: "teams/:id",
          name: "teamDetails",
          component: TeamDetails,
        },
      ],
    },
  ],
});

export default router;
