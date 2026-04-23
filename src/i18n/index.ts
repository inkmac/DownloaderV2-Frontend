import { createI18n } from "vue-i18n";
import zh from "@/i18n/locales/zh.ts";
import en from "@/i18n/locales/en.ts";
import fr from "@/i18n/locales/fr.ts";

export type LanguageType = 'zh' | 'en' | 'fr'

const i18n = createI18n({
    legacy: false,          // 必须设置为 false 才能在 Vue 3 中使用 Composition API
    locale: 'zh',           // 默认语言
    fallbackLocale: 'en',   // 备用语言（如果当前语言找不到 key，则显示英文）
    messages: {
        zh,
        en,
        fr,
    }
})

export default i18n