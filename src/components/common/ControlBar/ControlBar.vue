<template>
  <div class="control">

    <div v-if="!isMac && chooseWorkspace">

      <el-button-group>
        <el-tooltip :content="sideBar ? $t('control.hide_sidebar') : $t('control.show_sidebar')" placement="bottom"
          effect="customized" :hide-after=0>
          <el-button key="plain" text @click="ToggleSidebar" class="controlIcon">
            <i class="bi bi-window-sidebar" v-if="sideBar"></i>
            <i class="bi bi-window" v-else></i>
          </el-button>
        </el-tooltip>

        <template class="devTools">
          <!-- <el-tooltip :content="$t('control.refresh')" placement="bottom" effect="customized" :hide-after=0>
            <el-button class="controlIcon" key="plain" text @click="Refresh">
              <i class="bi bi-bootstrap-reboot"></i>
            </el-button>
          </el-tooltip> -->

          <el-tooltip :content="$t('control.toggle_devTools')" placement="bottom" effect="customized" :hide-after=0>
            <el-button class="controlIcon" key="plain" text @click="ToggleDevTools">
              <i class="bi bi-terminal"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-button-group>
    </div>

    <!-- <div class="tabs" :style="!isMac && winMax ? '' : 'padding-left: 72px;'">
      <OpenFileTabs></OpenFileTabs>
    </div> -->

    <div class="brand">
    </div>

    <div class="btn-groups" v-if="!isMac">
      <el-button-group>
        <el-tooltip :content="$t('control.minimise')" placement="bottom" effect="customized" :hide-after=0>
          <el-button key="plain" text @click="minWindow">
            <i class="bi bi-dash-lg"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip :content="isWindowMax ? $t('control.maximise') : $t('control.restore')" placement="bottom"
          effect="customized" :hide-after=0>
          <el-button key="plain" text @click="maxRestoreWindow">
            <i class="bi bi-square" v-if="!isWindowMax"></i>
            <i class="bi bi-files" v-else style="transform: scaleX(1.3)"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip :content="$t('control.close')" placement="bottom" effect="customized" :hide-after=0>
          <el-button key="plain" text @click="closeWindow" class="danger">
            <i class="bi bi-x-lg" @click=""></i>
          </el-button>
        </el-tooltip>
      </el-button-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import OpenFileTabs from "@/components/common/ControlBar/OpenFileTabs.vue"
import { chooseWorkspace } from "@/data/configdb"
import { assets_path } from "@/util/init/initPath";
import { ipcRenderer } from 'electron'
import { ref } from 'vue'
const fs = require("fs-extra")

let isWindowMax = ref(false)
let sideBar = ref(true)
const isMac = /macintosh|mac os x/i.test(navigator.userAgent);

const minWindow = () => {
  ipcRenderer.send('min-app')
}

const closeWindow = () => {
  ipcRenderer.send('close-app')
}

const maxRestoreWindow = () => {
  ipcRenderer.send('window-max');
  isWindowMax.value = !isWindowMax.value
}

const Refresh = () => {
  location.reload()
}

const ToggleDevTools = () => {
  ipcRenderer.send('devTools');
}

const ToggleSidebar = () => {
  sideBar.value = !sideBar.value

  let tab = document.getElementsByClassName("tab-system")[0] as HTMLDivElement;
  let fileSystem = document.getElementsByClassName("column-left")[0] as HTMLDivElement;

  if (tab) {
    // 隐藏侧栏
    if (tab.style.display != "none") {
      tab.style.display = "none"
      fileSystem.style.display = "none"
    }
    // 显示侧栏
    else {
      tab.style.display = "flex"
      if (fs.readdirSync(assets_path.value).length != 0) { fileSystem.style.display = "block" }
    }
  }
}
</script>

<style lang="scss" scoped>
.control {
  height: 38px;
  font-size: 1rem;
  font-weight: 900;
  user-select: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .el-button.is-text:not(.is-disabled):focus {
    background-color: var(--el-bg-color);
  }

  .el-button.is-text:not(.is-disabled):focus:hover {
    background-color: var(--el-fill-color-light);
  }

  .el-button.is-text:not(.is-disabled).danger:hover {
    background-color: red;
    color: white;
  }

  .bi-back {
    transform: rotate(270deg);
    position: relative;
    bottom: 1px;
  }

  .tabs {
    max-width: calc(100vw - 300px);
  }

  .brand {
    height: 38px;
    -webkit-app-region: drag;
    user-select: none;
    display: inline-block;
    flex: 1;
    text-align: center;
    color: var(--mytho-theme-color);
    font-size: 0.9rem;
    line-height: 2.5;

    span {
      font-weight: 900;
    }
  }

  .btn-groups {
    .el-button {
      padding: 12px;
      font-size: 0.7rem;
    }
  }

  .el-button+.el-button {
    margin-left: 0;
  }

  .controlIcon {
    font-size: 1rem;
    padding-left: 16px;
  }
}
</style>
