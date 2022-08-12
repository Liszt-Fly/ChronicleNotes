<template>
    <div class="jotting">
        <el-row :gutter="12">
            <el-col :span="8">
                <div shadow="never" class="jotting_card jotting_card_add" v-if="addJotting" @click="addJotting = false">
                    <i class="bi bi-plus"></i>
                </div>
                <div shadow="never" class="jotting_card jotting_card_text" v-else>
                    <el-input v-model="jotting_input" :rows="6" type="textarea" resize="none" autofocus />
                    <el-button circle key="plain" type="primary" class="jotting_add_btn" @click="addAJotting"><i
                            class="bi bi-plus"></i>
                    </el-button>
                </div>
            </el-col>
            <template v-for="(jotting, index) in jottingList" :key="index">
                <el-col :span="8">
                    <div shadow="never" class="jotting_card" @click="jotting.fullscreen = true">
                        <el-scrollbar>
                            <p>{{ jotting.text }}</p>
                        </el-scrollbar>
                    </div>
                    <el-dialog v-model="jotting.fullscreen" :fullscreen="true">
                        <el-scrollbar height="80vh">
                            <p class="zoom">
                                <el-input v-model="jotting.text" type="textarea" resize="none" autofocus
                                    :autosize="{ maxRows: 20 }" />
                            </p>
                            <el-button-group class="jotting_btn">
                                <el-button type="danger" @click="deleteAJotting(jotting, index)">
                                    <i class="bi bi-trash3"></i>
                                </el-button>
                                <el-button type="primary" @click="editAJotting(jotting)">
                                    <i class="bi bi-pencil-square"></i>
                                </el-button>
                            </el-button-group>
                        </el-scrollbar>
                    </el-dialog>
                </el-col>
            </template>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { jottings_path } from '@/init/path';
import path from 'path';
import { Ref, ref } from 'vue';
const fs = require("fs-extra")

type Tjotting = { path: string, text: string, fullscreen: boolean }

const jottingList: Ref<Tjotting[]> = ref([])
let jotting_input = ref("")
let addJotting = ref(true)

const loadJottings = () => {

    let jotting_paths = fs.readdirSync(jottings_path)

    jotting_paths.forEach((jotting_path: string) => {
        jotting_path = path.resolve(jottings_path, jotting_path)
        const jotting_text: string = fs.readFileSync(jotting_path, 'utf8')
        jottingList.value.push({ "path": jotting_path, "text": jotting_text, "fullscreen": false })
    });
    // console.log(jottingList);
}

const addAJotting = () => {
    if (jotting_input.value != "") {
        let new_jotting_path = path.resolve(jottings_path, "jotting_" + Date.now() + ".txt")
        jottingList.value.push({ "path": new_jotting_path, "text": jotting_input.value, "fullscreen": false })
        fs.writeFileSync(new_jotting_path, jotting_input.value)
        addJotting.value = true
        jotting_input.value = ""
    }
}

const deleteAJotting = (jotting: Tjotting, index: number) => {
    jotting.fullscreen = false
    fs.unlinkSync(jotting.path)
    jottingList.value.splice(index, 1)
}

const editAJotting = (jotting: Tjotting) => {
    fs.writeFileSync(jotting.path, jotting.text)
    jotting.fullscreen = false
}

loadJottings()

</script>

<style lang="scss">
.jotting {
    padding: 20px;
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

    &:hover {
        padding: 3px 7px;
        border: 2px solid var(--el-color-info-light-9);
        cursor: pointer;
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

.jotting_card_text {
    text-align: center;
    padding: 0;
    border: none;

    &:hover {
        padding: 0;
        background-color: var(--el-color-info-light-9);
        cursor: pointer;
        border: none
    }

    .jotting_add_btn {
        float: right;
        position: relative;
        top: -40px;
        right: 7px;
    }
}

.zoom {
    white-space: pre-line;
    font-size: 1.2rem;
}

.jotting_btn {
    float: right;
    margin-top: 12px;
}
</style>