import { NodeType } from "./type"
import { getValidName, removeExtName } from "@/util/Helper"
import { resolve, parse } from "path"

import deepClone from "deep-clone"
import { currentFile } from "@/data/configdb"
import { app_config_path } from "@/util/init/initPath"
import { findCurrentWorkSpace } from "@/util/workspace/workspace"

const matter = require("gray-matter")
const fs = require("fs-extra")

export class fileNode {
    //* property
    name: string
    path: string
    //@ts-ignore
    stat: fs.Stats
    createdDate: Date
    modifiedDate: Date
    type: NodeType
    tags: string[]
    parent: fileNode | null
    children?: fileNode[] | null
    data: data
    subFolderShow: boolean

    //* constructor
    constructor(path: string, name: string) {
        this.data = {}
        this.stat = fs.statSync(path)
        this.name = name
        this.path = path
        this.createdDate = this.stat.ctime
        this.modifiedDate = this.stat.mtime
        this.type = this.stat.isDirectory() ? NodeType.FOLDER : NodeType.FILE
        this.tags = []
        this.parent = null
        this.subFolderShow = false
        if (this.type == NodeType.FOLDER) {
            this.children = []
        }
        this.checkValidateFrontMatter()
    }

    //* methods
    addChildren(createdType: NodeType) {
        let name = getValidName(this.path, createdType)
        if (this.type == NodeType.FOLDER) {
            //sum 两种情况，添加文件夹或者是添加子文件
            if (createdType == NodeType.FOLDER) {
                fs.mkdirsSync(resolve(this.path, name))
            } else if (createdType == NodeType.FILE) {
                fs.createFileSync(resolve(this.path, name))
            }
        }
        let node: fileNode = new fileNode(resolve(this.path, name), name)
        this.children!.push(node)
        node.parent = this
        return node
    }

    //* 删除
    removeSelf() {
        fs.removeSync(this.path)

        if (currentFile.value == this.path) {
            currentFile.value = ""

            let config: appConfig = fs.readJSONSync(app_config_path)
            config.workspaces[findCurrentWorkSpace()].lastOpenFile = "";
            (config.recent as workspace).lastOpenFile = "";
            fs.writeJSONSync(app_config_path, config)
        }
        //* 情况为文件夹的情形
        if (this.type == NodeType.FOLDER) {
            if (this.parent) {
                this.parent.children = this.parent.children!.filter(item => item.name != this.name)
            }
        }
        //* 情况为文件
        else if (this.type == NodeType.FILE) {
            if (this.parent) {
                this.parent.children = this.parent.children!.filter(item => item.name != this.name)
            }
        }
    }

    //* 重命名
    rename(newName: string) {
        console.log("执行了 rename")
        console.log(newName);

        this.name = newName
        let prevPath = this.path
        let obj = parse(this.path)
        if (this.type == NodeType.FILE) {
            obj.base = newName + ".md"
        } else {
            obj.base = newName
        }
        obj.name = newName
        //更新
        this.path = resolve(obj.dir, obj.base)
        fs.renameSync(prevPath, this.path)
    }

    //* 替身
    substitute() {
        let name
        let path
        if (this.type == NodeType.FILE) {
            name = removeExtName(this.name) + "的副本"
            path = resolve(parse(this.path).dir, name + ".md")
            fs.copySync(this.path, path)
        } else {
            name = this.name + "的副本"
            path = resolve(parse(this.path).dir, name)

            fs.copySync(this.path, path)

        }
        let children = deepClone(this.children)
        let node = new fileNode(path, name)
        node.children = children
        console.log(node)

        this.parent?.children?.push(node)
        node.parent = this.parent
    }

    checkValidateFrontMatter() {
        //* 如果是FILE类型，就进行执行
        if (this.type == NodeType.FILE) {
            let obj = matter.read(this.path)

            if (Object.keys(obj.data).length == 0) {
                fs.writeFileSync(this.path, matter.stringify(obj.content, { star: false, tags: [] }))
            }
        }
    }

    addTag(tags: string[]) {
        let obj = matter.read(this.path)
        console.log(obj)
        console.log(tags)
        fs.writeFileSync(this.path, matter.stringify(obj.content, { tags, star: obj.data.star }))
    }
}