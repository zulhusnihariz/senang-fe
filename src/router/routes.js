const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      if (!!JSON.parse(localStorage.getItem('isAuthenticated'))) {
        next();
      } else {
        next({ path: '/auth/login' });
      }
    },
    children: [
      {
        name: 'Account-Profile',
        path: '/user/account/profile',
        component: () => import('../pages/Account.vue'),
      },
      {
        name: 'Account-Payment',
        path: '/user/account/payment',
        component: () => import('../pages/Account.vue'),
      },
      {
        name: 'Account-Address',
        path: '/user/account/address',
        component: () => import('../pages/Account.vue'),
      },
      {
        name: 'Account-Password',
        path: '/user/account/password',
        component: () => import('../pages/Account.vue'),
      },
      {
        name: 'Store-ProductList',
        path: '/user/product',
        component: () => import('../pages/Store.vue'),
      },
    ],
  },
  {
    name: 'Login',
    path: '/auth/login',
    component: () => import('../pages/Authentication/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (!!JSON.parse(localStorage.getItem('isAuthenticated'))) {
        next({ name: 'Home' });
        // next();
      } else {
        next();
      }
    },
  },
  {
    name: 'Register',
    path: '/auth/register',
    component: () => import('../pages/Authentication/Register.vue'),
  },
  {
    name: 'Cart',
    path: '/testing/cart',
    component: () => import('../pages/Store/Cart.vue'),
  },

  // {
  //   beforeRouteEnter(to, from, next) {
  //     const notAuthRoutes = ['Login', 'Register'];

  //     console.log('hello');

  //     if (JSON.parse(localStorage.getItem('isAuthenticated'))) {
  //       connsole.log('beforeRouteEnter top');
  //       const isLoginOrRegister = notAuthRoutes.some(el === to.name);

  //       if (isLoginOrRegister) next({ name: 'Home' });
  //       else next();
  //     } else {
  //       connsole.log('beforeRouteEnter bottom');

  //       next({ name: 'Login' });
  //     }
  //   },
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
