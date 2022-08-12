import { getGlobal } from '@electron/remote';
import { upload, uploadPlugin, Uploader } from '@milkdown/plugin-upload';
import type { Node } from 'prosemirror-model';
import path from "path"
import { piUserPath } from '@/init/path';
import { v4 } from 'uuid'
// import fs from "fs-extra"
const fs = require("fs-extra")
function getBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const uploader: Uploader = async (files, schema) => {
    const images: File[] = [];

    for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (!file) {
            continue;
        }

        // You can handle whatever the file type you want, we handle image here.
        if (!file.type.includes('image')) {
            continue;
        }

        images.push(file);
    }

    const nodes: Node[] = await Promise.all(

        images.map(async (image) => {
            let reader = new FileReader()
            let name = image.name.substring(0, image.name.lastIndexOf("."))
            name = name + v4() + image.name.substring(image.name.lastIndexOf("."), image.name.length)
            console.log('name', name)
            console.log(' ', path.resolve("public", "user", name))
            reader.readAsDataURL(image)
            let res: string = await getBase64(image) as unknown as string
            let data = res.toString().replace(/^data:image\/png;base64,/, ""),
                binaryData = new Buffer(data, 'base64').toString('binary');
            fs.writeFileSync(path.resolve("public", "user", name), binaryData, "binary")
            const src = path.join("public", "user", name)
            const alt = image.name;
            return schema.nodes.image.createAndFill({
                src,
                alt,
            }) as Node;
        }),
    );

    return nodes;
};

export default upload.configure(uploadPlugin, { uploader, enableHtmlFileUploader: false })