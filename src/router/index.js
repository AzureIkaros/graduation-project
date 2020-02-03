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

const adminOption = [
    {
        path:"/admin/console",
        name:"console",
        components:{
            "header":()=>import("../components/admin/Header"),
            "tab":()=>import("../components/admin/Tab"),
        },
        children:[
            {
                path:"/admin/console/forgetPassword",
                name:"forgetPassword",
                component:()=>import("../components/admin/show/ForgetPassword")
            }
        ]
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
  },
  {
    path:"/admin/oTable",
    name:"option",
    component:()=>import("../views/AdminOption"),
    redirect:{name:'console'},
    children:adminOption
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
