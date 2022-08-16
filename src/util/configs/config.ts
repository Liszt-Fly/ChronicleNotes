import { getGlobal } from "@electron/remote";
import { resolve } from "path";
import { ref, Ref } from "vue";
import { MYTHOMODE } from "../types/enums";
const fs = require("fs-extra")
class config {
    public mythoUserPath: Ref<string> = ref("")
    public jottings_path: Ref<string> = ref("")
    public assets_path: Ref<string> = ref("")
    public img_path: Ref<string> = ref("")
    public root: string
    public config_path: string
    public app_config_path: string
    public shortcut_config_path: string
    public general_config_path: string
    public general_config_path_default: string
    public shortcut_config_path_default: string
    public appearance_config_path_default: string
    public appearance_config_path: string
    public mode: MYTHOMODE
    constructor() {
        //* 判断当前的环境
        this.mode = import.meta.env.PROD ? MYTHOMODE.PRODUCTION : MYTHOMODE.DEVELOPMENT
        console.log('this.mode', this.mode)
        //* 所有appConfig的总路径，不是一个config配置文件的位置
        this.config_path = this.mode == MYTHOMODE.PRODUCTION ? getGlobal("sharedObject").defaultPath : resolve("public", "config")

        //* 记录workspace和recent的路径
        this.app_config_path = resolve(this.config_path, ".mytho")
        //* 默认的外观路径
        this.appearance_config_path_default = resolve(this.config_path, ".appearance.default.mytho")
        //* 默认的外观路径
        this.appearance_config_path = resolve(this.config_path, ".appearance.mytho")
        //* 快捷键设置的路径
        this.shortcut_config_path = resolve(this.config_path, ".shortcut.mytho")
        //* 快捷键默认设置的路径
        this.shortcut_config_path_default = resolve(this.config_path, ".shortcut.default.mytho")
        //* 通用配置的路径
        this.general_config_path = resolve(this.config_path, ".general.mytho")
        //* 通用配置的默认路径
        this.general_config_path_default = resolve(this.config_path, ".general.default.mytho")

        this.root = this.mode == MYTHOMODE.DEVELOPMENT ? "public" : __dirname
        console.log('MYTHOMODE.DEVELOPMEN', MYTHOMODE.DEVELOPMENT)
        console.log('this.root', this.root)
        this.initPackagedConfigs()
    }
    //* 刷新工作区，更新工作区路径
    freshWorkspace() {
        this.jottings_path.value = resolve(this.mythoUserPath.value, "jottings")
        this.assets_path.value = resolve(this.mythoUserPath.value, "assets")
        this.img_path.value = resolve(this.mythoUserPath.value, "img")

        fs.ensureDirSync(this.jottings_path.value)
        fs.ensureDirSync(this.assets_path.value)
        fs.ensureDirSync(this.img_path.value)
    }
    //* 保证打包后的配置正确
    initPackagedConfigs() {
        if (this.mode == MYTHOMODE.PRODUCTION) {
            if (!fs.existsSync(this.config_path)) {
                fs.mkdirSync(this.config_path)
            }
            if (!fs.existsSync(this.app_config_path)) {
                let pi_config_path = resolve(__dirname, "config")
                let configs = fs.readdirSync(pi_config_path)
                for (const i in configs) {
                    fs.outputFileSync(resolve(this.config_path, configs[i]), fs.readFileSync(resolve(pi_config_path, configs[i])))
                }
            }
        }
    }
    //* 将工作区进行初始化
    initWorkspace() {
        let template_assets_path = resolve(this.root, "template", "assets")
        let assets = fs.readdirSync(template_assets_path)
        for (const i in assets) {
            fs.outputFileSync(resolve(this.assets_path.value, assets[i]), fs.readFileSync(resolve(template_assets_path, assets[i])))
        }

        let template_jottings_path = resolve(this.root, "template", "jottings")
        let jottings = fs.readdirSync(template_jottings_path)
        for (const i in jottings) {
            fs.outputFileSync(resolve(this.jottings_path.value, jottings[i]), fs.readFileSync(resolve(template_jottings_path, jottings[i])))
        }
    }
    //* 建立init仓库
    createInitialWorksapce() {
        let workspace: workspace = {
            name: "init",
            createdDate: new Date().toString(),
            modifiedDate: new Date().toString(),
            totalWorktime: "0",
            lastOpenFile: "",
            path: resolve(this.root, "initialWorkspace")
        }
        let workspaceConfig: appConfig = fs.readJSONSync(this.app_config_path)
        console.log('workspace.path', workspace.path)
        console.log('fs.existsSync(workspace.path)', fs.existsSync(workspace.path))
        if (fs.existsSync(workspace.path)) {
            workspaceConfig.workspaces.push(workspace)
            fs.writeJSONSync(this.app_config_path, workspaceConfig)
        }
    }
    //* 返回对应的appConfig
    readAppConfig(): appConfig {
        return fs.readJSONSync(this.app_config_path) as appConfig
    }
    //* 写入对应的appConfig
    writeAppConfig(config: appConfig) {
        fs.writeJSONSync(this.app_config_path, config)
    }

}
export default new config() 