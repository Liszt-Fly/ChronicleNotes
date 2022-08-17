<template>
  <div class="info">
    <el-row justify="center" :gutter="20">
      <el-col :span="8">
        <div class="welcome">
          <h1>🏛️</h1>
          <h3>{{ $t("setting.welcome.welcome") }}</h3>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="workspace">

          <div class="initial">
            <div class="add">
              <el-row justify="center" :gutter="20">
                <el-col :span="24">
                  <el-input :placeholder="$t('workspace.new_workspace_name')" v-model="workspaceName">
                    <template #append>
                      <el-tooltip :content="$t('workspace.add_workspace')" placement="bottom" effect="customized"
                        :hide-after=0>
                        <el-button class="button" @click="createWorkspace(workspaceName)"
                          :disabled="workspaceName == ''">
                          <i class="bi bi-plus-lg"></i>
                        </el-button>
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
              <div>
                <h3>
                  <el-tag effect="dark">
                    {{ workspace.name[0].toUpperCase() }}
                  </el-tag>
                  {{ workspace.name }}
                </h3>

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
              </div>

              <!-- todo: -->
              <!-- <div class="workspace-info">
                <el-skeleton :rows="3" animated />
              </div> -->
            </el-card>
          </el-scrollbar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
import { enter_workspace, remove_workspace, createWorkspace } from "@/util/workspace/workspace"
import { config } from "@/data/configdb";

let workspaceName: Ref<string> = ref("")
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
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  .workspace {
    display: flex;
    flex-direction: column;
    padding: 20px;
    user-select: none;

    .initial {
      display: flex;
      flex-direction: column;
      margin: 20px;

      .el-input {
        height: 54px;
      }

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
      height: 52px;
      box-shadow: 0 0 0 0.5px var(--el-input-border-color, var(--el-border-color)) inset;

      .el-card__body {
        padding: 12px;
      }

      h3 {
        margin-bottom: 20px;
        width: calc(100% - 90px);
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        .el-tag {
          position: relative;
          bottom: 2px;
        }
      }

      .el-button-group {

        float: right;
      }

      .workspace-info {
        display: none;
      }

      &:hover {
        // height: 220px;
        box-shadow: var(--mytho-theme-color) 0px 0px 0px 2px;

        // .workspace-info {
        //   display: block;
        // }
      }
    }
  }

}
</style>
