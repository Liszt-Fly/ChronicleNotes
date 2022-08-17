import configInstance from "@/util/configs/config"
const fs = require("fs-extra")

export let appearance = fs.readJsonSync(configInstance.appearance_config_path)

export let general = fs.readJsonSync(configInstance.general_config_path)

export let keyboard_shortcuts = fs.readJsonSync(configInstance.keyboard_shortcuts_config_path)

export let theme = appearance.theme

export const locale = general.locale

export const workspaceName = general.workspaceName

export const head = document.head || document.getElementsByTagName('head')[0];