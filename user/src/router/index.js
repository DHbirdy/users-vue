import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/Index";
import List from "../components/user/List";
import Reserve from "../components/order/Reserve";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index'
    },
    {
      path:'/index',
      component: Index
    },
    {
      path:'/user',
      component: List
    },
    {
      path: '/reserve',
      component: Reserve
    }
  ]
})
