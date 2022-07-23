import { MenuItem } from "@electron/remote";
import { MenuItemConstructorOptions } from "electron";
import { fTree } from "@/data/configdb";
import { NodeType } from "@/fileTree/type";

export const FileSystemMenu: MenuItemConstructorOptions[] = [
    {
        label: '📓 创建笔记本', click: function () {
            fTree.value!.root.addChildren(NodeType.FOLDER)
        }
    },
    {
        label: "📒 创建笔记", click: function () {
            fTree.value?.root.addChildren(NodeType.FILE)
        }
    }
]