import { createRouter, createWebHistory } from '@ionic/vue-router';
import { isAuthenticated } from '../config/axios.config';

const routes = [
  {
    meta: { auth: true },
    path: '/',
    component: () => import ('../views/IndexPage.vue'),
    children: [
      {
        meta: { auth: true },
        path: '/home',
        component: () => import ('../views/HomePage.vue'),
      },
      {
        meta: { auth: true },
        path: '/teams',
        component: () => import ('../views/TeamsPage.vue'),
      },
      {
        meta: { auth: true },
        path: '/matches',
        component: () => import ('../views/GamesPage.vue'),
      },
      {
        meta: { auth: true },
        path: '/profile',
        component: () => import ('../views/ProfilePage.vue')
      },
    ]
  },
  {
    path: '/login',
    component: () => import ('../views/LoginPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authenticated = isAuthenticated();

  if (to.matched.some(record => record.meta.auth) && !authenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router
