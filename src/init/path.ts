import { getGlobal } from "@electron/remote";
import path from "path";
const fs = require("fs-extra")

let bPackaged = getGlobal("sharedObject").bPackaged;

export let piUserPath: string = bPackaged ? getGlobal("sharedObject").defaultPath : path.resolve("public", "user")

export let jottings_path: string = path.resolve(piUserPath, "jottings")
export let assets_path: string = path.resolve(piUserPath, "assets")
export let config_path: string = path.resolve(piUserPath, "config")

export let appearanceFile: string = path.resolve(config_path, "pi.appearance.json")
export let appearanceFileDefault: string = path.resolve(config_path, "pi.appearance.default.json")

export let shortcutFile: string = path.resolve(config_path, "pi.shortcut.json")
export let shortcutFileDefault: string = path.resolve(config_path, "pi.shortcut.default.json")

export let generalFile: string = path.resolve(config_path, "pi.general.json")
export let generalFileDefault: string = path.resolve(config_path, "pi.general.default.json")

let fArray = [piUserPath, appearanceFile, shortcutFile, shortcutFileDefault, generalFile, generalFileDefault, jottings_path, assets_path]

if (bPackaged) {
    fs.ensureDirSync(piUserPath, 777)
    fs.ensureDirSync(config_path, 777)
    fs.ensureDirSync(jottings_path, 777)
    fs.ensureDirSync(assets_path, 777)

    // for (const f in fArray) {
    //     if (!fs.existsSync(f)) {
    //     }
    // }

    if (!fArray.every(e => fs.existsSync(e))) {
        // copySync 有问题！只能读，无法写
        // fs.copySync(path.resolve(__dirname, "user"), piUserPath, { overwrite: true })

        fs.outputFileSync(path.resolve(assets_path, "🎉 欢迎使用 π.md"), fs.readFileSync(path.resolve(__dirname, "user", "assets", "🎉 欢迎使用 π.md")))

        fs.outputFileSync(path.resolve(jottings_path, "jotting.txt"), fs.readFileSync(path.resolve(__dirname, "user", "jottings", "jotting.txt")))

        fs.outputJsonSync(appearanceFile, fs.readJsonSync(path.resolve(__dirname, "user", "config", "pi.appearance.json")))
        fs.outputJsonSync(appearanceFileDefault, fs.readJsonSync(path.resolve(__dirname, "user", "config", "pi.appearance.default.json")))
        fs.outputJsonSync(shortcutFile, fs.readJsonSync(path.resolve(__dirname, "user", "config", "pi.shortcut.json")))
        fs.outputJsonSync(shortcutFileDefault, fs.readJsonSync(path.resolve(__dirname, "user", "config", "pi.shortcut.default.json")))
        fs.outputJsonSync(generalFile, fs.readJsonSync(path.resolve(__dirname, "user", "config", "pi.general.json")))
        fs.outputJsonSync(generalFileDefault, fs.readJsonSync(path.resolve(__dirname, "user", "config", "pi.general.default.json")))
    }
}
