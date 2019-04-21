import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import Tictactoe from '../pages/Tictactoe'
import Board from '../pages/Board'
import Balda from '../pages/Balda'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/tictactoe',
      component: Tictactoe,
    },
    {
      path: '/board',
      component: Board,
    },
    {
      path: '/balda',
      component: Balda,
    },
  ],
})
