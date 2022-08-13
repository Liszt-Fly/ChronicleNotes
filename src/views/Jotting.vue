<template>
  <div class="jotting">
    <el-row :gutter="12">
      <el-col :span="8">
        <div
          shadow="never"
          class="jotting_card jotting_card_add"
          v-if="addJotting"
          @click="addJotting = false"
        >
          <i class="bi bi-plus"></i>
        </div>
        <div shadow="never" class="jotting_card jotting_card_add_text" v-else>
          <el-input
            v-model="jotting_input"
            :rows="6"
            type="textarea"
            resize="none"
            autofocus
            @keydown="saveAddAJotting($event)"
            maxlength="1000"
            show-word-limit
          />
          <el-button
            circle
            key="plain"
            type="primary"
            class="jotting_add_btn"
            @click="addAJotting"
            ><i class="bi bi-plus"></i>
          </el-button>
        </div>
      </el-col>
      <template v-for="(jotting, index) in jottingList" :key="index">
        <el-col :span="8">
          <div shadow="never" class="jotting_card" @click="jotting.show = true">
            <el-scrollbar>
              <p>{{ jotting.text }}</p>
              <div class="msg">
                <el-tag effect="plain"
                  >{{ $t("jottings.word_count") + " " + jotting.text.length }}
                </el-tag>
                <el-tag effect="plain" v-if="jotting.edit_time" class="right-tag"
                  >{{ $t("jottings.edit_time") + " " + jotting.edit_time }}
                </el-tag>
              </div>
            </el-scrollbar>
          </div>

          <el-dialog
            v-model="jotting.show"
            v-if="jotting.show"
            :show-close="false"
            width="60%"
          >
            <el-scrollbar height="60vh">
              <p class="zoom">
                <el-input
                  v-model="jotting.text"
                  type="textarea"
                  resize="none"
                  id="edit_jotting"
                  :autosize="{ maxRows: 14 }"
                  @keydown="saveAJotting($event, jotting)"
                  maxlength="1000"
                  show-word-limit
                />
              </p>
              <div class="jotting_btn">
                <el-tag effect="plain" size="large"
                  >{{ $t("jottings.word_count") + " " + jotting.text.length }}
                </el-tag>
                <el-tag
                  effect="plain"
                  size="large"
                  v-if="jotting.edit_time"
                  class="right-tag"
                  >{{ $t("jottings.edit_time") + " " + jotting.edit_time }}
                </el-tag>

                <el-button-group>
                  <el-tooltip
                    :content="$t('jottings.save')"
                    placement="bottom"
                    effect="customized"
                    :hide-after="0"
                  >
                    <el-button type="primary" @click="editAJotting(jotting)" text>
                      <i class="bi bi-save"></i>
                    </el-button>
                  </el-tooltip>

                  <el-tooltip
                    :content="$t('jottings.export')"
                    placement="bottom"
                    effect="customized"
                    :hide-after="0"
                  >
                    <el-button type="info" text @click="exportAJotting(jotting, index)">
                      <i class="bi bi-box-arrow-up-right"></i>
                    </el-button>
                  </el-tooltip>

                  <el-tooltip
                    :content="$t('jottings.export_as_img')"
                    placement="bottom"
                    effect="customized"
                    :hide-after="0"
                  >
                    <el-button type="info" @click="exportAJottingAsImage(jotting)" text>
                      <i class="bi bi-clipboard-heart"></i>
                    </el-button>
                  </el-tooltip>

                  <el-tooltip
                    :content="$t('jottings.delete')"
                    placement="bottom"
                    effect="customized"
                    :hide-after="0"
                  >
                    <el-button type="danger" @click="deleteAJotting(jotting, index)" text>
                      <i class="bi bi-trash3"></i>
                    </el-button>
                  </el-tooltip>
                </el-button-group>
              </div>
            </el-scrollbar>
          </el-dialog>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { jottings_path } from "@/init/path";
import { assets_path } from "@/init/path";
import { onMounted, Ref, ref } from "vue";
import { ElNotification } from "element-plus";
import { i18n } from "@/plugins/I18n/index";

import path from "path";
const fs = require("fs-extra");

type Tjotting = { path: string; text: string; show: boolean; edit_time: string };

const jottingList: Ref<Tjotting[]> = ref([]);
let jotting_input = ref("");
let addJotting = ref(true);

const loadJottings = () => {
  let jotting_paths = fs.readdirSync(jottings_path.value);

  jotting_paths.forEach((jotting_path: string) => {
    jotting_path = path.resolve(jottings_path.value, jotting_path);
    const jotting_text: string = fs.readFileSync(jotting_path, "utf8");

    let edit_time_str = path.relative(jottings_path.value, jotting_path);
    edit_time_str = edit_time_str.replace("jotting_", "").replace(".jt", "");

    let edit_time = "";
    if (edit_time_str) edit_time = new Date(parseInt(edit_time_str)).toLocaleDateString();

    jottingList.value.push({
      path: jotting_path,
      text: jotting_text,
      show: false,
      edit_time: edit_time,
    });
  });
  // console.log(jottingList);
};

const saveAddAJotting = (e: KeyboardEvent) => {
  // console.log(e.key)
  if ((e.key == "s" || e.key == "S") && e.ctrlKey) {
    addAJotting();
    e.preventDefault();
  }
};

const addAJotting = () => {
  if (jotting_input.value != "") {
    let time = Date.now();
    let edit_time = new Date(time).toLocaleDateString();
    let new_jotting_path = path.resolve(jottings_path.value, "jotting_" + time + ".jt");
    jottingList.value.push({
      path: new_jotting_path,
      text: jotting_input.value,
      show: false,
      edit_time: edit_time,
    });
    fs.writeFileSync(new_jotting_path, jotting_input.value);
    addJotting.value = true;
    jotting_input.value = "";
  }
};

const deleteAJotting = (jotting: Tjotting, index: number) => {
  jotting.show = false;
  fs.unlinkSync(jotting.path);
  jottingList.value.splice(index, 1);
};

const saveAJotting = (e: KeyboardEvent, jotting: Tjotting) => {
  if ((e.key == "s" || e.key == "S") && e.ctrlKey) {
    editAJotting(jotting);
    e.preventDefault();
  }
};

const editAJotting = (jotting: Tjotting) => {
  let time = Date.now();
  let new_jotting_path = path.resolve(jottings_path.value, "jotting_" + time + ".jt");
  let edit_time = new Date(time).toLocaleDateString();

  fs.removeSync(jotting.path);

  jotting.path = new_jotting_path;
  jotting.edit_time = edit_time;

  fs.writeFileSync(jotting.path, jotting.text);
  jotting.show = false;
};

const exportAJotting = (jotting: Tjotting, index: number) => {
  let jotting_markdown_path = path.resolve(
    assets_path.value,
    "jottings",
    path.relative(jottings_path.value, jotting.path).replace(".jt", ".md")
  );
  let content = jotting.text;

  fs.ensureFileSync(jotting_markdown_path);
  fs.writeFileSync(jotting_markdown_path, content);

  deleteAJotting(jotting, index);

  ElNotification({
    message: i18n.global.t("jottings.export_success"),
    duration: 1500,
  });
};

const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  width: number,
  ratio: number
) => {
  let rows: string[] = [];
  let temp = "";

  for (let i = 0; i < text.length; i++) {
    if (text[i] == "\n") {
      rows.push(temp);
      temp = "";
    } else if (ctx.measureText(temp).width * ratio > width) {
      rows.push(temp);
      temp = "";
    }
    temp += text[i];
  }
  rows.push(temp);

  for (let i = 0; i < rows.length; i++) {
    ctx.fillText(rows[i], x, y + (i + 1) * 32);
  }
};

const exportAJottingAsImage = (jotting: Tjotting) => {
  let jotting_textarea = document.getElementById("edit_jotting")!;
  let jotting_styles: CSSStyleDeclaration = window.getComputedStyle(jotting_textarea)!;
  // console.log(window.getComputedStyle(jotting_textarea));

  let c = document.createElement("canvas")!;
  let ratio = 3;

  c.width = 400 * ratio;
  c.height = (jotting_textarea.scrollHeight + jotting_textarea.clientHeight + 20) * ratio;
  // console.log(c.height);

  let ctx = c.getContext("2d")!;

  ctx.scale(ratio, ratio);

  ctx.fillStyle = jotting_styles["background-color"];
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.font = jotting_styles["font-size"] + jotting_styles["font-family"];
  ctx.fillStyle = jotting_styles["color"];
  ctx.textBaseline = "middle";
  drawText(ctx, jotting.text, 8, 8, c.width - 20 * ratio, ratio);

  c.toBlob((blob) => {
    const item = new ClipboardItem({ "image/png": blob! });
    navigator.clipboard.write([item]);

    // console.log(i18n, i18n.locale, i18n.message)

    ElNotification({
      message: i18n.global.t("jottings.export_success"),
      duration: 1500,
    });
  });
};

onMounted(() => {
  loadJottings();
});
</script>

<style lang="scss">
.jotting {
  padding: 12px 20px;
}

.jotting_card {
  white-space: pre-line;
  word-wrap: break-word;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid var(--el-color-info-light-9);
  padding: 4px 8px;
  height: 136px;
  margin-bottom: 12px;
  font-size: 0.9rem;

  .msg {
    position: absolute;
    bottom: 0;
    right: 0;
    background: var(--el-bg-color);
    padding: 0;
  }

  &:hover {
    padding: 3px 7px;
    border: 2px solid var(--el-color-info-light-9);
    cursor: pointer;

    .msg {
      display: none;
    }
  }
}

.jotting_card_add {
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: var(--el-color-info-light-9);
    cursor: pointer;
  }

  i {
    font-size: 1.2rem;
  }
}

.jotting_card_add_text {
  text-align: center;
  padding: 0;
  border: none;

  &:hover {
    padding: 0;
    background-color: var(--el-color-info-light-9);
    cursor: pointer;
    border: none;
  }

  .jotting_add_btn {
    float: right;
    position: relative;
    top: -40px;
    right: 7px;
  }

  .el-input__count {
    top: 5px;
    bottom: auto;
  }
}

.zoom {
  white-space: pre-line;
  font-size: 1.2rem;
}

.jotting_btn {
  margin-top: 12px;

  .el-button-group {
    float: right;
  }
}

.right-tag {
  margin-left: 4px;
}
</style>
