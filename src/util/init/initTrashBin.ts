const fs = require("fs-extra")
import path from "path";
import configInstance from "@/util/configs/config"
import { fileNode } from "@/util/fileTree/fileNode";
import { fileTree } from "@/util/fileTree/fileTree";
import { trashBin } from "@/data/configdb";

let initTrashBin = () => {
    if (!fs.existsSync(path.resolve(configInstance.mythoUserPath.value, ".trash"))) {
        fs.mkdirSync(path.resolve(configInstance.mythoUserPath.value, ".trash"))
    }
    let trashRoot = new fileNode(path.resolve(configInstance.mythoUserPath.value, ".trash"), ".trash")
    trashBin.value = new fileTree(trashRoot)
}