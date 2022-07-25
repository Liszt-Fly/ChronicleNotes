<template>
  <div class="dialog" v-if="dialogVisible">
    <div>添加标签</div>
    <div class="close" @click="dialogVisible=!dialogVisible"><i class="bi bi-x"></i></div>
    <el-divider></el-divider>
    <el-form ref="formData" @submit.prevent="addPreview">
      <el-form-item>
        <el-input v-model="data.input" spellcheck="false" v-on:input="check" placeholder="按回车键在下面进行预览"></el-input>
        <small class="alert" ref="alert" >error:不可重复添加标签</small>
      </el-form-item>
      <el-form-item>
        <el-row class="row"><template v-for="tag in data.tags">
          <el-col :span="8"><el-tag class="tag" closable @close="close(tag)" color="#1abc9c" effect="dark">{{ tag }}</el-tag></el-col>
        </template></el-row>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-row justify="space-between">
      <el-button>取消</el-button>
      <el-button @click="submit">提交</el-button>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {ElInput,ElDivider,ElForm,ElTag,ElButton,ElCol,ElFormItem,ElRow} from'element-plus'
import {reactive, ref} from "vue";
import {fileNode} from "@/fileTree/fileNode";
const props=defineProps({
  dialogVisible:Boolean,
  node:fileNode
})
const alert=ref<HTMLElement|null>()
let shouldInput=ref<Boolean>(true)
let dialogVisible = ref(props.dialogVisible)
let data = reactive({
  input: "",
  tags: ["reading", "error", "C++", "java", "swift", "ue4"]
})
const close = (tag: string) => {
  let index = data.tags.indexOf(tag)
  data.tags.splice(index, 1)
}
const addPreview=()=>{
  if(shouldInput.value){
    data.tags.push(data.input)
  }

}
const submit=()=>{
  //TODO 提交表单
  props.node!.addTag(data.tags)

}
const check=()=>{
  console.log(data.input);
  if(data.tags.some(item=>item==data.input)){
    alert.value!.style.display="inline"
    shouldInput.value=false;
  }
  else{
    alert.value!.style.display="none"
    shouldInput.value=true
  }
}
</script>

<style scoped>
.dialog {
  position: fixed;
  padding: 20px;
  left: 50%;
  top: 30%;
  color: #252525;
  background-color: #F9F9F9;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 500px;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.46);
  height: auto;

}

.close {
  position: absolute;
  right: 10px;
  top: 15px;
  font-size: 20px;
}

.row{
  width:100%
}
.alert{
  display: none;
  color:#e74c3c;
}
</style>