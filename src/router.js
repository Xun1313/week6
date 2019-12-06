import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
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
          path: 'buy-record/:id',
          name: 'buy-record',
          component: () => import(/* webpackChunkName: "buy-record" */ './views/buy-record.vue'),
        },
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ './views/login.vue'),
        },
        {
          path: '/signup',
          name: 'signup',
          component: () => import(/* webpackChunkName: "signup" */ './views/signup.vue'),
        },
      ],
    },
  ],
});
