<template>
  <VueEditor :editor="editor" class="milk-editor" @keydown.meta="save($event)" @keydown.ctrl="save($event)"
    @click="click" />
</template>

<script lang="ts" setup>
import plugins from "./plugins"
import { Editor, rootCtx, defaultValueCtx, editorView, editorStateCtx, editorViewOptionsCtx } from "@milkdown/core";
import { Ctx, editorViewCtx, serializerCtx } from '@milkdown/core';
import { VueEditor, useEditor, EditorInfo, UseEditorReturn } from "@milkdown/vue";
import { onMounted, watch } from "vue";
import '@milkdown/utils'
import { replaceAll, toggleFile } from "@/components/Editor/utils/toggleFile";
import { currentFile, fTree } from "@/data/configdb";
import { fileTree } from "@/util/fileTree/fileTree";
import { NodeType } from "@/util/fileTree/type";
const fs = require("fs-extra")
let milk: Editor;
let readonly = true;
const editable = () => !readonly;
const click = () => {
  if (currentFile.value == "") {
    fTree.value?.currentFileNode.addChildren(NodeType.FILE)
  }
}
const save = (event: KeyboardEvent) => {
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent);

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

      if (currentFile.value == "") {
        ctx.set(defaultValueCtx, "# 点击创建你的笔记");
        ctx.set(editorViewOptionsCtx, { editable })
      }
      else {
        readonly = false
        ctx.set(editorViewOptionsCtx, { editable })
      }
    })
    .use(plugins())
) as unknown as EditorInfo

watch(() => currentFile.value, (value, oldValue) => {
  milk.action(replaceAll(toggleFile(currentFile.value)))
  readonly = false
  milk.ctx.set(editorViewOptionsCtx, { editable })
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
</style>