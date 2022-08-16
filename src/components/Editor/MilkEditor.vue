<template>

  <VueEditor :editor="editor" :class="['milk-editor']" @keydown.meta="save($event)" @keydown.ctrl="save($event)"
    v-show="currentFile != ''" />
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

<script lang="ts" setup>
import { findCurrentWorkSpace } from "@/util/workspace/workspace"
import plugins from "./plugins"
import { Editor, rootCtx, defaultValueCtx, editorView, editorStateCtx, editorViewOptionsCtx } from "@milkdown/core";
import { Ctx, editorViewCtx, serializerCtx } from '@milkdown/core';
import { VueEditor, useEditor, EditorInfo, UseEditorReturn } from "@milkdown/vue";
import { onMounted, watch, watchEffect } from "vue";
import '@milkdown/utils'
import { replaceAll, toggleFile } from "@/components/Editor/utils/toggleFile";
import { currentFile, currentWorkSpace, fTree } from "@/data/configdb";
import { fileTree } from "@/util/fileTree/fileTree";
import { NodeType } from "@/util/fileTree/type";
import { getGlobal } from "@electron/remote";
import { getMarkdownContentWithoutHeader } from "@/util/Helper";
import conifgInstance from "@/util/configs/config"
const fs = require("fs-extra")

const addFolder = () => {
  fTree.value?.root.addChildren(NodeType.FOLDER)
}

const showHistoryArticleOrHidden = () => {
  //读取对应的配置
  let config: appConfig = conifgInstance.readAppConfig()
  if (findCurrentWorkSpace() != -1) {
    currentFile.value = config.workspaces[findCurrentWorkSpace()].lastOpenFile
  }
  return currentFile.value
}


let milk: Editor;
showHistoryArticleOrHidden()

const addFile = () => {
  let node = fTree.value?.root.addChildren(NodeType.FILE)
  currentFile.value = node!.path
}

const save = (event: KeyboardEvent) => {
  if (event.key == "s") {
    let ctx = milk.ctx
    const view = ctx.get(editorViewCtx);
    const serializer = ctx.get(serializerCtx);
    fs.writeFileSync(currentFile.value, serializer(view.state.doc), { encoding: "utf-8" })
  }
}

const editor: EditorInfo = useEditor((root) =>
  milk = Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root);
      if (currentFile.value != "") {
        ctx.set(defaultValueCtx, getMarkdownContentWithoutHeader(currentFile.value));
      }
      else {
        ctx.set(defaultValueCtx, "");
      }
    })
    .use(plugins())
) as unknown as EditorInfo

watch(() => currentFile.value, (value, oldValue) => {

  //设置当前激活的文件
  if (currentFile.value != "") { milk.action(replaceAll(toggleFile(currentFile.value))) }

  // 保存最近读取的文件
  let config = conifgInstance.readAppConfig()
  config.workspaces[findCurrentWorkSpace()].lastOpenFile = currentFile.value;
  (config.recent as workspace).lastOpenFile = currentFile.value;
  conifgInstance.writeAppConfig(config)
})
</script>

<script lang="ts">

export default {
  name: "Milkdown",
}
</script>

<style lang="scss">
.milk-editor {
  width: 100%;
  height: 100%;
}

.empty_mask {
  height: 100%;
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