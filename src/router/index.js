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
        redirect:{name:"spider"},
        children:[
            {
                path:"/admin/console/forgetPassword",
                name:"forgetPassword",
                component:()=>import("../components/admin/show/ForgetPassword")
            },
            {
                path:"/admin/console/spider",
                name:"spider",
                component:()=>import("../components/admin/show/Spider")
            },{
                path:"/admin/console/tablemanage",
                name:"tablemanage",
                component:()=>import("../components/admin/show/TableManage")
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
  },{
      path:'/result',
      name:"result",
      component:()=>import('../views/Result')
  },
  {
    path:"/admin/tableitem",
    name:"tableitem",
    component:()=>import("../components/admin/show/TableItem")
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
    //serach,result,login
    // console.log(to);
    // console.log(from)
    if(localStorage.getItem("token")){
        next()
    }else{
        switch(to.name){
            case "search":
            case "result":
            case "login":
                next();
                break;
            default:
                next({name:"login"})
        }
    }
    
})

export default router
