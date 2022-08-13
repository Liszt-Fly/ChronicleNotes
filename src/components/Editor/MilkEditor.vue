<template>
  <VueEditor :editor="editor" class="milk-editor" @keydown.meta="save($event)" @keydown.ctrl="save($event)" />
</template>

<script lang="ts" setup>
import plugins from "./plugins"
import { Editor, rootCtx, defaultValueCtx, editorView, editorStateCtx } from "@milkdown/core";
import { Ctx, editorViewCtx, serializerCtx } from '@milkdown/core';
import { VueEditor, useEditor } from "@milkdown/vue";
import { onMounted, watch } from "vue";
import '@milkdown/utils'
import { replaceAll, toggleFile } from "@/components/Editor/utils/toggleFile";
import { currentFile } from "@/data/configdb";
const fsp = require("fs-extra")
let milk: Editor;

const save = (event: KeyboardEvent) => {
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent);

  if (event.key == "s") {
    console.log(milk.ctx.get(editorStateCtx));
    let ctx = milk.ctx
    const view = ctx.get(editorViewCtx);
    const serializer = ctx.get(serializerCtx);
    fsp.writeFileSync(currentFile.value, serializer(view.state.doc), { encoding: "utf-8" })
  }
}

const editor = useEditor((root) =>
  milk = Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root);
      ctx.set(defaultValueCtx, "");
    })
    .use(plugins())
);
watch(() => currentFile.value, (value, oldValue) => {
  console.log("change");
  milk.action(replaceAll(toggleFile(currentFile.value)))
})
</script>
<script lang="ts">
export default {
  name: "Milkdown"
}
</script>

<style lang="scss">
.milk-editor {
  width: 100%;
  height: 100%;
}
</style>