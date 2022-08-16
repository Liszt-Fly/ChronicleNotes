import { dialog } from "@electron/remote";
import { chooseWorkspace, currentWorkSpace } from "@/data/configdb";
import { config } from "@/data/configdb";
import configInstance from "@/util/configs/config"
import router from '@/router';
import path from 'path';
const fs = require("fs-extra");

export const enter_workspace = (ws: workspace) => {
    configInstance.mythoUserPath.value = ws.path
    configInstance.freshWorkspace();
    chooseWorkspace.value = true
    config.value.recent = ws
    currentWorkSpace.value = ws
    configInstance.writeAppConfig(config.value)
    router.push("/Editor")
}

export const remove_workspace = (i: number) => {
    config.value.workspaces.splice(i, 1)
    configInstance.writeAppConfig(config.value)
}

export const createWorkspace = (workspaceName: string) => {
    dialog.showOpenDialog({ properties: ["openDirectory"] }).then((v) => {
        if (v.canceled) {
            return;
        }

        let workspace_dir = v.filePaths[0];
        let ws = path.resolve(workspace_dir, workspaceName)
        fs.ensureDir(ws)

        let workspace: workspace = {
            name: workspaceName,
            totalWorktime: "0",
            createdDate: new Date().getTime().toString(),
            modifiedDate: new Date().getTime().toString(),
            path: ws,
            lastOpenFile: ""
        }
        config.value.workspaces.push(workspace)

        enter_workspace(workspace)
    });
};

export const findCurrentWorkSpace = () => {
    let config = configInstance.readAppConfig()
    let index = -1;
    let workspaces: workspace[] = config.workspaces
    workspaces.forEach((v, i) => {
        if (v.path == currentWorkSpace.value?.path) {
            index = i
        }

    })
    return index
}