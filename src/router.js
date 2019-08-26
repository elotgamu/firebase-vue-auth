import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Dashboard from './views/Dashboard.vue';
import SignUp from './views/SignUp.vue';
import Login from './views/Login.vue';

import store from './store';

Vue.use(Router);

const routes = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});

routes.beforeEach((to, from, next) => {
  if (to.meta.requiresLogin && !store.getters.isAuthenticated) {
    // console.log('Auth', store.getters.isAuthenticated);
    // console.log('This view requires the user to be authenticated');
    next('/login');
  } else {
    next();
  }
});

export default routes;
