<template>
  <VueEditor :editor="editor" class="milk-editor" />
</template>
<script lang="ts" setup>
import plugins from "./plugins"
import { Editor, rootCtx, defaultValueCtx } from "@milkdown/core";
import { gfm } from '@milkdown/preset-gfm'
import { VueEditor, useEditor } from "@milkdown/vue";

const editor = useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root);
      ctx.set(defaultValueCtx, "# Milkdown 💖 Vue");
    })
    .use(plugins())
);

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