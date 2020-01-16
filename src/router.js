import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'nav',
      component: () => import(/* webpackChunkName: "nav" */ './views/nav.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () =>
            import(/* webpackChunkName: "home" */ './views/home.vue')
        },
        {
          path: 'room/:id',
          name: 'room',
          component: () =>
            import(/* webpackChunkName: "room" */ './views/room.vue')
        },
        {
          path: 'facility',
          name: 'facility',
          component: () =>
            import(/* webpackChunkName: "facility" */ './views/facility.vue')
        },
        {
          path: 'facility/:id',
          name: 'facilityDetail',
          component: () =>
            import(
              /* webpackChunkName: "facilityDetail" */ './views/facilityDetail.vue'
            )
        },
        {
          path: 'news',
          name: 'news',
          component: () =>
            import(/* webpackChunkName: "news" */ './views/news.vue')
        },
        {
          path: 'news/:id',
          name: 'newsDetail',
          component: () =>
            import(
              /* webpackChunkName: "newsDetail" */ './views/newsDetail.vue'
            )
          /* children: [
            {
              path: 'trip',
              name: 'trip',
              component: () => import(webpackChunkName: "trip" './components/news/trip.vue')
            },
            {
              path: 'protect',
              name: 'protect',
              component: () => import(webpackChunkName: "protect" './components/news/protect.vue')
            },
            {
              path: 'line',
              name: 'line',
              component: () => import(webpackChunkName: "line" './components/news/line.vue')
            }
            {
              path: 'trip',
              name: 'trip',
              component: () => import(webpackChunkName: "trip" './components/news/trip.vue')
            }
          ] */
        },
        {
          path: 'search',
          name: 'search',
          component: () =>
            import(/* webpackChunkName: "search" */ './views/search.vue')
        },
        {
          path: 'contact',
          name: 'contact',
          component: () =>
            import(/* webpackChunkName: "contact" */ './views/contact.vue')
        },
        {
          path: 'gallery',
          name: 'gallery',
          component: () =>
            import(/* webpackChunkName: "gallery" */ './views/gallery.vue')
        },
        {
          path: 'buy',
          name: 'buy',
          component: () =>
            import(/* webpackChunkName: "buy" */ './views/buy.vue')
        },
        {
          path: 'list',
          name: 'list',
          component: () =>
            import(/* webpackChunkName: "list" */ './views/list.vue')
        },
        {
          path: 'favorite',
          name: 'favorite',
          component: () =>
            import(/* webpackChunkName: "favorite" */ './views/favorite.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'purchase',
          name: 'purchase',
          component: () =>
            import(/* webpackChunkName: "purchase" */ './views/purchase.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'login',
          name: 'login',
          component: () =>
            import(/* webpackChunkName: "login" */ './views/login.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'signup',
          name: 'signup',
          component: () =>
            import(/* webpackChunkName: "signup" */ './views/signup.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () =>
            import(/* webpackChunkName: "dashboard" */ './views/dashboard.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
