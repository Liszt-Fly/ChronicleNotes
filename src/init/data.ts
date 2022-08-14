import { appearanceFile, generalFile, shortcutFile } from "@/init/path";
const fs = require("fs-extra")

export let appearance = fs.readJsonSync(appearanceFile.value)

export let general = fs.readJsonSync(generalFile.value)

export let shortcut = fs.readJsonSync(shortcutFile.value)

export let theme = appearance.theme

export const locale = general.locale

export const workspaceName = general.workspaceName

export const head = document.head || document.getElementsByTagName('head')[0];