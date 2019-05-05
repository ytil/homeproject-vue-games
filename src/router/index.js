import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import Tictactoe from '../pages/Tictactoe'
import TictactoeGameBoard from '../pages/TictactoeGameBoard'
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
      path: '/tictactoe/board',
      component: TictactoeGameBoard,
    },
    {
      path: '/balda',
      component: Balda,
    },
  ],
})
