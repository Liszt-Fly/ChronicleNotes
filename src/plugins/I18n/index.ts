import {createI18n} from 'vue-i18n'
import {App} from "vue";
import {messages} from "@/plugins/I18n/languages/language";

export const setupI18nPlugin=(app:App)=>{
    const i18n = createI18n({
        locale: 'cn',
        fallbackLocale: 'en',
        messages,
    })
    app.use(i18n)
}