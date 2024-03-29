<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { appearanceFile } from "@/init/path"
import { appearanceFileDefaultSetting } from "@/config/pi.appearance.default.js"

import { Sunny, Moon } from '@element-plus/icons-vue'
import fs from 'fs'

const restoreDialogVisible = ref(false)
const global_en_fonts = ["Verdana", "Arial", "Times New Roman", "Avenir"]
const global_cn_fonts = ["微软雅黑", "楷体", "宋体", "Avenir"]
const code_fonts = ["Consolas", "Cascadia Code", "Courier"]
const predefineColors = [
  "#9fd7b6", "#8c99aa", "#5a5ec6", "#ed764c", "#ffb11b"
]

let appearance = reactive({
  theme: "",
  color: "",
  global_en_font: "",
  global_cn_font: "",
  code_font: "",
  trotting_horse: "",
  font_size: 16,
  line_height: 1.5,
  paragraph_space: 1.5,
  line_width: 80
})

const readSetting = (appearanceFile: string) => {
  try {
    const data = fs.readFileSync(appearanceFile).toString()
    let JSONData = JSON.parse(data)
    for (let key in JSONData) {
      //@ts-ignore
      appearance[key] = JSONData[key]
    }
  } catch {
    restoreDefault()
  }
}

const saveSetting = () => {
  const data = JSON.stringify(appearance);
  fs.writeFileSync(appearanceFile, data);
  location.reload()
}

const restoreDefault = () => {
  fs.writeFile(appearanceFile, JSON.stringify(appearanceFileDefaultSetting), () => {
    location.reload()
  })
}

let timeout: string | number | NodeJS.Timeout | null | undefined = null

const debounce = (fn: { (): void; (): void }, wait: number | undefined) => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    fn()
  }, wait)
}

onMounted(() => {
  readSetting(appearanceFile)
  watch(appearance, () => {
    debounce(saveSetting, 1000)
  })
})

const formatFontSizeTip = (val: number) => {
  return val + " px"
}

const formatLineHeightTip = (val: number) => {
  return val + " rem"
}

const formatLineWidthTip = (val: number) => {
  return val + " %"
}

const formatParagraphSpaceTip = (val: number) => {
  return val + " rem"
}
</script>

<template>
  <div class="appearance">
    <el-form ref="formRef" :model="appearance" label-width="220px" label-position="left">
      <el-form-item>
        <template #label>
          <i class="bi bi-brightness-alt-high"></i> {{ $t('setting.appearance.theme') }}
        </template>
        <el-switch v-model="appearance.theme" :inactive-icon="Moon" :active-icon="Sunny" inline-prompt />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-paint-bucket"></i> {{ $t('setting.appearance.color') }}
        </template>

        <template v-for="color in predefineColors">
          <el-tooltip :content="$t(`setting.appearance.colors.${color}`)" placement="top" effect="customized"
            :hide-after=0>
            <el-button :color="color" :dark="true" size="small" @click="appearance.color = color" class="color_picker">
            </el-button>
          </el-tooltip>
        </template>
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-lamp"></i> {{ $t('setting.appearance.trotting_horse') }}
        </template>
        <el-switch v-model="appearance.trotting_horse" />
      </el-form-item>

      <el-divider></el-divider>

      <!-- 字体大小 -->
      <!-- <el-form-item>
        <template #label>
          <i class="bi bi-lightning-charge"></i>{{ $t('setting.appearance.font_size') }}
        </template>
        <el-slider v-model="appearance.font_size" :min="12" :max="20" :step="2" :format-tooltip="formatFontSizeTip" />
      </el-form-item> -->

      <!-- 行宽 -->
      <el-form-item>
        <template #label>
          <i class="bi bi-arrows-angle-expand" style="transform: rotate(45deg);"></i> {{
              $t('setting.appearance.line_width')
          }}
        </template>
        <el-slider v-model="appearance.line_width" :min="60" :max="100" :step="10"
          :format-tooltip="formatLineWidthTip" />
      </el-form-item>

      <!-- 行高 -->
      <el-form-item>
        <template #label>
          <i class="bi bi-arrows-expand"></i> {{ $t('setting.appearance.line_height') }}
        </template>
        <el-slider v-model="appearance.line_height" :min="1" :max="2" :step="0.5"
          :format-tooltip="formatLineHeightTip" />
      </el-form-item>

      <el-form-item>
        <template #label>
          <i class="bi bi-justify"></i> {{ $t('setting.appearance.paragraph_space') }}
        </template>
        <el-slider v-model="appearance.paragraph_space" :min="1" :max="2" :step="0.5"
          :format-tooltip="formatParagraphSpaceTip" />
      </el-form-item>

      <el-divider></el-divider>

      <el-form-item>
        <template #label>
          <i class="bi bi-type"></i> {{ $t('setting.appearance.global_en_font') }}
        </template>
        <el-select v-model="appearance.global_en_font">
          <el-option v-for="gf in global_en_fonts" :label="gf" :key="gf" :value="gf">{{ gf }}
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <template #label>
          <i class="bi bi-fonts"></i> {{ $t('setting.appearance.global_cn_font') }}
        </template>
        <el-select v-model="appearance.global_cn_font">
          <el-option v-for="gf in global_cn_fonts" :label="gf" :key="gf" :value="gf">{{ gf }}
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <template #label>
          <i class="bi bi-braces"></i> {{ $t('setting.appearance.code_font') }}
        </template>
        <el-select v-model="appearance.code_font">
          <el-option v-for="cf in code_fonts" :label="cf" :key="cf" :value="cf">{{ cf }}
          </el-option>
        </el-select>
      </el-form-item>

    </el-form>

    <el-button class="default" type="primary" @click="restoreDialogVisible = true">{{ $t("setting.default") }}
    </el-button>

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
  </div>
</template>

<style lang="scss" scoped>
.appearance {
  padding: 1rem;
  text-align: center;
  max-width: 400px;
  margin: auto;
  user-select: none;

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

<style>
.el-switch__core .el-switch__inner {
  transition: none !important;
}

.el-switch .el-icon.is-icon.is-show {
  position: relative;
  right: 18px;
  color: var(--el-color-info);
  z-index: 99;
  font-size: 0.8rem;
}

.el-switch.is-checked .el-icon.is-icon.is-show {
  position: relative;
  left: 19px;
  color: var(--el-color-info);
  z-index: 99;
  font-size: 0.7rem;
}

.color_picker {
  margin-right: 1px !important;
}
</style>
