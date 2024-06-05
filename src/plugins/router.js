import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../components/Home.vue'
import Game1 from '../components/Solitaire.vue'
import Game2 from '../components/Memory.vue'
import Game3 from '../components/GuessTheSound.vue'
import GuessTheFlag from '../components/GuessTheFlag.vue'

const routes = [
  { path: '/', name:"Home", component: HomeView },
  { path: '/game1', name:"Game1", component: Game1 },
  { path: '/game2', name:"Game2", component: Game2 },
  { path: '/game3', name:"Game3", component: Game3 },
  {path: '/game4', name:"Game4", component: GuessTheFlag}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;