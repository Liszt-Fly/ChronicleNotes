<template>
  <el-card class="panel" shadow="never">
    <h3 class="name">
      <slot></slot>
    </h3>
    <el-divider></el-divider>
    <el-skeleton :rows="2" animated />
  </el-card>
</template>

<script lang="ts" setup>
import { app_config_path } from "@/init/path"
import { onMounted, reactive, watch } from "vue";
const fs = require("fs-extra")

let appConfig = reactive({
  workspaces: []
})

const readSetting = (appConfigPath: string) => {
  try {
    const data = fs.readJsonSync(appConfigPath)
    for (let key in data) {
      //@ts-ignore
      appConfig[key] = data[key]
    }
    console.log(appConfig);
  } catch {
    console.log("workspace读取配置出错")
  }
}

const saveSetting = () => {
  fs.writeJsonSync(app_config_path, appConfig);
}

onMounted(() => {
  readSetting(app_config_path)
  watch(appConfig, () => {
    saveSetting()
  })
})
</script>

<style lang="scss" scoped>
.panel {
  padding: 12px;
  margin: 12px;
  width: 150px;
  height: 200px;

  &:hover {
    box-shadow: var(--pi-theme-color) 0px 0px 0px 4px;
  }
}
</style>