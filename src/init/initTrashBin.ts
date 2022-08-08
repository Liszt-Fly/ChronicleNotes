const fsp=require("fs-extra")
import path from "path";
import {piUserPath} from "@/init/path";
import {fileNode} from "@/FileTree/fileNode";
import {fileTree} from "@/FileTree/fileTree";
import {trashBin} from "@/data/configdb";
let initTrashBin = () => {
    if (!fsp.existsSync(path.resolve(piUserPath, ".trash"))) {
        fsp.mkdirSync(path.resolve(piUserPath, ".trash"))
    }
    let trashRoot = new fileNode(path.resolve(piUserPath, ".trash"), ".trash")
    trashBin.value = new fileTree(trashRoot)

}