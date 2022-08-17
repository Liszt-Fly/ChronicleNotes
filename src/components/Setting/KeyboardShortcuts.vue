<template>
  <div class="keyboard_shortcuts">
    <el-alert :title="$t('setting.hint')" type="info" center class="setting-hint" />

    <el-form :model="keyboard_shortcuts" label-width="200px" label-position="left">
      <el-form-item>
        <template #label>
          <i class="bi bi-type-h1"></i> {{ $t('setting.keyboard_shortcuts.h1') }}
        </template>
        <el-input v-model="keyboard_shortcuts.h1" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-type-h2"></i> {{ $t('setting.keyboard_shortcuts.h2') }}
        </template>
        <el-input v-model="keyboard_shortcuts.h2" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-type-h3"></i> {{ $t('setting.keyboard_shortcuts.h3') }}
        </template>
        <el-input v-model="keyboard_shortcuts.h3" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-sort-up"></i> {{ $t('setting.keyboard_shortcuts.h_up') }}
        </template>
        <el-input v-model="keyboard_shortcuts.h_up" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-sort-down"></i> {{ $t('setting.keyboard_shortcuts.h_down') }}
        </template>
        <el-input v-model="keyboard_shortcuts.h_down" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-paragraph"></i> {{ $t('setting.keyboard_shortcuts.paragraph') }}
        </template>
        <el-input v-model="keyboard_shortcuts.paragraph" />
      </el-form-item>

      <el-divider></el-divider>

      <el-form-item>
        <template #label>
          <i class="bi bi-type-bold"></i> {{ $t('setting.keyboard_shortcuts.bold') }}
        </template>
        <el-input v-model="keyboard_shortcuts.bold" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-type-italic"></i> {{ $t('setting.keyboard_shortcuts.italics') }}
        </template>
        <el-input v-model="keyboard_shortcuts.italics" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-code"></i> {{ $t('setting.keyboard_shortcuts.code') }}
        </template>
        <el-input v-model="keyboard_shortcuts.code" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-type-underline"></i> {{ $t('setting.keyboard_shortcuts.underline') }}
        </template>
        <el-input v-model="keyboard_shortcuts.underline" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-type-strikethrough"></i> {{ $t('setting.keyboard_shortcuts.strikethrough') }}
        </template>
        <el-input v-model="keyboard_shortcuts.strikethrough" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-file-fill" style="transform: rotate(90deg);"></i> {{
          $t('setting.keyboard_shortcuts.highlight')
          }}
        </template>
        <el-input v-model="keyboard_shortcuts.highlight" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-text-indent-left"></i> {{ $t('setting.keyboard_shortcuts.indent_right') }}
        </template>
        <el-input v-model="keyboard_shortcuts.indent_right" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-text-indent-right"></i> {{ $t('setting.keyboard_shortcuts.indent_left') }}
        </template>
        <el-input v-model="keyboard_shortcuts.indent_left" />
      </el-form-item>

      <el-divider></el-divider>

      <el-form-item>
        <template #label>
          <i class="bi bi-card-image"></i> {{ $t('setting.keyboard_shortcuts.insert_img') }}
        </template>
        <el-input v-model="keyboard_shortcuts.insert_img" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-table"></i> {{ $t('setting.keyboard_shortcuts.insert_table') }}
        </template>
        <el-input v-model="keyboard_shortcuts.insert_table" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-quote"></i> {{ $t('setting.keyboard_shortcuts.insert_quote') }}
        </template>
        <el-input v-model="keyboard_shortcuts.insert_quote" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-code-square"></i> {{ $t('setting.keyboard_shortcuts.insert_code') }}
        </template>
        <el-input v-model="keyboard_shortcuts.insert_code" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-infinity"></i> {{ $t('setting.keyboard_shortcuts.insert_formula') }}
        </template>
        <el-input v-model="keyboard_shortcuts.insert_formula" />
      </el-form-item>

      <el-divider></el-divider>

      <el-form-item>
        <template #label>
          <i class="bi bi-list-columns-reverse"></i> {{ $t('setting.keyboard_shortcuts.all') }}
        </template>
        <el-input v-model="keyboard_shortcuts.all" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-arrow-return-left" style="transform: rotateX(180deg); position: relative; bottom: 2px;"></i>
          {{ $t('setting.keyboard_shortcuts.undo') }}
        </template>
        <el-input v-model="keyboard_shortcuts.undo" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-arrow-return-right" style="transform: rotateX(180deg); position: relative; bottom: 2px;"></i>
          {{ $t('setting.keyboard_shortcuts.redo') }}
        </template>
        <el-input v-model="keyboard_shortcuts.redo" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-clipboard-check"></i> {{ $t('setting.keyboard_shortcuts.copy') }}
        </template>
        <el-input v-model="keyboard_shortcuts.copy" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-clipboard-plus"></i> {{ $t('setting.keyboard_shortcuts.copy_markdown') }}
        </template>
        <el-input v-model="keyboard_shortcuts.copy_markdown" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-clipboard-minus"></i> {{ $t('setting.keyboard_shortcuts.paste') }}
        </template>
        <el-input v-model="keyboard_shortcuts.paste" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-clipboard"></i> {{ $t('setting.keyboard_shortcuts.paste_txt') }}
        </template>
        <el-input v-model="keyboard_shortcuts.paste_txt" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-clipboard-x"></i> {{ $t('setting.keyboard_shortcuts.cut') }}
        </template>
        <el-input v-model="keyboard_shortcuts.cut" />
      </el-form-item>

      <el-divider></el-divider>

      <el-form-item>
        <template #label>
          <i class="bi bi-file-earmark-plus"></i> {{ $t('setting.keyboard_shortcuts.new_file') }}
        </template>
        <el-input v-model="keyboard_shortcuts.new_file" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-save"></i> {{ $t('setting.keyboard_shortcuts.save_file') }}
        </template>
        <el-input v-model="keyboard_shortcuts.save_file" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-save2"></i> {{ $t('setting.keyboard_shortcuts.save_as') }}
        </template>
        <el-input v-model="keyboard_shortcuts.save_as" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-x-circle"></i> {{ $t('setting.keyboard_shortcuts.close_file') }}
        </template>
        <el-input v-model="keyboard_shortcuts.close_file" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-lock"></i> {{ $t('setting.keyboard_shortcuts.lock_file') }}
        </template>
        <el-input v-model="keyboard_shortcuts.lock_file" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-unlock"></i> {{ $t('setting.keyboard_shortcuts.unlock_file') }}
        </template>
        <el-input v-model="keyboard_shortcuts.unlock_file" />
      </el-form-item>

      <el-divider></el-divider>

      <el-form-item>
        <template #label>
          <i class="bi bi-arrows-fullscreen"></i> {{ $t('setting.keyboard_shortcuts.full_sreen') }}
        </template>
        <el-input v-model="keyboard_shortcuts.full_sreen" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-search"></i> {{ $t('setting.keyboard_shortcuts.search') }}
        </template>
        <el-input v-model="keyboard_shortcuts.search" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-binoculars"></i> {{ $t('setting.keyboard_shortcuts.global_search') }}
        </template>
        <el-input v-model="keyboard_shortcuts.global_search" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-intersect"></i> {{ $t('setting.keyboard_shortcuts.replace') }}
        </template>
        <el-input v-model="keyboard_shortcuts.replace" />
      </el-form-item>
    </el-form>

    <el-button class="default" type="primary" @click="restoreDialogVisible = true">{{ $t("setting.default") }}
    </el-button>
  </div>

  <el-dialog v-model="restoreDialogVisible" width="300px">
    <span>{{ $t("setting.restore") }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="restoreDialogVisible = false">{{ $t("setting.cancel") }}</el-button>
        <el-button type="primary" @click="restoreDefault(), restoreDialogVisible = false">{{
        $t("setting.sure")
        }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import configInstance from "@/util/configs/config"
const fs = require("fs-extra")

const restoreDialogVisible = ref(false)

const keyboard_shortcuts = reactive({
  h1: 'Ctrl+1',
  h2: 'Ctrl+2',
  h3: 'Ctrl+3',
  h_up: 'Ctrl+"+"',
  h_down: 'Ctrl+"-"',
  paragraph: 'Ctrl+0',

  bold: 'Ctrl+B',
  underline: 'Ctrl+U',
  italics: 'Ctrl+I',
  strikethrough: 'Ctrl+D',
  highlight: 'Ctrl+Shift+H',
  code: 'Ctrl+`',
  indent_right: 'Tab',
  indent_left: 'Shift+Tab',

  insert_img: 'Ctrl+Shift+I',
  insert_table: 'Ctrl+T',
  insert_code: 'Ctrl+Shift+`',
  insert_formula: 'Ctrl+Shift+F',
  insert_quote: 'Ctrl+Shift+Q',

  all: 'Ctrl+A',
  undo: 'Ctrl+Z',
  redo: 'Ctrl+Shift+Z',
  copy: 'Ctrl+C',
  copy_markdown: 'Ctrl+Shift+C',
  paste: 'Ctrl+V',
  paste_txt: 'Ctrl+Shift+V',
  cut: 'Ctrl+X',

  new_file: 'Ctrl+N',
  save_file: 'Ctrl+S',
  save_as: 'Ctrl+Shift+S',
  close_file: 'Ctrl+W',
  lock_file: 'Ctrl+L',
  unlock_file: 'Ctrl+Shift+L',

  full_sreen: 'F11',
  search: 'Ctrl+F',
  global_search: 'Ctrl+Shift+F',
  replace: 'Ctrl+H'
})

const readSetting = (keyboard_shortcuts_config_path: string) => {
  try {
    const data = fs.readJsonSync(keyboard_shortcuts_config_path)
    for (let key in data) {
      // @ts-ignore
      keyboard_shortcuts[key] = data[key]
    }
  } catch {
    restoreDefault()
  }
}

const saveSetting = () => {
  fs.writeJsonSync(configInstance.keyboard_shortcuts_config_path, keyboard_shortcuts);
}

const restoreDefault = () => {
  fs.writeJsonSync(configInstance.keyboard_shortcuts_config_path, fs.readJsonSync(configInstance.keyboard_shortcuts_config_path_default))
}

onMounted(() => {
  readSetting(configInstance.keyboard_shortcuts_config_path)
  watch(keyboard_shortcuts, () => {
    saveSetting()
  })
})
</script>

<style lang="scss" scoped>
.keyboard_shortcuts {
  padding: 1rem;
  text-align: center;
  max-width: 400px;
  margin: auto;
  user-select: none;

  .setting-hint {
    margin-bottom: 20px;
  }

  .el-form-item__label i {
    margin-right: 1rem;
    font-size: 1rem
  }

  .default {
    width: 100%;
  }

  .el-dialog__body {
    text-align: center;
  }
}
</style>
