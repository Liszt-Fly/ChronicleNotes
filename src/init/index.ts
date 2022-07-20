import {initAppearance} from "@/init/initAppearance";
import {initGeneral} from "@/init/initGeneral";
import {initShortCut} from "@/init/initShortCut";

export const init=()=>{
    //* 样式初始化
    initAppearance()
    //* 通用初始化
    initGeneral()
    //* 快捷键初始化
    initShortCut()
    //* 垃圾箱初始化

}