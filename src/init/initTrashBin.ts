const fsp=require("fs-extra")
import path from "path";
import {chronicleUserPath} from "@/init/path";
import {fileNode} from "@/FileTree/fileNode";
import {fileTree} from "@/FileTree/fileTree";
import {trashBin} from "@/data/configdb";
let initTrashBin = () => {
    if (!fsp.existsSync(path.resolve(chronicleUserPath, ".trash"))) {
        fsp.mkdirSync(path.resolve(chronicleUserPath, ".trash"))
    }
    let trashRoot = new fileNode(path.resolve(chronicleUserPath, ".trash"), ".trash")
    trashBin.value = new fileTree(trashRoot)

}