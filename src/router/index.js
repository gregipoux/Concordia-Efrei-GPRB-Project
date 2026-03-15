import { createRouter, createWebHistory } from 'vue-router'
import GaragePage from '../pages/GaragePage.vue'
import BoardPage from '../pages/BoardPage.vue'
import CrewPage from '../pages/CrewPage.vue'
import IntelPage from '../pages/IntelPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import SignInPage from '../pages/SignInPage.vue'

const routes = [
  { path: '/', redirect: '/signin' },
  { path: '/signin', name: 'signin', component: SignInPage },
  { path: '/board', name: 'board', component: BoardPage },
  { path: '/crew', name: 'crew', component: CrewPage },
  { path: '/garage', name: 'garage', component: GaragePage },
  { path: '/intel', name: 'intel', component: IntelPage },
  { path: '/profile', name: 'profile', component: ProfilePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router