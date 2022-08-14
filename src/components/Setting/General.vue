<script setup lang="ts">
import { onMounted, reactive, ref, watch, Ref } from 'vue'
import { general_config_path, general_config_path_default } from "@/util/init/initPath"
import { enter_workspace, createWorkspace } from "@/util/workspace/workspace"
import { config } from "@/data/configdb";

const fs = require("fs-extra")

let workspaceName: Ref<string> | any = ref("")
const workspaces = config.value.workspaces
const this_workspace = config.value.recent

const restoreDialogVisible = ref(false)
const autoSaveTimes = [3, 5, 10, 60]
const openOptions = ["LastOpenedWorkspace", "ChooseWorkspace"]

const general = reactive({
  openWith: "",
  devTools: false,
  autoSave: false,
  tooltips: "",
  autoSaveTime: 3,
  locale: "cn"
})

const readSetting = (general_config_path: string) => {
  try {
    const data = fs.readJsonSync(general_config_path)
    for (let key in data) {
      //@ts-ignore
      general[key] = data[key]
    }
  } catch {
    restoreDefault()
  }
}

const saveSetting = () => {
  fs.writeJsonSync(general_config_path, general);
}

const restoreDefault = () => {
  fs.writeJsonSync(general_config_path, fs.readJsonSync(general_config_path_default))
}

onMounted(() => {
  readSetting(general_config_path)
  watch(general, () => {
    saveSetting()
  })
})

const jumpToWorkspace = () => {
  if (workspaces.includes(workspaceName.value))
    enter_workspace(workspaceName.value)
}
</script>

<template>
  <div class="general">
    <el-alert :title="$t('setting.hint')" type="info" center class="setting-hint" />

    <el-form label-width="180px" :model="general" label-position="left">
      <el-form-item>
        <template #label>
          <i class="bi bi-person-workspace"></i> {{ $t('setting.general.workspace') }}
        </template>
        <el-select v-model="workspaceName" allow-create :placeholder="this_workspace.name" filterable
          class="ChooseWorkspaces" @change="jumpToWorkspace">
          <el-option v-for="workspace in workspaces" :key="workspace.name" :label="workspace.name" :value="workspace" />
        </el-select>
        <el-tooltip :content="$t('setting.general.add_workspace')" placement="bottom" effect="customized" :hide-after=0>
          <el-button plain class="createWorkspace" @click="createWorkspace(workspaceName)"
            :disabled="workspaceName.value == ''">
            <i class="bi bi-plus-lg"></i>
          </el-button>
        </el-tooltip>
      </el-form-item>

      <el-form-item>
        <template #label>
          <i class="bi bi-bounding-box-circles"></i> {{ $t('setting.general.open') }}
        </template>
        <el-select v-model="general.openWith">
          <el-option v-for="openOption in openOptions" :label="$t(`setting.general.${openOption}`)" :key="openOption"
            :value="openOption">{{
                $t(`setting.general.${openOption}`)
            }}</el-option>
        </el-select>
      </el-form-item>

      <!-- <el-divider></el-divider> -->

      <el-form-item>
        <template #label>
          <i class="bi bi-translate"></i> {{ $t('setting.general.language') }}
        </template>
        <el-select v-model="general.locale" :placeholder="$t('setting.general.select_language')">
          <el-option v-for="locale in $i18n.availableLocales" :label="locale" :key="`locale-${locale}`" :value="locale">
            {{ $t(`setting.general.${locale}`) }}</el-option>
        </el-select>
      </el-form-item>

      <!-- <el-divider></el-divider>

      <el-form-item>
        <template #label>
          <i class="bi bi-file-earmark-arrow-down"></i> {{ $t('setting.general.autosave') }}
        </template>
        <el-switch v-model="general.autoSave" />
      </el-form-item>

      <el-form-item>
        <template #label>
          <i class="bi bi-stopwatch"></i> {{ $t('setting.general.autosave_interval') }}
        </template>
        <el-select :disabled="!general.autoSave" v-model="general.autoSaveTime" placeholder="Select">
          <el-option v-for="time in autoSaveTimes" :key="time" :label="time + $t('setting.general.interval')"
                     :value="time" />
        </el-select>
      </el-form-item> -->

      <el-divider></el-divider>

      <el-form-item>
        <template #label>
          <i class="bi bi-terminal"></i> {{ $t('setting.general.dev_tools') }}
        </template>
        <el-switch v-model="general.devTools" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-chat-square" style="transform: rotate(180deg); position: relative; bottom: 1px;"></i> {{
              $t('setting.general.tooltips')
          }}
        </template>
        <el-switch v-model="general.tooltips" />
      </el-form-item>
    </el-form>

    <el-button class="default" type="primary" @click="restoreDialogVisible = true">{{ $t("setting.default") }}
    </el-button>

    <el-dialog v-model="restoreDialogVisible" width="300px">
      <span>{{ $t("setting.restore") }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="restoreDialogVisible = false">{{ $t("setting.cancel") }}</el-button>
          <el-button type="primary" @click="restoreDefault(), restoreDialogVisible = false">{{
              $t("setting.sure")
          }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.general {
  padding: 1rem;
  text-align: center;
  max-width: 400px;
  height: 100%;
  margin: auto;
  user-select: none;

  .setting-hint {
    margin-bottom: 20px;
  }

  .ChooseWorkspaces {
    width: 162px;
    margin-right: 8px;
  }

  .createWorkspace {
    width: 32px;
    padding: 5px;

    i {
      margin-right: 0;
    }
  }

  .el-form-item__label i {
    margin-right: 1rem;
    font-size: 1rem
  }

  .default {
    width: 100%;
  }

  .el-dialog__body {
    text-align: center;
  }
}
</style>