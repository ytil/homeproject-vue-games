import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/AppHomePage'
import Tictactoe from '../pages/TictactoeHomePage'
import TictactoeGameBoard from '../pages/TictactoeGameBoardPage'
import Balda from '../pages/BaldaGameBoardPage'

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
