const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'Index', path: '/index', component: () => import('pages/Index.vue') },
      {
        name: 'Account',
        path: '/user/account/profile',
        component: () => import('../pages/Account.vue'),
      },
      {
        path: '/user/account/payment',
        component: () => import('../pages/Account.vue'),
      },
      {
        path: '/user/account/address',
        component: () => import('../pages/Account.vue'),
      },
      {
        path: '/user/account/password',
        component: () => import('../pages/Account.vue'),
      },
      {
        name: 'Login',
        path: '/auth/login',
        component: () => import('../pages/Authentication/Login.vue'),
      },
      {
        name: 'Register',
        path: '/auth/register',
        component: () => import('../pages/Authentication/Register.vue'),
      },
    ],
  },
  // {
  //   name: 'Login',
  //   path: '/auth/login',
  //   component: () => import('../pages/Authentication/Login.vue'),
  // },
  // {
  //   name: 'Register',
  //   path: '/auth/register',
  //   component: () => import('../pages/Authentication/Register.vue'),
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
