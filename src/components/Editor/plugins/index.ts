import { nord } from "@milkdown/theme-nord";
import { ThemeColor } from '@milkdown/core';
import gfm from './gfmPlugin'
import indent from "./indentPlugin"
import prism from "./prismPlugin"
import { emoji } from "@milkdown/plugin-emoji";
import math from "./mathPlugin";
import { slash } from '@milkdown/plugin-slash';
import { MilkdownPlugin } from "@milkdown/core";
import "@/theme/milk.scss"

const extendedNord = nord.override((emotion, manager) => {
});

export default function getPlugins(): MilkdownPlugin[] {
    return [extendedNord, ...gfm, prism, ...indent, ...emoji, ...math, ...slash]
}