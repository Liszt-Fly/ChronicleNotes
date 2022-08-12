import { getGlobal } from '@electron/remote';
import { upload, uploadPlugin, Uploader } from '@milkdown/plugin-upload';
import type { Node } from 'prosemirror-model';
import path from "path"
import { piUserPath } from '@/init/path';
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

function toBinaryData() {

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

            console.log('image', image)
            console.log(' ', path.resolve("public", "user", image.name))
            // fs.writeFileSync(path.resolve("public", "user", image.name), image, "binary")

            reader.readAsDataURL(image)
            let res: string = await getBase64(image) as unknown as string
            let data = res.toString().replace(/^data:image\/png;base64,/, ""),
                binaryData = new Buffer(data, 'base64').toString('binary');
            fs.writeFileSync(path.resolve("public", "user", image.name), binaryData, "binary")
            const src = "public/user/image.png"
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