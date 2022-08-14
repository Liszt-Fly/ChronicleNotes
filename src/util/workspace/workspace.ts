import { dialog, getGlobal } from "@electron/remote";
import { chooseWorkspace, currentWorkSpace } from "@/data/configdb";
import { PIMODE } from "@/util/types/enums";
import { app_config_path, freshWorkspace, piUserPath, initWorkspace } from "@/util/init/initPath";
import { config } from "@/data/configdb";

import router from '@/router';
import path from 'path';
const fs = require("fs-extra");

export const enter_workspace = (ws: workspace) => {
    piUserPath.value = ws.path
    freshWorkspace();
    chooseWorkspace.value = true
    config.value.recent = ws
    currentWorkSpace.value = ws
    fs.writeJSONSync(app_config_path, config.value)
    router.push("/Editor")
}

export const remove_workspace = (i: number) => {
    config.value.workspaces.splice(i, 1)
    fs.writeJSONSync(app_config_path, config.value)
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
        initWorkspace(getGlobal("sharedObject").bPackaged ? PIMODE.PRODUCTION : PIMODE.DEVELOPMENT)
    });
};

export const findCurrentWorkSpace = () => {
    let config = fs.readJSONSync(app_config_path)
    let index = -1;
    let workspaces: workspace[] = config.workspaces
    workspaces.forEach((v, i) => {
        if (v.path == currentWorkSpace.value?.path) {
            index = i
        }

    })
    return index
}