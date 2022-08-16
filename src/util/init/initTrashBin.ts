const fs = require("fs-extra")
import path from "path";
import { mythoUserPath } from "@/util/init/initPath";
import { fileNode } from "@/util/fileTree/fileNode";
import { fileTree } from "@/util/fileTree/fileTree";
import { trashBin } from "@/data/configdb";

let initTrashBin = () => {
    if (!fs.existsSync(path.resolve(mythoUserPath.value, ".trash"))) {
        fs.mkdirSync(path.resolve(mythoUserPath.value, ".trash"))
    }
    let trashRoot = new fileNode(path.resolve(mythoUserPath.value, ".trash"), ".trash")
    trashBin.value = new fileTree(trashRoot)
}