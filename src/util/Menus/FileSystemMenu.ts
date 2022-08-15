import { MenuItemConstructorOptions } from "electron";
import { fTree } from "@/data/configdb";
import { NodeType } from "@/util/fileTree/type";
import { i18n } from "@/plugins/I18n/index";

export const FileSystemMenu: MenuItemConstructorOptions[] = [
    {
        label: i18n.global.t('editor.menu.add_folder'), click: function () {
            fTree.value!.root.addChildren(NodeType.FOLDER)
        }
    },
    {
        label: i18n.global.t('editor.menu.add_file'), click: function () {
            fTree.value?.root.addChildren(NodeType.FILE)
        }
    }
]