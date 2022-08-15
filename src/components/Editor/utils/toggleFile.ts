import {
    Ctx,
    editorStateOptionsCtx,
    editorViewCtx,
    parserCtx,
    prosePluginsCtx,
    schemaCtx, themeManagerCtx
} from "@milkdown/core";
import { Slice } from '@milkdown/prose/model'
import { EditorState } from '@milkdown/prose/state'
const fsp = require("fs-extra")
const matter = require("gray-matter")
export const replaceAll =
    (markdown: string, flush = false) =>
        (ctx: Ctx): void => {
            const view = ctx.get(editorViewCtx);
            const parser = ctx.get(parserCtx);
            const doc = parser(markdown);
            if (!doc) return;

            if (!flush) {
                const { state } = view;
                return view.dispatch(state.tr.replace(0, state.doc.content.size, new Slice(doc.content, 0, 0)));
            }

            const schema = ctx.get(schemaCtx);
            const options = ctx.get(editorStateOptionsCtx);
            const plugins = ctx.get(prosePluginsCtx);
            const themeManager = ctx.get(themeManagerCtx);

            const state = EditorState.create({
                schema,
                doc,
                plugins,
                ...options,
            });

            view.updateState(state);
            themeManager.flush(ctx);
        };

export const toggleFile = (file: string): string => {
    if (fsp.existsSync(file)) {
        //* 如果有header，需要进行处理
        let content = fsp.readFileSync(file, { encoding: "utf-8" })
        if (matter.test(content)) {
            let header = matter.read(file)
            return matter.read(file).content
        }
        else {
            return content
        }
    }
    else {
        throw new Error("文件路径不存在")
    }
}