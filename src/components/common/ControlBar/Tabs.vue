<template>
  <el-scrollbar>
    <div class="scrollbar-flex-content">
      <el-tag v-for="file in openFiles" effect="plain" :key="file" closable type="info"
              @click="toggleCurrentFile(file)" class="tab-item" @close="remove(file)"
              :class="{ 'tab-item-active': file === currentFile }">
        {{ path.relative(path.join(piUserPath, "assets"), file).replaceAll("\\", "/").slice(0, -3) }}
      </el-tag>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { openFiles, currentFile } from "@/data/configdb"
import { piUserPath } from "@/init/path"
import path from 'path'
import router from "@/router";

let toggleCurrentFile = (file: string) => {
  currentFile.value = file
  router.push(`/Editor/${path.relative(path.join(piUserPath, "assets"), file).replaceAll("\\", "/")}`)
}

let remove = (file: string) => {
  openFiles.value.delete(file)
  if (openFiles.value.size != 0)
    currentFile.value = Array.from(openFiles.value).pop()!;
  else
    currentFile.value = "";
}
</script>

<style lang="scss" scoped>
.scrollbar-flex-content {
  display: flex;
  padding: 0 4px;
}

.tab-item {
  cursor: pointer;
  padding-right: 25px !important;
  margin: 4px 2px;
  box-sizing: border-box;
  border: 2px solid var(--el-tag-bg-color);

  &:hover {
    background-color: var(--el-tag-bg-color);
    border: 2px solid var(--el-color-info-light-9);
    color: var(--pi-theme-color);
    padding-right: 5px !important;
  }
}


.tab-item-active {
  background-color: var(--pi-theme-color);
  color: var(--el-bg-color);
  border: 2px solid var(--pi-theme-color);

  &:hover {
    background-color: var(--el-color-info-light-9);
    border: 2px solid var(--pi-theme-color);
  }
}
</style>

<style>
.tab-item .el-icon.el-tag__close {
  display: none;
}

.tab-item:hover .el-icon.el-tag__close {
  display: inline-flex;
}
</style>
