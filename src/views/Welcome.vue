<template>
  <div class="info">
    <el-row justify="center" :gutter="20">
      <el-col :span="8">
        <div class="welcome">
          <h1>{{ $t("setting.info.welcome") }}</h1>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="workspace">

          <div class="initial">
            <div class="add">
              <el-row justify="center" :gutter="20">
                <el-col :span="24">
                  <el-input :placeholder="$t('workspace.new_workspace_name')" v-model="name">
                    <template #append>
                      <el-tooltip :content="$t('workspace.add_workspace')" placement="bottom" effect="customized"
                        :hide-after=0>
                        <el-button class="button" @click="createWorkspace" :icon="Plus"></el-button>
                      </el-tooltip>
                    </template>
                  </el-input>
                </el-col>
                <el-col :span="8">
                </el-col>
              </el-row>
            </div>
          </div>

          <el-scrollbar height="60vh">
            <el-card class="panel" shadow="never" v-for="(workspace, i) of config.workspaces" :key="workspace.name">
              <el-row>
                <el-col :span="14">
                  <h3>
                    {{ workspace.name }}
                  </h3>
                </el-col>

                <el-col :span="10">
                  <el-button-group>
                    <el-tooltip :content="$t('workspace.enter_workspace')" placement="bottom" effect="customized"
                      :hide-after=0>
                      <el-button text @click="enter_workspace(workspace)">
                        <i class="bi bi-arrow-right-square"></i>
                      </el-button>
                    </el-tooltip>

                    <el-tooltip :content="$t('workspace.remove_workspace')" placement="bottom" effect="customized"
                      :hide-after=0>
                      <el-button text @click.stop="remove_workspace(i)" type="danger">
                        <i class="bi bi-eraser"></i>
                      </el-button>
                    </el-tooltip>
                  </el-button-group>
                </el-col>
              </el-row>

              <div class="workspace-info">
                <el-skeleton :rows="2" animated />
              </div>
            </el-card>
          </el-scrollbar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import { Ref, ref } from "vue";
import { dialog, getGlobal } from "@electron/remote";
import { app_config_path, freshWorkspace, piUserPath, initWorkspace } from "@/util/init/initPath";
import { chooseWorkspace } from "@/data/configdb";
import { PIMODE } from "@/util/types/enums";

import path from 'path';
import router from '@/router';
const fsp = require("fs-extra");

let filename = ref("");
let name = ref("")
let config: Ref<appConfig> = ref(fsp.readJSONSync(app_config_path))

const enter_workspace = (ws: workspace) => {
  piUserPath.value = ws.path
  freshWorkspace();
  chooseWorkspace.value = true
  config.value.recent = ws
  fsp.writeJSONSync(app_config_path, config.value)
  router.push("/Editor")
}

const remove_workspace = (i: number) => {
  config.value.workspaces.splice(i, 1)
  fsp.writeJSONSync(app_config_path, config.value)
}

const createWorkspace = () => {
  dialog.showOpenDialog({ properties: ["openDirectory"] }).then((v) => {
    if (v.canceled) {
      return;
    }

    filename.value = v.filePaths[0];
    let ws = path.resolve(filename.value, name.value)
    fsp.ensureDir(ws)

    let workspace: workspace = {
      name: name.value,
      totalWorktime: "0",
      createdDate: new Date().getTime().toString(),
      modifiedDate: new Date().getTime().toString(),
      path: ws
    }
    config.value.workspaces.push(workspace)

    enter_workspace(workspace)
    initWorkspace(getGlobal("sharedObject").bPackaged ? PIMODE.PRODUCTION : PIMODE.DEVELOPMENT)
  });
};
</script>

<style lang="scss">
.info {
  width: 80%;
  height: calc(100vh - 48px);
  margin: auto;

  .welcome {
    margin: auto;
    user-select: none;
    height: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  .workspace {
    display: flex;
    flex-direction: column;
    padding: 20px;


    .initial {
      display: flex;
      flex-direction: column;
      margin: 20px;

      .container {
        overflow: scroll;
        margin-top: 100px;
        width: 100%;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        .workspace-button {
          border: solid 1px #ddd;
          border-radius: 8px;
          padding: 0.4rem;

          margin-bottom: 20px;
          cursor: pointer;
          user-select: none;
          position: relative;
          display: flex;
        }

      }
    }

    .panel {
      margin: 10px 20px;
      height: 72px;

      h3 {
        margin-bottom: 20px;
      }

      .workspace-info {
        display: none;
      }

      &:hover {
        height: 220px;
        box-shadow: var(--pi-theme-color) 0px 0px 0px 4px;

        .workspace-info {
          display: block;
        }
      }
    }
  }

}
</style>
