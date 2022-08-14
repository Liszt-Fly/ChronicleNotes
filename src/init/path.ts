import { PIMODE } from "@/types/enums";
import { getGlobal } from "@electron/remote";
import { resolve } from "path";
import { Ref, ref } from "vue";

const fs = require("fs-extra")

let bPackaged = getGlobal("sharedObject").bPackaged;

export let app_config_path: Ref<string> = ref(bPackaged ? resolve(__dirname, "config", "config.json") : resolve("public", "config", "config.json"))

export let piUserPath: Ref<string> = ref(bPackaged ? getGlobal("sharedObject").defaultPath : resolve("public", "template"))

export let jottings_path: Ref<string> = ref(resolve(piUserPath.value, "jottings"))
export let assets_path: Ref<string> = ref(resolve(piUserPath.value, "assets"))
export let config_path: Ref<string> = ref(resolve(piUserPath.value, "config"))

export let appearanceFile: Ref<string> = ref(resolve(config_path.value, "pi.appearance.json"))
export let appearanceFileDefault: Ref<string> = ref(resolve(config_path.value, "pi.appearance.default.json")
)
export let shortcutFile: Ref<string> = ref(resolve(config_path.value, "pi.shortcut.json"))
export let shortcutFileDefault: Ref<string> = ref(resolve(config_path.value, "pi.shortcut.default.json"))

export let generalFile: Ref<string> = ref(resolve(config_path.value, "pi.general.json"))
export let generalFileDefault: Ref<string> = ref(resolve(config_path.value, "pi.general.default.json")
)

const updatePath = () => {
    jottings_path = ref(resolve(piUserPath.value, "jottings"))
    assets_path = ref(resolve(piUserPath.value, "assets"))
    config_path = ref(resolve(piUserPath.value, "config"))
    app_config_path = ref(bPackaged ? resolve(__dirname, "config", "config.json") : resolve("public", "config", "config.json"))
    appearanceFile = ref(resolve(config_path.value, "pi.appearance.json"))
    shortcutFile = ref(resolve(config_path.value, "pi.shortcut.json"))
    shortcutFileDefault = ref(resolve(config_path.value, "pi.shortcut.default.json"))
    generalFile = ref(resolve(config_path.value, "pi.general.json"))
    generalFileDefault = ref(resolve(config_path.value, "pi.general.default.json"))
}

let fArray = ref([piUserPath, appearanceFile, shortcutFile, shortcutFileDefault, generalFile, generalFileDefault, jottings_path, assets_path])

export const fresh = (mode: PIMODE) => {
    updatePath()
    let folder = mode == PIMODE.DEVELOPMENT ? "public" : __dirname

    fs.ensureDir(piUserPath.value)
    fs.ensureDir(config_path.value)
    fs.ensureDir(jottings_path.value)
    fs.ensureDir(assets_path.value)

    if (!fArray.value.every(e => fs.existsSync(e))) {
        let template_assets_path = resolve(folder, "template", "assets")
        let assets = fs.readdirSync(template_assets_path)

        for (const i in assets) {
            fs.outputFileSync(resolve(assets_path.value, assets[i]), fs.readFileSync(resolve(template_assets_path, assets[i])))
        }

        let template_jottings_path = resolve(folder, "template", "jottings")
        let jottings = fs.readdirSync(template_jottings_path)

        for (const i in jottings) {
            fs.outputFileSync(resolve(jottings_path.value, jottings[i]), fs.readFileSync(resolve(template_jottings_path, jottings[i])))
        }

        let template_config_path = resolve(folder, "template", "config")
        let configs = fs.readdirSync(template_config_path)

        for (const i in configs) {
            fs.outputFileSync(resolve(config_path.value, configs[i]), fs.readFileSync(resolve(template_config_path, configs[i])))
        }
    }
}

if (bPackaged) {
    fresh(PIMODE.PRODUCTION)
}

