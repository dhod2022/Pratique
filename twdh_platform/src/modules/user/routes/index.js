export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/resetpass',
    name: 'ResetPass',
    component: () => import(/* webpackChunkName: "resetpass" */ '../views/ResetPass.vue')
  },
  {
    path: '/forgetpass',
    name: 'ForgetPass',
    component: () => import(/* webpackChunkName: "forgetpass" */ '../views/ForgetPass.vue')
  },
]