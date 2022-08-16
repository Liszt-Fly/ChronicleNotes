import { initAppearance } from "@/util/init/initAppearance";
import { initGeneral } from "@/util/init/initGeneral";
import { initShortCut } from "@/util/init/initShortCut";
import configInstance from "@/util/configs/config"
export const init = () => {
    //* 样式初始化
    initAppearance()
    //* 通用初始化
    initGeneral()
    //* 快捷键初始化
    initShortCut()
    configInstance.createInitialWorksapce()
}