import { appearance_config_path, general_config_path, shortcut_config_path } from "@/init/path";
const fs = require("fs-extra")

export let appearance = fs.readJsonSync(appearance_config_path)

export let general = fs.readJsonSync(general_config_path)

export let shortcut = fs.readJsonSync(shortcut_config_path)

export let theme = appearance.theme

export const locale = general.locale

export const workspaceName = general.workspaceName

export const head = document.head || document.getElementsByTagName('head')[0];