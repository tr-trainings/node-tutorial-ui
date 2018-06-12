import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import UserManager from '@/components/UserManager'
// import Auth from '@okta/okta-vue'

// Vue.use(Auth, {
//   issuer: 'https://dev-146901.oktapreview.com/oauth2/default',
//   client_id: '0oafftm8ytrqJxMCX0h7',
//   redirect_uri: 'http://localhost:8080/implicit/callback',
//   scope: 'openid profile email'
// })

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    // {
    //   path: '/implicit/callback',
    //   component: Auth.handleCallback()
    // },
    {
      path: '/user-manager',
      name: 'UserManager',
      component: UserManager,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

// router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
