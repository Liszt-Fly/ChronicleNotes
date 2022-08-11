import { getGlobal } from "@electron/remote";
import path from "path";
import fs from "fs-extra"

let bPackaged = getGlobal("sharedObject").bPackaged;
fs.chmod
export let piUserPath: string = bPackaged ? getGlobal("sharedObject").defaultPath : path.resolve("public", "user")

export let appearanceFile: string = path.resolve(piUserPath, "config", "pi.appearance.json")

export let appearanceFileDefault: string = path.resolve(piUserPath, "config", "pi.appearance.default.json")

export let shortcutFile: string = path.resolve(piUserPath, "config", "pi.shortcut.json")

export let shortcutFileDefault: string = path.resolve(piUserPath, "config", "pi.shortcut.default.json")

export let generalFile: string = path.resolve(piUserPath, "config", "pi.general.json")

export let generalFileDefault: string = path.resolve(piUserPath, "config", "pi.general.default.json")

export let jottings_path: string = path.resolve(piUserPath, "jottings")

if (bPackaged) {
    let array = [piUserPath, appearanceFile, shortcutFile, shortcutFileDefault, generalFile, generalFileDefault, jottings_path]
    if (!array.every(e => fs.existsSync(e))) {
        fs.copySync(path.resolve(__dirname, "user"), getGlobal("sharedObject").defaultPath, { overwrite: true })
    }

}
// [appearanceFile, appearanceFileDefault, shortcutFile, shortcutFileDefault, generalFile, generalFileDefault,jottings_path]