<template>
  <div class="info">
    <div>
      <!-- <h1>🏛️</h1> -->
      <div>
        <VueEditor :editor="editor" class="abloutEditor" />
      </div>

      <el-button-group class="btns">
        <el-tooltip :content="$t('setting.about.homepage')" placement="bottom" effect="customized" :hide-after=0>
          <el-button text>
            <a href="https://github.com/mytho-team/mytho-note" target="_blank">
              <i class="bi bi-bank"></i>
            </a>
          </el-button>
        </el-tooltip>

        <el-tooltip :content="$t('setting.about.feedback')" placement="bottom" effect="customized" :hide-after=0>
          <el-button text>
            <a href="mailto:mytho-team@outlook.com">
              <i class="bi bi-send"></i>
            </a>
          </el-button>
        </el-tooltip>
      </el-button-group>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { i18n } from "@/plugins/I18n";
import { Editor, rootCtx, defaultValueCtx, editorViewOptionsCtx } from "@milkdown/core";
import { VueEditor, useEditor, EditorInfo } from "@milkdown/vue";
import plugins from '../Editor/plugins';

let milk: Editor;
const editable = () => false;

const editor: EditorInfo = useEditor((root) =>
  milk = Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root);
      ctx.set(defaultValueCtx, i18n.global.t('setting.about.intro'));
      ctx.set(editorViewOptionsCtx, { editable });
    })
    .use(plugins())
) as unknown as EditorInfo

</script>

<style lang="scss" scoped>
.info {
  padding: 1rem;
  width: 80%;
  margin: auto;
  user-select: none;
  height: 100%;

  .el-form-item__label i {
    margin-right: 1rem;
    font-size: 1rem
  }

  h1 {
    margin: 20px;
    font-size: 3rem;
    text-align: center;
  }

  .btns {
    margin: 20px 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>

<style lang="scss">
.abloutEditor {
  .milkdown {
    height: fit-content;
    max-height: 600px;
    box-shadow: none;
  }
}
</style>
