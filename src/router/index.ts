import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home.vue"
import {App} from "vue";

const router=createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:"/",name:"Home",component:Home
        }
    ]
})

export default router

export const setupRouter=(app:App)=>{
    app.use(router)
}