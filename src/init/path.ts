import path from "path";

export let chronicleUserPath = path.resolve(process.cwd(),"src","user")


export let appearanceFile = path.resolve(chronicleUserPath, "config", "chronicle.appearance.json")

export let appearanceFileDefault = path.resolve(chronicleUserPath, "config", "chronicle.appearance.default.json")

export let shortcutFile = path.resolve(chronicleUserPath, "config", "chronicle.shortcut.json")

export let shortcutFileDefault = path.resolve(chronicleUserPath, "config", "chronicle.shortcut.default.json")

export let generalFile = path.resolve(chronicleUserPath, "config", "chronicle.general.json")

export let generalFileDefault = path.resolve(chronicleUserPath, "config", "chronicle.general.default.json")