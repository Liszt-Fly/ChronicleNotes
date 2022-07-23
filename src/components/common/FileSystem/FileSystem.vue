<script setup lang="ts">
import path from "path";
import {bClickedParent, currentFile, fTree, menuDisplay, openFiles} from "@/data/configdb";
import {chronicleUserPath} from "@/init/path";
import FileList from "@/components/common/FileSystem/FileList.vue";
import {fileTree} from "@/FileTree/fileTree";
import {NodeType} from "@/FileTree/type";
import {onMounted, Ref, ref} from "vue";
import {fileNode} from "@/FileTree/fileNode";
import router from "@/router/index";
// import {FileSystemMenu} from "@/Menus/FileSystemMenu";

const fsp = require("fs-extra")

const {Menu, MenuItem} = require("@electron/remote")
let targetDom: Ref<null | HTMLElement> = ref(null);


const menu = new Menu()

// FileSystemMenu.forEach(item=>{
//   menu.append(new MenuItem(item))
// })
// const showMenu = ($event: any) => {
//   menu.popup()
// }


const drop = (event: DragEvent) => {
  let filepath = event.dataTransfer?.getData("path") as string
  if (filepath == fTree.value!.root.path) return
  console.log(event.target)
  let target = event.target as HTMLElement
  if (!target.classList.contains("item")) {
    let folder = fTree.value!.root

    //* 寻找节点
    let node = fTree.value?.getNode(filepath, fTree.value.root)!
    fsp.copySync(node.path, path.resolve(folder.path, node.name))

    //* 节点操作
    let generatedNode = new fileNode(path.resolve(folder.path, node.name), node.name)
    generatedNode.parent = folder
    folder.children!.push(generatedNode)
    node.removeSelf()

  }
}

onMounted(() => {
  fTree.value = new fileTree(
      new fileNode(path.resolve(chronicleUserPath, "assets"), "assets")
  );
  if (!fTree.value!.currentFileNode) {
    // fileTree.currentFileNode = fTree.value.root.children![0]
  }
});

const remove = () => {
  openFiles.value.delete(currentFile.value)
  if (openFiles.value.size != 0) {
    currentFile.value = Array.from(openFiles.value).pop()!;
  } else {
    currentFile.value = ""
  }
  fTree.value!.currentFileNode.removeSelf();
  router.push("/Editor")
};

const addTags = () => {
  // dialogVisible.value = true;
};

const rename = () => {
  targetDom!.contentEditable = "true";
  targetDom!.focus();
  let range = new Range();
  range.setStart(targetDom! as Node, 0);
  range.setEnd(targetDom! as Node, 1);
  document.getSelection()!.removeAllRanges();
  document.getSelection()!.addRange(range);
};

const duplicate = () => {
  fTree.value!.currentFileNode.duplicate();
};

const exportFile = () => {
};

const exportDir = () => {
};

const addChildren = (t: NodeType) => {
  if (bClickedParent.value) {
    fTree.value!.root.addChildren(t);
  } else {
    fTree.value!.currentFileNode.addChildren(t);
  }
};

const addFoler = () => {
  addChildren(NodeType.FOLDER)
};

const addFile = () => {
  addChildren(NodeType.FILE)
};

let menu_items = [
  {icon: "bi bi-file-earmark-plus", text: "add_File", func: addFile},
  {icon: "bi bi-folder-plus", text: "add_File", func: addFoler},
  {icon: "bi bi-files", text: "duplicate", func: duplicate},
  {icon: "bi bi-reply", style: "transform: rotate(90deg)", text: "export_PDF", func: exportFile},
  {icon: "bi bi-reply-all", text: "export_all", func: exportDir},
  {icon: "bi bi-input-cursor", text: "rename", func: rename},
  {icon: "bi bi-trash3", text: "move_to_trash", func: remove},
  {icon: "bi bi-pin", text: "pin", func: addTags},
  {icon: "bi bi-bookmarks", text: "add_tags", func: addTags}
]
</script>

<template>
  <div class="file-system" ref="filesystem"
       @dragover.prevent @drop="drop($event)">
    <el-scrollbar height="calc(100vh - var(--brand-height))">
      <template v-for="file in fTree?.tree.children" :key="file.path">
        <file-list :file="file"></file-list>
      </template>
      <div style="padding-bottom: 40px;"></div>
    </el-scrollbar>

  </div>
</template>
