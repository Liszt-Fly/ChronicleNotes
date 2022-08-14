import { PIMODE } from "@/util/types/enums";
import { getGlobal } from "@electron/remote";
import { resolve } from "path";
import { Ref, ref } from "vue";

const fs = require("fs-extra")
// import fs from "fs-extra"

let bPackaged = getGlobal("sharedObject").bPackaged;

// config

export let config_path: string = bPackaged ? getGlobal("sharedObject").defaultPath : resolve("public", "config")
export let app_config_path: string = resolve(config_path, ".pi")
export let appearance_config_path: string = resolve(config_path, ".appearance.pi")
export let appearance_config_path_default: string = resolve(config_path, ".appearance.default.pi")
export let shortcut_config_path: string = resolve(config_path, ".shortcut.pi")
export let shortcut_config_path_default: string = resolve(config_path, ".shortcut.default.pi")
export let general_config_path: string = resolve(config_path, ".general.pi")
export let general_config_path_default: string = resolve(config_path, ".general.default.pi")
if (bPackaged) {
    if (!fs.existsSync(config_path)) {
        fs.mkdirSync(config_path)
    }
    if (!fs.existsSync(app_config_path)) {
        let pi_config_path = resolve(__dirname, "config")
        let configs = fs.readdirSync(pi_config_path)
        for (const i in configs) {
            fs.outputFileSync(resolve(config_path, configs[i]), fs.readFileSync(resolve(pi_config_path, configs[i])))
        }
    }
}

let app_config = fs.readJsonSync(app_config_path)

// data

export let piUserPath: Ref<string> = ref(app_config.recent != "" ? app_config.recent.path : resolve("public", "template"))
export let jottings_path: Ref<string> = ref(resolve(piUserPath.value, "jottings"))
export let assets_path: Ref<string> = ref(resolve(piUserPath.value, "assets"))

export const freshWorkspace = () => {
    jottings_path.value = resolve(piUserPath.value, "jottings")
    assets_path.value = resolve(piUserPath.value, "assets")
}

export const initWorkspace = (mode: PIMODE) => {
    let folder = mode == PIMODE.DEVELOPMENT ? "public" : __dirname

    let template_assets_path = resolve(folder, "template", "assets")
    let assets = fs.readdirSync(template_assets_path)
    for (const i in assets) {
        fs.outputFileSync(resolve(assets_path.value, assets[i]), fs.readFileSync(resolve(template_assets_path, assets[i])))
    }

    let template_jottings_path = resolve(folder, "template", "jottings")
    let jottings = fs.readdirSync(template_jottings_path)
    for (const i in jottings) {
        fs.outputFileSync(resolve(jottings_path.value, jottings[i]), fs.readFileSync(resolve(template_jottings_path, jottings[i])))
    }
}