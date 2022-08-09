import { createI18n } from 'vue-i18n'
import { App } from "vue";
import { messages } from "@/plugins/I18n/languages/language";
import { locale } from "@/init/initGeneral"

export const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'cn',
    messages,
})
export const setupI18nPlugin = (app: App) => {
    app.use(i18n)
    i18n.global.locale = locale
}