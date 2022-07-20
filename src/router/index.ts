import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home.vue"
import {App} from "vue";
import {getStayTime} from "@/Helper";

const router=createRouter({
    history:createWebHistory(),
    linkActiveClass:"active",
    routes:[
        {
            path:"/",name:"Home",component:Home
        }
    ]
})

export default router



export const setupRouter=(app:App)=>{
    router.beforeEach((to,from,next)=>{
        getStayTime(to,from,next)
    })
    app.use(router)
}