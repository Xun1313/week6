import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      name: 'nav',
      component: () => import(/* webpackChunkName: "nav" */ './views/nav.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import(/* webpackChunkName: "home" */ './views/home.vue'),
        },
        {
          path: 'room/:id',
          name: 'room',
          component: () => import(/* webpackChunkName: "room" */ './views/room.vue'),
        },
        {
          path: 'buy-record/:item',
          name: 'buy-record',
          component: () => import(/* webpackChunkName: "buy-record" */ './views/buy-record.vue'),
          //meta: { requiresAuth: true },
        },
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ './views/login.vue'),
          //meta: { requiresAuth: true },
        },
        {
          path: '/signup',
          name: 'signup',
          component: () => import(/* webpackChunkName: "signup" */ './views/signup.vue'),
         // meta: { requiresAuth: true },
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});
