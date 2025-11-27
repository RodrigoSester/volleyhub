import { createRouter, createWebHistory } from '@ionic/vue-router';
import { isAuthenticated } from '../config/axios.config';

const routes = [
  {
    meta: { auth: true },
    path: '/',
    redirect: '/home',
    component: () => import ('../views/IndexPage.vue'),
    children: [
      {
        meta: { auth: true },
        path: '/home',
        name: 'home',
        component: () => import ('../views/HomePage.vue'),
      },
      {
        meta: { auth: true },
        path: '/teams',
        name: 'teams',
        component: () => import ('../views/TeamsPage.vue'),
      },
      {
         meta: { auth: true },
         path: '/matches',
          name: 'matches',
         component: () => import ('../views/GamesPage.vue'),
       },
      {
        meta: { auth: true },
        path: '/profile',
        name: 'profile',
        component: () => import ('../views/ProfilePage.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import ('../views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import ('../views/RegisterPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authenticated = await isAuthenticated();

  if (to.matched.some(record => record.meta.auth) && !authenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router
