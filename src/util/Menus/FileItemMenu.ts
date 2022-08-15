import { MenuItemConstructorOptions } from "electron";
import { fTree } from "@/data/configdb";
import { NodeType } from "@/util/fileTree/type";
import { i18n } from "@/plugins/I18n/index";

export const FolderMenu: MenuItemConstructorOptions[] = [
    {
        label: i18n.global.t('editor.menu.add_folder'), click: function () {
            fTree.value!.currentFileNode.addChildren(NodeType.FOLDER)
            if (!fTree.value!.currentFileNode.subFolderShow) {
                // console.log(fTree.value!.currentFileNode.data.nameBox!.parentNode!)
                (fTree.value!.currentFileNode.data.nameBox!.parentNode as HTMLDivElement)!.click()
                fTree.value!.currentFileNode.subFolderShow = true
            }
        }
    },
    {
        label: i18n.global.t('editor.menu.add_file'), click: function () {
            fTree.value!.currentFileNode.addChildren(NodeType.FILE)
            if (!fTree.value!.currentFileNode.subFolderShow) {
                // console.log(fTree.value!.currentFileNode.data.nameBox!.parentNode!)
                (fTree.value!.currentFileNode.data.nameBox!.parentNode as HTMLDivElement)!.click()
                fTree.value!.currentFileNode.subFolderShow = true
            }
        }
    },
    {
        label: i18n.global.t('editor.menu.rename'), click: function () {
            fTree.value!.currentFileNode.data.rename!(fTree.value!.currentFileNode.data.nameBox!)
        }
    },
    {
        label: i18n.global.t('editor.menu.move_to_trash'), click: function (menuItem, browserWindow, event) {
            fTree.value!.currentFileNode.removeSelf()
        }
    },
]

export const FileMenu: MenuItemConstructorOptions[] = [
    {
        label: i18n.global.t('editor.menu.rename'), click: function () {
            const rename = fTree.value!.currentFileNode.data.rename!
            rename(fTree.value?.currentFileNode.data.nameBox!)
        }
    },
    // {
    //     label: i18n.global.t('editor.menu.add_tags'), click: function () {
    //         showDialog({ dialogVisible: true, node: fTree.value?.currentFileNode })
    //     }
    // }
    {
        label: i18n.global.t('editor.menu.move_to_trash'), click: function (menuItem, browserWindow, event) {
            fTree.value!.currentFileNode.removeSelf()
        }
    }
]