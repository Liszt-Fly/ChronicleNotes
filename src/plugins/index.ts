import { App } from "vue";
import { setupBootstrapPlugin } from "@/plugins/Bootstrap";
import { setupElementPlus } from "@/plugins/ElementPlus";
import { setupStyle } from "@/plugins/Styles";
import { setupI18nPlugin } from "@/plugins/I18n";

export function setupPlugins(app: App) {
    setupBootstrapPlugin()
    setupStyle()
    setupElementPlus(app)
    setupI18nPlugin(app)
}