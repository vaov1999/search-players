import Vue from "vue";
import VueRouter from "vue-router";
import Search from "../views/Search.vue";
import Player from "../views/Player.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Search",
    component: Search,
  },
  {
    path: "/players/:id",
    component: Player,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
