//* 设置文件和文件夹在没有命名的默认名称
import {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {NodeType} from "@/fileTree/type";
import * as path from "path";
import {fileNode} from "@/fileTree/fileNode";
import {fileTree} from "@/fileTree/fileTree";
import {fTree} from "@/data/configdb";

const fsp = require("fs-extra")

function getDefaultName(type: NodeType): string {
    return type == NodeType.FOLDER ? "笔记本" : "笔记"
}

//* 获取不重复的数字
export function getValidNumber(basePath: string, index: number, type: NodeType): number {

    //* 如果是文件夹
    if (type == NodeType.FOLDER) {
        if (fsp.existsSync(path.resolve(basePath, getDefaultName(type) + index.toString()))) {
            return getValidNumber(basePath, index + 1, type)
        }
    }
    //* 如果是文件
    else if (type == NodeType.FILE) {
        if (fsp.existsSync(path.resolve(basePath, getDefaultName(type) + index.toString()) + ".md")) {
            return getValidNumber(basePath, index + 1, type)
        }
    }
    return index;
}

//* 获取用户在当前页面的工作时间
export const getStayTime = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): number => {
    let startTime = Date.now()
    let stayTime = 0
    if (to) {
        if (from.name == "Editor") {
            let note = from.fullPath.substring(8)
            let currentTime = Date.now()
            let stayTime = (currentTime - startTime) / 1000 / 60
            console.log(`${note}, time: ${stayTime}`);
        }
    }
    if (from) {
        startTime = Date.now()
    }
    next()
    return stayTime
}

export function getValidName(basePath: string, type: NodeType): string {
    //文件夹系统
    if (type == NodeType.FOLDER) {
        return `${getDefaultName(type)}${getValidNumber(basePath, 1, type)}`
    }
    //文件系统
    else if (type == NodeType.FILE) {
        return `${getDefaultName(type)}${getValidNumber(basePath, 1, type)}.md`
    } else {
        return "error"
    }
}


export function removeExtName(file: string): string {
    if (path.extname(file)) {
        let remainedLength = file.length - path.extname(file).length + 1
        //截取字符串
        return file.substring(0, remainedLength - 1)
    } else {
        return file
    }
}

export function setCurrentFileNode(file: fileNode,method:Function,) {
    fTree.value!.currentFileNode = file
    fTree.value!.currentFileNode.data.push(method)


}




export let validateFilename = function validateFilename(
    filename: string
): string | undefined {
    //省略扩展名
    let length = filename.length - path.extname(filename).length
    if (filename == ".DS_Store" || filename == ".trash")
        return undefined
    else if (path.extname(filename) == ".md" || path.extname(filename) == "")
        return filename.substring(0, length)
    else return undefined
}