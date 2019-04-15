import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home";
import Board from "../pages/Board";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/board",
      component: Board
    }
  ],
  // mode: "history"
});
