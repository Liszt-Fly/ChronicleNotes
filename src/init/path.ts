import { getGlobal } from "@electron/remote";
import { resolve } from "path";
import { Ref, ref } from "vue";
const fs = require("fs-extra")

let bPackaged = getGlobal("sharedObject").bPackaged;

export let piUserPath: Ref<string> = ref(bPackaged ? getGlobal("sharedObject").defaultPath : resolve("public", "template"))

export let jottings_path: string = resolve(piUserPath.value, "jottings")
export let assets_path: string = resolve(piUserPath.value, "assets")
export let config_path: string = resolve(piUserPath.value, "config")
export let app_config_path: string = bPackaged ? resolve(__dirname, "config", "config.json") : resolve("public", "config", "config.json")

export let appearanceFile: string = resolve(config_path, "pi.appearance.json")
export let appearanceFileDefault: string = resolve(config_path, "pi.appearance.default.json")

export let shortcutFile: string = resolve(config_path, "pi.shortcut.json")
export let shortcutFileDefault: string = resolve(config_path, "pi.shortcut.default.json")

export let generalFile: string = resolve(config_path, "pi.general.json")
export let generalFileDefault: string = resolve(config_path, "pi.general.default.json")

let fArray = [piUserPath, appearanceFile, shortcutFile, shortcutFileDefault, generalFile, generalFileDefault, jottings_path, assets_path]

if (bPackaged) {
    fs.ensureDirSync(piUserPath, 777)
    fs.ensureDirSync(config_path, 777)
    fs.ensureDirSync(jottings_path, 777)
    fs.ensureDirSync(assets_path, 777)

    if (!fArray.every(e => fs.existsSync(e))) {
        // copySync 有问题！只能读，无法写
        // fs.copySync(resolve(__dirname, "template"), piUserPath, { overwrite: true })

        fs.outputFileSync(resolve(assets_path, "🎉 欢迎使用 π.md"), fs.readFileSync(resolve(__dirname, "template", "assets", "🎉 欢迎使用 π.md")))

        fs.outputFileSync(resolve(jottings_path, "jotting.txt"), fs.readFileSync(resolve(__dirname, "template", "jottings", "jotting_.jt")))

        fs.outputJsonSync(appearanceFile, fs.readJsonSync(resolve(__dirname, "template", "config", "pi.appearance.json")))
        fs.outputJsonSync(appearanceFileDefault, fs.readJsonSync(resolve(__dirname, "template", "config", "pi.appearance.default.json")))
        fs.outputJsonSync(shortcutFile, fs.readJsonSync(resolve(__dirname, "template", "config", "pi.shortcut.json")))
        fs.outputJsonSync(shortcutFileDefault, fs.readJsonSync(resolve(__dirname, "template", "config", "pi.shortcut.default.json")))
        fs.outputJsonSync(generalFile, fs.readJsonSync(resolve(__dirname, "template", "config", "pi.general.json")))
        fs.outputJsonSync(generalFileDefault, fs.readJsonSync(resolve(__dirname, "template", "config", "pi.general.default.json")))
    }
}
