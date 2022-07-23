import {MenuItemConstructorOptions} from "electron";
import {fTree} from "@/data/configdb";
import {NodeType} from "@/fileTree/type";
import {fileTree} from "@/fileTree/fileTree";

export const FileListMenu:MenuItemConstructorOptions[]=[
    {
        label: '📓 删除笔记/笔记本', click: function (menuItem, browserWindow, event) {
            fTree.value!.currentFileNode.removeSelf()
            console.log(fTree.value!.currentFileNode);
            console.log(123);

        }
    },
    {
        label: "📒 创建笔记", click: function () {
            fTree.value?.root.addChildren(NodeType.FILE)
        }
    }
]