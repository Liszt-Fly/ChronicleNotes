import {App} from "vue";
import {setupBootstrapPlugin} from "@/plugins/Bootstrap";
import {setupElementPlus} from "@/plugins/ElementPlus";

export function setupPlugins(app:App){
    setupBootstrapPlugin()
    setupElementPlus(app)
}