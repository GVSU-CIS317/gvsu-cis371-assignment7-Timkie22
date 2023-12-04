import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";
import Book from "./Book.vue";
import Kitchenware from "./Kitchenware.vue";
import Music from "./Music.vue";
import Login from './Login.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
  {
    path: "/login",
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: "/",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/books",
    component: Book,
    meta: { requiresAuth: true }
  },
  {
    path: "/kitchenware",
    component: Kitchenware,
    meta: { requiresAuth: true }
  },
  {
    path: "/music",
    component: Music,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const auth = getAuth();
  
  onAuthStateChanged(auth, (user) => {
    if (requiresAuth && !user) {
      next('/login');
    } else if (!requiresAuth && user) {
      next('/');
    } else {
      next();
    }
  });
});

export default router;
