import { getGlobal } from "@electron/remote";
import path from "path";
//TODO 区分启动时和编译后
let bPackaged = getGlobal("sharedObject").bPackaged;



export let piUserPath = bPackaged ? getGlobal("sharedObject") : path.resolve(process.cwd(), "src", "user")

export let appearanceFile = path.resolve(piUserPath, "config", "pi.appearance.json")

export let appearanceFileDefault = path.resolve(piUserPath, "config", "pi.appearance.default.json")

export let shortcutFile = path.resolve(piUserPath, "config", "pi.shortcut.json")

export let shortcutFileDefault = path.resolve(piUserPath, "config", "pi.shortcut.default.json")

export let generalFile = path.resolve(piUserPath, "config", "pi.general.json")

export let generalFileDefault = path.resolve(piUserPath, "config", "pi.general.default.json")

export let jottings_path = path.resolve(piUserPath, "jottings")

