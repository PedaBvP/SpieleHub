import {createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue'
import Solitaire from '../components/Solitaire.vue'
import Memory from '../components/Memory.vue'
import GuessTheSound from '../components/GuessTheSound.vue'
import GuessTheFlag from '../components/GuessTheFlag.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name:"Home", component: Home },
  { path: '/home/solitaire', name:"Solitaire", component: Solitaire },
  { path: '/home/memory', name:"Memory", component: Memory },
  { path: '/home/guessthesound', name:"GuessTheSound", component: GuessTheSound },
  {path: '/home/guesstheflag', name:"GuessTheFlag", component: GuessTheFlag}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;