import Vue from 'vue'
import VueRouter from 'vue-router'

import Search from "../views/Search"
import Footer from "../components/search/Footer"


Vue.use(VueRouter)

const adminChild = [
  {
    path:'/admin/login',
    name:'login',
    component:()=>import("../components/admin/Login")
  }
]

const routes = [
  {
    path:'/',
    name:'search',
    components:{
      default:Search,
      'footer':Footer
    }
  },
  {
    path:'/admin',
    name:'admin',
    component:()=>import("../views/Admin"),
    redirect:{name:'login'},
    children:adminChild
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
