import fs from "fs";
import { appearanceFile, generalFile, packagedAppearanceFile, packagedShortcutFile, packageGeneralFile, shortcutFile } from "@/init/path";
import { getGlobal } from "@electron/remote";
let appearanceFileData: string
let generalFileData: string
let shortcutFileData: string
let bPackaged = getGlobal("sharedObject").bPackaged;
console.log('bPackaged', bPackaged)
if (bPackaged) {
    appearanceFileData = fs.readFileSync(packagedAppearanceFile, { encoding: "utf-8" }) as unknown as string
    console.log('appearanceFileData', appearanceFileData)

    generalFileData = fs.readFileSync(packageGeneralFile) as unknown as string

    shortcutFileData = fs.readFileSync(packagedShortcutFile) as unknown as string
}
else {
    appearanceFileData = fs.readFileSync(appearanceFile) as unknown as string

    generalFileData = fs.readFileSync(generalFile) as unknown as string

    shortcutFileData = fs.readFileSync(shortcutFile) as unknown as string
}


export let appearance = JSON.parse(appearanceFileData)


export let general = JSON.parse(generalFileData)


export let shortcut = JSON.parse(shortcutFileData)

export let theme = appearance.theme
export const locale = general.locale
export const workspaceName = general.workspaceName

export const head = document.head || document.getElementsByTagName('head')[0];