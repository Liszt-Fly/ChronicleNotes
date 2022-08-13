import { getNord } from "@milkdown/theme-nord";
import { emoji } from "@milkdown/plugin-emoji";
import { slash } from '@milkdown/plugin-slash';
import { history } from '@milkdown/plugin-history'
import { MilkdownPlugin } from "@milkdown/core";

import { theme } from "@/init/data"

import gfm from './gfmPlugin'
import indent from "./indentPlugin"
import prism from "./prismPlugin"
import math from "./mathPlugin";
import uploader from "./uploadPlugin"

import "@/theme/milk.scss"

const nord = getNord(!theme)

export default function getPlugins(): MilkdownPlugin[] {
    return [nord, ...gfm, prism, ...indent, ...emoji, ...math, ...slash, ...history, ...uploader]
}