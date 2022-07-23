import {MenuItemConstructorOptions} from "electron";
import {fTree} from "@/data/configdb";
import {NodeType} from "@/fileTree/type";

export const FolderMenu: MenuItemConstructorOptions[] = [
    {
        label: '📓 删除笔记本', click: function (menuItem, browserWindow, event) {
            fTree.value!.currentFileNode.removeSelf()
        }
    },
    {
        label:"💥 添加笔记本",click:function (){
            fTree.value!.currentFileNode.addChildren(NodeType.FOLDER)
        }},
    {
        label:"💥 添加笔记",click:function (){
            fTree.value!.currentFileNode.addChildren(NodeType.FILE)
        }
    },
    {
        label:"⚡️ 笔记本重命名",click:function(){
            (fTree.value!.currentFileNode.data[0] as Function)()
        }
    }
]

export const FileMenu:MenuItemConstructorOptions[]=[
    {
        label: '📓 删除笔记', click: function (menuItem, browserWindow, event) {
            fTree.value!.currentFileNode.removeSelf()
        }
    },
    {
        label: "⚡️ 笔记重命名", click: function () {
            (fTree.value!.currentFileNode.data[0] as Function)()
        }
    }
]