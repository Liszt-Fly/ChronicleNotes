import { PIMODE } from "@/types/enums";
import { getGlobal } from "@electron/remote";
import { resolve } from "path";
import { Ref, ref } from "vue";
const fs = require("fs-extra")

let bPackaged = getGlobal("sharedObject").bPackaged;

export let piUserPath: Ref<string> = ref(bPackaged ? getGlobal("sharedObject").defaultPath : resolve("public", "template"))

export let jottings_path: Ref<string> = ref(resolve(piUserPath.value, "jottings"))
export let assets_path: Ref<string> = ref(resolve(piUserPath.value, "assets"))
export let config_path: Ref<string> = ref(resolve(piUserPath.value, "config"))
export let app_config_path: Ref<string> = ref(bPackaged ? resolve(__dirname, "config", "config.json") : resolve("public", "config", "config.json"))

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
    console.log('folder', folder)
    fs.ensureDir(piUserPath.value)
    fs.ensureDir(config_path.value)
    fs.ensureDir(jottings_path.value)
    fs.ensureDir(assets_path.value, (err: any) => {
        console.log('err', err)
    })
    console.log('fArray.value', fArray.value)
    if (!fArray.value.every(e => fs.existsSync(e))) {
        alert("ok")
        fs.outputFileSync(resolve(assets_path.value, "欢迎使用.md"), fs.readFileSync(resolve(folder, "template", "assets", "欢迎使用.md")))


        fs.outputFileSync(resolve(jottings_path.value, "jotting.txt"), fs.readFileSync(resolve(folder, "template", "jottings", "jotting_.jt")))

        fs.outputJsonSync(appearanceFile.value, fs.readJsonSync(resolve(folder, "template", "config", "pi.appearance.json")))
        fs.outputJsonSync(appearanceFileDefault.value, fs.readJsonSync(resolve(folder, "template", "config", "pi.appearance.default.json")))
        fs.outputJsonSync(shortcutFile.value, fs.readJsonSync(resolve(folder, "template", "config", "pi.shortcut.json")))
        fs.outputJsonSync(shortcutFileDefault.value, fs.readJsonSync(resolve(folder, "template", "config", "pi.shortcut.default.json")))
        fs.outputJsonSync(generalFile.value, fs.readJsonSync(resolve(folder, "template", "config", "pi.general.json")))
        fs.outputJsonSync(generalFileDefault.value, fs.readJsonSync(resolve(folder, "template", "config", "pi.general.default.json")))
    }
}
if (bPackaged) {
    fresh(PIMODE.PRODUCTION)
}

