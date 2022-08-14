const fs = require("fs-extra")
import path from "path";
import { piUserPath } from "@/util/init/initPath";
import { fileNode } from "@/util/fileTree/fileNode";
import { fileTree } from "@/util/fileTree/fileTree";
import { trashBin } from "@/data/configdb";

let initTrashBin = () => {
    if (!fs.existsSync(path.resolve(piUserPath.value, ".trash"))) {
        fs.mkdirSync(path.resolve(piUserPath.value, ".trash"))
    }
    let trashRoot = new fileNode(path.resolve(piUserPath.value, ".trash"), ".trash")
    trashBin.value = new fileTree(trashRoot)
}