<script setup lang="ts">
import FileSystem from "@/components/common/FileSystem/FileSystem.vue";
import Milkdown from "@/components/Editor/MilkEditor.vue";
import { Ref, ref } from "vue";
import configInstance from "@/util/configs/config"
import { currentFile, currentWorkSpace, fTree } from "@/data/configdb";
import { NodeType } from "@/util/fileTree/type";

const fs = require("fs-extra")
let file_exist: Ref<Boolean> = ref(false)
if (fs.readdirSync(configInstance.assets_path.value).length != 0) {
  file_exist.value = true
}

const addFile = () => {
  let node = fTree.value?.root.addChildren(NodeType.FILE)
  currentFile.value = node!.path
}


const addFolder = () => {
  fTree.value?.root.addChildren(NodeType.FOLDER)
}

fs.watch(configInstance.assets_path.value, () => {
  if (fs.readdirSync(configInstance.assets_path.value).length != 0) {
    file_exist.value = true
  } else {
    file_exist.value = false
  }
})
</script>

<template>
  <div class="column" v-show="currentFile != ''">
    <div class="column-left" v-show="file_exist">
      <!-- 中间调整大小 -->
      <div class="resize-bar"></div>
      <div class="resize-line"></div>
      <!-- 左侧文件系统 -->
      <div class="resize-save">
        <FileSystem></FileSystem>
      </div>
    </div>
    <div class="column-right">
      <!-- 右侧 editor -->

      <div id="milkdown">
        <milkdown></milkdown>
      </div>

    </div>
  </div>

  <template v-if="currentFile == ''">
    <div class="empty_mask">
      <h1 class="icon">🏛️</h1>

      <p class="item">
        <el-button text size="large" @click="addFile">
          <i class="bi bi-file-earmark-plus"></i> {{ $t('editor.menu.add_file') }}
        </el-button>
      </p>

      <p class="item">
        <el-button text size="large" @click="addFolder">
          <i class="bi bi-folder-plus"></i> {{ $t('editor.menu.add_folder') }}
        </el-button>
      </p>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.column {
  overflow: hidden;
  height: 100%;
}

.column-left {
  position: relative;
  float: left;
  height: calc(100vh - var(--brand-height));
}

.column-right {
  overflow: hidden;
  height: calc(100vh - var(--brand-height));

}

.resize-save {
  position: absolute;
  top: 0;
  right: 8px;
  bottom: 0;
  left: 0;
  overflow-x: hidden;
  height: 100vh;
}

.resize-bar {
  height: inherit;
  resize: horizontal;
  cursor: ew-resize;
  cursor: col-resize;
  opacity: 0;
  overflow: scroll;
  max-width: 80vw;
  min-width: 120px;
}

/* 拖拽线 */
.resize-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
}

.resize-bar::-webkit-scrollbar {
  width: 200px;
  height: inherit;
}

#milkdown {
  height: calc(100vh - var(--brand-height));
  overflow: hidden;

}


.empty_mask {
  height: calc(100vh - 48px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  user-select: none;

  .icon {
    font-size: 4rem;
  }

  .item {
    margin-top: 6px;
    width: 100%;

    button {
      width: 60%;
      margin: 0 20%;

      &:focus {
        background-color: var(--el-bg-color) !important;
      }

      &:hover {
        background-color: var(--el-fill-color-light) !important;
      }
    }

    i {
      margin-right: 6px;
    }
  }
}
</style>
