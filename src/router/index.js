import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '/',
    component: () => import ('../views/IndexPage.vue'),
    children: [
      {
        path: '/home',
        component: () => import ('../views/HomePage.vue'),
      },
      {
        path: '/teams',
        component: () => import ('../views/TeamsPage.vue'),
      },
      {
        path: '/games',
        component: () => import ('../views/GamesPage.vue'),
      },
      {
        path: '/profile',
        component: () => import ('../views/ProfilePage.vue')
      },
    ]
  },
  {
    path: '/login',
    component: () => import ('../views/LoginPage.vue')
  },
  {
    path: '/register',
    component: () => import ('../views/RegisterPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
