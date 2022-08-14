<template>
  <div class="info">
    <el-row justify="center" :gutter="20">
      <el-col :span="8">
        <div class="welcome">
          <el-form label-width="180px" :model="info" label-position="left">
            <h1>{{ $t("setting.info.welcome") }}</h1>
          </el-form>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="workspace">

          <div class="initial">
            <div class="add">
              <el-row justify="center" :gutter="20">
                <el-col :span="24">
                  <el-input :placeholder="$t('workspace.new_workspace')" v-model="name">
                    <template #append>
                      <el-button class="button" @click="click" :icon="Plus"></el-button>
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
                    <el-button text @click="go(workspace)">
                      <i class="bi bi-arrow-right-square"></i>
                    </el-button>

                    <el-tooltip :content="$t('workspace.remove_workspace')" placement="bottom" effect="customized"
                      :hide-after=0>
                      <el-button text @click.stop="close(i)" type="danger">
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
import { onMounted, Ref, ref } from "vue";
import { reactive } from "vue";
import { dialog, getGlobal } from "@electron/remote";
import { fresh, piUserPath } from "@/init/path";
import { chooseWorkspace } from "@/data/configdb";
import { PIMODE } from "@/types/enums";
import { app_config_path } from "@/init/path";
// import fsp from "fs-extra"

import path from 'path';
import { indexOf } from 'lodash';
import router from '@/router';
const fsp = require("fs-extra");
let filename = ref("");
let name = ref("")
let config: appConfig = fsp.readJSONSync(app_config_path)
const info = reactive({});

const go = (ws: workspace) => {
  piUserPath.value = ws.path
  fresh(getGlobal("sharedObject").bPackaged ? PIMODE.PRODUCTION : PIMODE.DEVELOPMENT);
  chooseWorkspace.value = true
  config.recent = ws
  fsp.writeJSONSync(app_config_path, config)
}

const close = (i: number) => {
  config.workspaces.splice(i, 1)
}

const createWorkspace = (name: string, path: string) => {
  let workspace: workspace = {
    name,
    totalWorktime: "0",
    createdDate: new Date().getTime().toString(),
    modifiedDate: new Date().getTime().toString(),
    path
  }
  config.workspaces.push(workspace)
  return workspace
}

const click = () => {
  dialog.showOpenDialog({ properties: ["openDirectory"] }).then((v) => {
    if (v.canceled) {
      return;
    }
    filename.value = v.filePaths[0];
    let ws = path.resolve(filename.value, name.value)
    fsp.ensureDir(ws)
    piUserPath.value = ws
    let space = createWorkspace(name.value, ws)
    // chooseWorkspace.value = true;

    //TODO 设置最近的workspace
    fsp.writeJSONSync(app_config_path, config)
    console.log('getGlobal("sharedObject").bPackaged', getGlobal("sharedObject").bPackaged)
    // fresh(getGlobal("sharedObject").bPackaged ? PIMODE.PRODUCTION : PIMODE.DEVELOPMENT);
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

    h1 {
      margin: 20px;
      text-align: center;
    }
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
