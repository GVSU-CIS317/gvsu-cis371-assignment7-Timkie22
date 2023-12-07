import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";
import Book from "./Book.vue";
import Kitchenware from "./Kitchenware.vue";
import Music from "./Music.vue";
import Login from "./Login.vue";
import { getAuth } from 'firebase/auth';

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

router.beforeEach((to) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const auth = getAuth();
  const user = auth.currentUser;

  if (requiresAuth && !user) {
    return '/login';
  } else if (!requiresAuth && user) {
    return '/';
  }
});


export default router;
