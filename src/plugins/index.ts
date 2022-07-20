import {App} from "vue";
import {setupBootstrapPlugin} from "@/plugins/Bootstrap";
import {setupElementPlus} from "@/plugins/ElementPlus";
import {setupStyle} from "@/plugins/Styles";

export function setupPlugins(app:App){
    setupStyle()
    setupBootstrapPlugin()
    setupElementPlus(app)
}