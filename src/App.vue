<script setup lang="ts">
import ControlBar from "@/components/common/ControlBar/ControlBar.vue";
import TabBar from "@/components/common/TabBar.vue";
import Welcome from "@/views/Welcome.vue"
import { chooseWorkspace } from "@/data/configdb"
import { app_config_path, general_config_path } from "@/util/init/initPath"
import { Ref, ref } from "vue";
import { enter_workspace } from "@/util/workspace/workspace"

const fs = require("fs-extra")

const openWith = fs.readJSONSync(general_config_path).openWith
let config: Ref<appConfig> = ref(fs.readJSONSync(app_config_path))

if (openWith == "LastOpenedWorkspace" && config.value.recent != "") {
  const recent_workspace = config.value.recent!
  enter_workspace(recent_workspace as workspace)
}

</script>

<template>
  <control-bar></control-bar>
  <template v-if="!chooseWorkspace">
    <welcome></welcome>
  </template>
  <template v-else>
    <div class="main" spellcheck="false">
      <tab-bar></tab-bar>
      <div class="article">
        <el-scrollbar>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-scrollbar>
      </div>
    </div>
  </template>

</template>

<style lang="scss">
.article {
  width: calc(100% - 48px);
}
</style>
