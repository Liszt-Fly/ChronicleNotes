import { getGlobal } from "@electron/remote";
import path from "path";
//TODO 区分启动时和编译后

//sum 编译后
export let pacakgedPath = path.resolve(__dirname, "user")
export let packagedAppearanceFile = path.resolve(pacakgedPath, "config", "pi.appearance.json")
export let packagedAppearanceFileDefault = path.resolve(pacakgedPath, "config", "pi.appearance.default.json")
export let packagedShortcutFile = path.resolve(pacakgedPath, "config", "pi.shortcut.json")
export let packagedShortcutFileDefault = path.resolve(pacakgedPath, "config", "pi.shortcut.default.json")
export let packageGeneralFile = path.resolve(pacakgedPath, "config", "pi.general.json")
export let packageGeneralFileDefault = path.resolve(pacakgedPath, "config", "pi.general.default.json")
export let packagedJottings_path = path.resolve(pacakgedPath, "jottings")



//启动前
export let piUserPath = path.resolve(process.cwd(), "src", "user")

export let appearanceFile = path.resolve(piUserPath, "config", "pi.appearance.json")

export let appearanceFileDefault = path.resolve(piUserPath, "config", "pi.appearance.default.json")

export let shortcutFile = path.resolve(piUserPath, "config", "pi.shortcut.json")

export let shortcutFileDefault = path.resolve(piUserPath, "config", "pi.shortcut.default.json")

export let generalFile = path.resolve(piUserPath, "config", "pi.general.json")

export let generalFileDefault = path.resolve(piUserPath, "config", "pi.general.default.json")

export let jottings_path = path.resolve(piUserPath, "jottings")

