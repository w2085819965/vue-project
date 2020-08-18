import Vue from "vue"
import Router from "vue-router"

const Home =()=>import("views/home/Home.vue")
const Market =()=>import("views/market/Market.vue")
const CateGroy =()=>import("views/category/CateGory.vue")
const ProFile =()=>import("views/profile/ProFile.vue")
const Detail =()=>import("views/detail/Detail.vue")

Vue.use(Router)

const routes=[
    {
        path:"/",
        redirect:"/home",
    },
    {
        path:"/home",
        component:Home,
        meta:{ index:0 }
    },
    {
        path:"/categroy",
        component:CateGroy,
        meta:{ index:1 }
    },
    {
        path:"/market",
        component:Market,
        meta:{ index:2 ,requireAuth:true}   
        //我们需要让market组件进行权限验证  requireAuth可以任意命名
        //验证规则是 如果购物车中有数据 就可以访问market组件 即通过验证
    },
    
    {
        path:"/profile",
        component:ProFile,
        meta:{ index:3 }
    },

    {
        path:"/detail/:iid",
        component:Detail,
        meta:{ index:4 }
    }

]

const router = new Router({
    mode:"history",
    routes
})

//路由守卫
// 监听路由的跳转 只要监听到路由跳转 就会触发回调函数
router.beforeEach((to, from, next) => {
    if(to.meta.requireAuth){    //如果需要验证 就进行验证
        if(localStorage.getItem('products')){   //如果获取到数据
            next()
        }else{      //没有通过验证 直接跳转到 home
            next('/home')
        }
    }else{
        next()
    }    
})


export default router