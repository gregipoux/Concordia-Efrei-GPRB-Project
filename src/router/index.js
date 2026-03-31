import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/AuthStore.js'
import AuthLayout from '../layouts/AuthLayout.vue'
import SignInPage from '../pages/SignInPage.vue'
import BoardPage from '../pages/BoardPage.vue'
import CrewPage from '../pages/CrewPage.vue'
import GaragePage from '../pages/GaragePage.vue'
import IntelPage from '../pages/IntelPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'

const routes = [
  { path: '/', redirect: '/board' },
  {
    path: '/signin',
    name: 'signin',
    component: SignInPage,
    meta: { guest: true },
  },
  {
    path: '/',
    component: AuthLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'board', name: 'board', component: BoardPage },
      { path: 'crew', name: 'crew', component: CrewPage },
      { path: 'garage', name: 'garage', component: GaragePage },
      { path: 'intel', name: 'intel', component: IntelPage },
      { path: 'profile', name: 'profile', component: ProfilePage },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'signin' }
  }

  if (to.meta.guest && auth.isAuthenticated) {
    return { name: 'board' }
  }
})

export default router
