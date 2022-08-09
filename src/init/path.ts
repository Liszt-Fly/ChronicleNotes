import path from "path";

export let piUserPath = path.resolve(process.cwd(), "src", "user")

export let appearanceFile = path.resolve(piUserPath, "config", "pi.appearance.json")

export let shortcutFile = path.resolve(piUserPath, "config", "pi.shortcut.json")

export let generalFile = path.resolve(piUserPath, "config", "pi.general.json")

export let jottings_path = path.resolve(piUserPath, "jottings")
