import {nord} from "@milkdown/theme-nord";
import gfm from './gfmPlugin'
import indent from "./indentPlugin"
import prism from "./prismPlugin"
import {emoji} from "@milkdown/plugin-emoji";
import math from "./mathPlugin";
import {slash} from '@milkdown/plugin-slash';
import {MilkdownPlugin} from "@milkdown/core";
export default function getPlugins():MilkdownPlugin[]{
    return [nord,...gfm,prism,...indent,...emoji,...math,...slash]
}