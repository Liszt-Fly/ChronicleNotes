import { MYTHOMODE } from "@/util/types/enums";
import { getGlobal } from "@electron/remote";
import path, { resolve } from "path";
import { Ref, ref } from "vue";
import { createWorkspace } from "../workspace/workspace";
// import fs from "fs-extra"
const fs = require("fs-extra")


let bPackaged = getGlobal("sharedObject").bPackaged;

// config
export let config_path: string = bPackaged ? getGlobal("sharedObject").defaultPath : resolve("public", "config")
export let app_config_path: string = resolve(config_path, ".mytho")
export let appearance_config_path: string = resolve(config_path, ".appearance.mytho")
export let appearance_config_path_default: string = resolve(config_path, ".appearance.default.mytho")
export let shortcut_config_path: string = resolve(config_path, ".shortcut.mytho")
export let shortcut_config_path_default: string = resolve(config_path, ".shortcut.default.mytho")
export let general_config_path: string = resolve(config_path, ".general.mytho")
export let general_config_path_default: string = resolve(config_path, ".general.default.mytho")

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

// data
export let mythoUserPath: Ref<string> = ref("")
export let jottings_path: Ref<string> = ref("")
export let assets_path: Ref<string> = ref("")
export let img_path: Ref<string> = ref("")

export const freshWorkspace = () => {
    jottings_path.value = resolve(mythoUserPath.value, "jottings")
    assets_path.value = resolve(mythoUserPath.value, "assets")
    img_path.value = resolve(mythoUserPath.value, "img")

    fs.ensureDirSync(jottings_path.value)
    fs.ensureDirSync(assets_path.value)
    fs.ensureDirSync(img_path.value)
}

export const initWorkspace = (mode: MYTHOMODE) => {
    let folder = mode == MYTHOMODE.DEVELOPMENT ? "public" : __dirname

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
//* 创建初始化仓库 Workspace
export const createInitialWorksapce=()=>{
    //* 开发环境
    if(!getGlobal("sharedObject").bPackaged){
        let workspace:workspace={
            name:"init",
            createdDate:new Date().toString(),
            modifiedDate:new Date().toString(),
            totalWorktime:"0",
            lastOpenFile:"",
            path:path.resolve("public","initialWorkspace")
        }
        let workspaceConfig:appConfig=fs.readJSONSync(app_config_path)
        workspaceConfig.workspaces.push(workspace)
        fs.writeJSONSync(app_config_path,workspaceConfig)
    }
}