import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home.vue"
import Editor from "@/views/Editor.vue"
import Setting from "@/views/Settting.vue"
import Info from "@/components/Setting/Info.vue"
import General from "@/components/Setting/General.vue"
import Appearance from "@/components/Setting/Appearance.vue"
import WorkSpace from "@/components/WorkSpace/WorkSpace.vue"
import Shortcut from "@/components/Setting/ShortCut.vue"
import {App} from "vue";
import {getStayTime} from "@/Helper";

const router=createRouter({
    history:createWebHistory(),
    linkActiveClass:"active",
    routes:[
        {
            path:"/",name:"Home",component:WorkSpace
        },
        { path: "/WorkSpace", name: "WorkSpace", component: WorkSpace },
        { path: "/Editor", name: "EditorPage", component: Editor },
        {
            path: "/Setting", name: "Setting", component: Setting,
            children: [
                { path: 'Info', component: Info },
                { path: 'General', component: General },
                { path: 'Appearance', component: Appearance },
                { path: 'Shortcut', component: Shortcut }
            ],
        },
    ]
})

export default router


export const setupRouter=(app:App)=>{
    router.beforeEach((to,from,next)=>{
        getStayTime(to,from,next)
    })
    app.use(router)
}