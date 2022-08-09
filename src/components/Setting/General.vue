<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { generalFile } from "@/init/path"
import { generalFileDefaultSetting } from "@/config/pi.general.default.js"
import fs from 'fs'

const restoreDialogVisible = ref(false)
const autoSaveTimes = [3, 5, 10, 60]
const openOptions = ["lastOpenFile", "workspace"]

const general = reactive({
  pi_path: "",
  openWith: "",
  devTools: false,
  autoSave: false,
  "tooltips": "",
  autoSaveTime: 3,
  locale: "cn"
})

const readSetting = (generalFile: string) => {
  try {
    const data = fs.readFileSync(generalFile).toString()
    let JSONData = JSON.parse(data)
    for (let key in JSONData) {
      //@ts-ignore
      general[key] = JSONData[key]
    }
  } catch {
    restoreDefault()
  }
}

const saveSetting = () => {
  const data = JSON.stringify(general);
  fs.writeFileSync(generalFile, data);
  location.reload()
}

const restoreDefault = () => {

  fs.writeFile(generalFile, JSON.stringify(generalFileDefaultSetting), () => {
    location.reload()
  })
}

const fileChange = () => {
  const fu = document.getElementById('file')
  if (fu == null) return

  console.log("文件夹路径", fu.files[0].webkitRelativePath, fu.files[0].path)
  var webkitRelativePath = fu.files[0].webkitRelativePath
  var path = fu.files[0].path
  var zhenshi = path.substring(0, path.indexOf(webkitRelativePath.split("/")[webkitRelativePath.split("/").length - 1]) - 1)
  console.log("真实路径", zhenshi.replace(/\\/g, '/'))
  pi_path.value = zhenshi.replace(/\\/g, '/')
  print(pi_path.value)
}

const btnChange = () => {
  var file = document.getElementById('file')
  file!.click()
}

let timeout: any = null
//@ts-ignore
const debounce = (fn, wait) => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    fn()
  }, wait)
}

onMounted(() => {
  readSetting(generalFile)
  watch(general, () => {
    debounce(saveSetting, 2000)
  })
})
</script>

<template>
  <div class="general">
    <el-form label-width="180px" :model="general" label-position="left">
      <el-form-item>
        <template #label>
          <i class="bi bi-person-workspace"></i> {{ $t('setting.general.workspaceName') }}
        </template>
        <input type="file" id="file" hidden @change="fileChange" webkitdirectory>
        <el-input placeholder="选择文件夹" v-model="general.pi_path" class="input-with-select" @click="btnChange">
        </el-input>
      </el-form-item>

      <!-- <el-form-item>
        <template #label>
          <i class="bi bi-bounding-box-circles"></i> {{ $t('setting.general.open') }}
        </template>
        <el-select v-model="general.openWith">
          <el-option v-for="openOption in openOptions" :label="openOption" :key="openOption"
                     :value="openOption">{{ $t(`setting.general.${openOption}`) }}</el-option>
        </el-select>
      </el-form-item> -->

      <!-- <el-divider></el-divider> -->

      <el-form-item>
        <template #label>
          <i class="bi bi-translate"></i> {{ $t('setting.general.language') }}
        </template>
        <el-select v-model="general.locale" :placeholder="$t('setting.general.select_language')">
          <el-option v-for="locale in $i18n.availableLocales" :label="locale" :key="`locale-${locale}`" :value="locale">
            {{ $t(`setting.general.${locale}`) }}</el-option>
        </el-select>
      </el-form-item>

      <!-- <el-divider></el-divider>

      <el-form-item>
        <template #label>
          <i class="bi bi-file-earmark-arrow-down"></i> {{ $t('setting.general.autosave') }}
        </template>
        <el-switch v-model="general.autoSave" />
      </el-form-item>

      <el-form-item>
        <template #label>
          <i class="bi bi-stopwatch"></i> {{ $t('setting.general.autosave_interval') }}
        </template>
        <el-select :disabled="!general.autoSave" v-model="general.autoSaveTime" placeholder="Select">
          <el-option v-for="time in autoSaveTimes" :key="time" :label="time + $t('setting.general.interval')"
                     :value="time" />
        </el-select>
      </el-form-item> -->

      <el-divider></el-divider>

      <el-form-item>
        <template #label>
          <i class="bi bi-terminal"></i> {{ $t('setting.general.dev_tools') }}
        </template>
        <el-switch v-model="general.devTools" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <i class="bi bi-chat-square" style="transform: rotate(180deg); position: relative; bottom: 1px;"></i> {{
              $t('setting.general.tooltips')
          }}
        </template>
        <el-switch v-model="general.tooltips" />
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
.general {
  padding: 1rem;
  text-align: center;
  max-width: 400px;
  height: 100%;
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
