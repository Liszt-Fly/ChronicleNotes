import { createApp } from 'vue'
import App from './App.vue'
import router, {setupRouter} from "@/router";
import {setupPlugins} from "@/plugins";
// import './samples/node-api'
const app=createApp(App)
//* 设置路由
setupRouter(app)
//* 设置插件
setupPlugins(app)

await router.isReady()
app.mount('#app')
    .$nextTick(() => {
        postMessage({payload: 'removeLoading'}, '*')
    }).then(r =>{
    console.log(r);})
