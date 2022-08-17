import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue"
import Editor from "@/views/Editor.vue"
import Setting from "@/views/Settting.vue"
import Jotting from "@/views/Jotting.vue"
import Trash from "@/views/Trash.vue"
import About from "@/components/Setting/About.vue"
import General from "@/components/Setting/General.vue"
import Appearance from "@/components/Setting/Appearance.vue"
import KeyboardShortcuts from "@/components/Setting/KeyboardShortcuts.vue"
import { App } from "vue";
import { getStayTime } from "@/util/Helper";

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: "active",
    routes: [
        { path: "/", name: "Home", component: Setting },
        { path: "/Editor", name: "EditorPage", component: Editor },
        { path: "/Jotting", name: "JottingPage", component: Jotting },
        { path: "/Trash", name: "TrashPage", component: Trash },
        {
            path: "/Setting", name: "Setting", component: Setting,
            children: [
                { path: 'About', component: About },
                { path: 'General', component: General },
                { path: 'Appearance', component: Appearance },
                { path: 'KeyboardShortcuts', component: KeyboardShortcuts }
            ],
        },
    ]
})

export default router


export const setupRouter = (app: App) => {
    router.beforeEach((to, from, next) => {
        getStayTime(to, from, next)
    })
    app.use(router)
}