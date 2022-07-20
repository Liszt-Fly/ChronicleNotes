import fs from "fs";
import {appearanceFile, generalFile, shortcutFile} from "@/init/path";

const appearanceFileData = fs.readFileSync(appearanceFile) as unknown as string
export let appearance = JSON.parse(appearanceFileData)

const generalFileData = fs.readFileSync(generalFile) as unknown as string
export let general = JSON.parse(generalFileData)

const shortcutFileData = fs.readFileSync(shortcutFile) as unknown as string
export let shortcut = JSON.parse(shortcutFileData)

export let theme = appearance.theme
export const locale = general.locale
export const workspaceName = general.workspaceName
export let vditorTheme: "classic" | "dark" = appearance.theme ? "classic" : "dark"
export const head = document.head || document.getElementsByTagName('head')[0];