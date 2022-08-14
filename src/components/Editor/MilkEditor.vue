<template>

  <VueEditor :editor="editor" :class="['milk-editor']" @keydown.meta="save($event)" @keydown.ctrl="save($event)"
    v-show="currentFile != ''" />
  <template v-if="currentFile == ''">
    <div class="container">
      <H2 class="button" @click="click">Click Me to add new Note</H2>
    </div>
  </template>
</template>

<script lang="ts" setup>
import plugins from "./plugins"
import { Editor, rootCtx, defaultValueCtx, editorView, editorStateCtx, editorViewOptionsCtx } from "@milkdown/core";
import { Ctx, editorViewCtx, serializerCtx } from '@milkdown/core';
import { VueEditor, useEditor, EditorInfo, UseEditorReturn } from "@milkdown/vue";
import { onMounted, watch, watchEffect } from "vue";
import '@milkdown/utils'
import { replaceAll, toggleFile } from "@/components/Editor/utils/toggleFile";
import { currentFile, fTree } from "@/data/configdb";
import { fileTree } from "@/util/fileTree/fileTree";
import { NodeType } from "@/util/fileTree/type";

const fs = require("fs-extra")
let milk: Editor;
const click = () => {
  let node = fTree.value?.currentFileNode.addChildren(NodeType.FILE)

  currentFile.value = node!.path


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
      ctx.set(defaultValueCtx, "");
    })
    .use(plugins())
) as unknown as EditorInfo

watch(() => currentFile.value, (value, oldValue) => {
  console.log('currentFile.value', currentFile.value)
  milk.action(replaceAll(toggleFile(currentFile.value)))

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

.container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button {
  cursor: pointer;
  user-select: none;
}
</style>