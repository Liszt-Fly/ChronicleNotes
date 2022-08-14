import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from "@/router";
import { setupPlugins } from "@/plugins";
import { init } from "@/util/init";

const app = createApp(App)

//* 设置路由
setupRouter(app)
//* 设置插件
setupPlugins(app)
//* 初始化基本配置
init()


app.mount('#app')
    .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*')
    }).then()
