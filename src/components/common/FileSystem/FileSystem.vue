<script setup lang="ts">
import { bClickedParent, currentFile, fTree, menuDisplay, openFiles } from "@/data/configdb";
import { mythoUserPath } from "@/util/init/initPath";
import { fileTree } from "@/util/FileTree/fileTree";
import { NodeType } from "@/util/FileTree/type";
import { fileNode } from "@/util/FileTree/fileNode";
import { FileSystemMenu } from "@/util/Menus/FileSystemMenu";
import { Menu, MenuItem } from "@electron/remote";
import { onMounted, Ref, ref, watch } from "vue";

import FileItem from "@/components/common/FileSystem/FileItem.vue";
import router from "@/router/index";
import path from "path";
const fs = require("fs-extra")

let targetDom: Ref<null | HTMLElement> = ref(null);

const menu = new Menu()

// FileSystemMenu.forEach(item=>{
//   menu.append(new MenuItem(item))
// })
// const showMenu = ($event: any) => {
//   menu.popup()
// }

const isRoot = (event: MouseEvent) => {
  let target = event.target as HTMLElement
  if (!target.parentElement!.classList.contains("item")) {
    const menu = new Menu()
    FileSystemMenu.forEach(item => {
      menu.append(new MenuItem(item))
    })
    menu.popup()
  }
}

const drop = (event: DragEvent) => {
  let filepath = event.dataTransfer?.getData("path") as string
  if (filepath == fTree.value!.root.path) return

  let target = event.target as HTMLElement
  if (!target.classList.contains("item")) {
    let folder = fTree.value!.root

    //* 寻找节点
    let node = fTree.value?.getNode(filepath, fTree.value.root)!
    fs.copySync(node.path, path.resolve(folder.path, node.name))

    //* 节点操作
    let generatedNode = new fileNode(path.resolve(folder.path, node.name), node.name)
    generatedNode.parent = folder
    folder.children!.push(generatedNode)
    node.removeSelf()

  }
}

watch(mythoUserPath, () => {
  fTree.value = new fileTree(
    new fileNode(path.resolve(mythoUserPath.value, "assets"), "assets")
  );
})

onMounted(() => {
  fTree.value = new fileTree(
    new fileNode(path.resolve(mythoUserPath.value, "assets"), "assets")
  );

  setTimeout(() => {
    let folder_item_list = document.getElementsByClassName("item")
    for (let folder_item: HTMLElement of folder_item_list) {
      // console.log(folder_item);
      if (currentFile.value.includes(folder_item.dataset.path)) {
        folder_item.click()
      }
    }
  }, 0)
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
  targetDom.value!.contentEditable = "true";
  targetDom.value!.focus();
  let range = new Range();
  range.setStart(targetDom.value! as Node, 0);
  range.setEnd(targetDom.value! as Node, 1);
  document.getSelection()!.removeAllRanges();
  document.getSelection()!.addRange(range);
};

const duplicate = () => {
  // fTree.value!.currentFileNode.duplicate();
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
  { icon: "bi bi-file-earmark-plus", text: "add_file", func: addFile },
  { icon: "bi bi-folder-plus", text: "add_file", func: addFoler },
  { icon: "bi bi-files", text: "duplicate", func: duplicate },
  { icon: "bi bi-reply", style: "transform: rotate(90deg)", text: "export_PDF", func: exportFile },
  { icon: "bi bi-reply-all", text: "export_all", func: exportDir },
  { icon: "bi bi-input-cursor", text: "rename", func: rename },
  { icon: "bi bi-trash3", text: "move_to_trash", func: remove },
  { icon: "bi bi-pin", text: "pin", func: addTags },
  { icon: "bi bi-bookmarks", text: "add_tags", func: addTags }
]
</script>

<template>
  <div class="file-system " ref="filesystem" @dragover.prevent @drop="drop($event)" @contextmenu="isRoot($event)">
    <el-scrollbar height="calc(100vh - var(--brand-height))" class="root">
      <template v-for="file in fTree?.tree.children" :key="file.path">
        <FileItem :file="file"></FileItem>
      </template>
      <div style="padding-bottom: 40px;"></div>
    </el-scrollbar>
  </div>
</template>
