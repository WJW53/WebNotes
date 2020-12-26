import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home';
import auth from './utils/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    // alias: '/',
  },
  {
    path: '/learn',
    // component: () => import('./views/Learn'),
    components: {
      default: () => import('./views/Learn'),
      student: () => import('./views/Student'),
    },
  },
  {
    path: '/student',
    component: () => import('./views/Student'),
  },
  {
    path: '/about',
    component: () => import('./views/About'),
    beforeEnter (to, from, next) {
      next();
    },
    meta: {
      requiresLogin: true,
      backAsk: true,
    },
  },
  {
    path: '/activity',
    component: () => import(/* webpackChunkName: 'academic' */'./views/Activity'),
    redirect (to) {
      return {
        name: 'academic',
      }
    },
    meta: {
      requiresLogin: true,
      backAsk: true,
    },
    children: [
      // {
      //   path: '',
      //   component: () => import('./views/Academic'),
      // },
      {
        path: 'academic',
        name: 'academic',
        component: () => import(/* webpackChunkName: 'academic' */'./views/Academic'),
      },
      {
        path: 'personal',
        name: 'personal',
        component: () => import('./views/Personal'),
      },
      {
        path: 'download',
        name: 'download',
        component: () => import('./views/Download'),
      },
    ],
  },
  {
    path: '/course/:userId',
    component: () => import('./views/About'),
  },
  {
    path: '/question/:id',
    name: 'question',
    // props: true,
    props: route => ({
      // name: route.name,
      id: route.params.id 
    }),
    component: () => import('./views/Question'),
  },
  {
    path: '/login',
    component: () => import('./views/Login'),
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const isRequiresLogin = to.matched.some(item => item.meta.requiresLogin);
  //to里面的matched就是包含了它的祖先路由对象的信息
  if(isRequiresLogin) {
    // const isLogin = document.cookie.includes('login=true');
    const isLogin = auth.isLogin();
    if(isLogin) {
      next();
    } else {
      const isToLogin = window.confirm('要登录后才可以浏览，要去登录吗？');

      isToLogin ? next('/login') : next(false);
    }
  } else {
    next();
  }

  // const isBackAsk = from.meta.backAsk;//它不需要拿到所有的祖先路由去判断是否回退
});

export default router;