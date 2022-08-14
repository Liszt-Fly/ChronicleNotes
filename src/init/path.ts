import { PIMODE } from "@/types/enums";
import { getGlobal } from "@electron/remote";
import { resolve } from "path";
import { Ref, ref } from "vue";

const fs = require("fs-extra")

let bPackaged = getGlobal("sharedObject").bPackaged;

export let app_config_path: string = bPackaged ? resolve(__dirname, "config", ".pi") : resolve("public", "config", ".pi")
let app_config = fs.readJsonSync(app_config_path)

export let piUserPath: Ref<string> = ref("")

if (app_config.recent != "") {
    piUserPath.value = app_config.recent.path
}
else {
    piUserPath.value = resolve("public", "template")
}

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

let pi_files = ref([piUserPath, assets_path, appearanceFile, appearanceFileDefault, shortcutFile, shortcutFileDefault, generalFile, generalFileDefault, jottings_path])

const updatePath = () => {
    jottings_path.value = resolve(piUserPath.value, "jottings")
    assets_path.value = resolve(piUserPath.value, "assets")
    config_path.value = resolve(piUserPath.value, "config")

    appearanceFile.value = resolve(config_path.value, "pi.appearance.json")
    appearanceFileDefault.value = resolve(config_path.value, "pi.appearance.default.json")
    shortcutFile.value = resolve(config_path.value, "pi.shortcut.json")
    shortcutFileDefault.value = resolve(config_path.value, "pi.shortcut.default.json")
    generalFile.value = resolve(config_path.value, "pi.general.json")
    generalFileDefault.value = resolve(config_path.value, "pi.general.default.json")
}

export const fresh = (mode: PIMODE) => {
    let folder = mode == PIMODE.DEVELOPMENT ? "public" : __dirname
    updatePath()

    fs.ensureDir(piUserPath.value)
    fs.ensureDir(config_path.value)
    fs.ensureDir(jottings_path.value)
    fs.ensureDir(assets_path.value)

    if (!pi_files.value.every(f => fs.existsSync(f.value))) {
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

