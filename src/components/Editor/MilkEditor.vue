<template>
  <VueEditor :editor="editor" class="milk-editor" />
</template>
<script lang="ts" setup>
import plugins from "./plugins"
import { Editor, rootCtx, defaultValueCtx } from "@milkdown/core";

import { VueEditor, useEditor } from "@milkdown/vue";
import {onMounted, watch} from "vue";
import '@milkdown/utils'
import {replaceAll, toggleFile} from "@/components/Editor/utils/toggleFile";
import {currentFile} from "@/data/configdb";

let milk:Editor;


const editor = useEditor((root) =>
  milk=Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root);
      ctx.set(defaultValueCtx, "# Milkdown 💖 Vue");
    })
    .use(plugins())
);
watch(()=>currentFile.value,(value,oldValue)=>{
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