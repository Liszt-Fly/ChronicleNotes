import { MenuItemConstructorOptions } from "electron";
import { fTree } from "@/data/configdb";
import { NodeType } from "@/fileTree/type";
import showDialog from "@/hooks/useDialog"
export const FolderMenu: MenuItemConstructorOptions[] = [
    {
        label: '🗑️ 删除', click: function (menuItem, browserWindow, event) {
            fTree.value!.currentFileNode.removeSelf()
        }
    },
    {
        label: "💥 添加笔记本", click: function () {
            fTree.value!.currentFileNode.addChildren(NodeType.FOLDER)
        }
    },
    {
        label: "💥 添加笔记", click: function () {
            fTree.value!.currentFileNode.addChildren(NodeType.FILE)
        }
    },
    {
        label: "⚡️ 笔记本重命名", click: function () {
            console.log(fTree.value!.currentFileNode.data);
            fTree.value!.currentFileNode.data.rename!(fTree.value!.currentFileNode.data.nameBox!)
        }
    }
]

export const FileMenu: MenuItemConstructorOptions[] = [
    {
        label: '🗑️ 删除', click: function (menuItem, browserWindow, event) {
            fTree.value!.currentFileNode.removeSelf()
        }
    },
    {
        label: "⚡️ 笔记重命名", click: function () {

            const rename = fTree.value!.currentFileNode.data.rename!

            rename(fTree.value?.currentFileNode.data.nameBox!)

        }
    },
    {
        label: "✈️ 添加标签", click: function () {
            showDialog({ dialogVisible: true, node: fTree.value?.currentFileNode })
        }
    }
]