import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import UsersList from '@/components/user/UsersList';
import UserCreateEdit from '@/components/user/UserCreateEdit';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/users',
      name: 'UsersList',
      component: UsersList
    },
      {
          path: '/users/create',
          name: 'UserCreateEdit',
          component: UserCreateEdit
      },
      {
          path: '/users/edit/:id',
          name: 'UserCreateEdit',
          component: UserCreateEdit
      }


  ]
})

