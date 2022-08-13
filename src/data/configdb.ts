import { Ref, ref } from "vue"
import { fileTree } from "@/FileTree/fileTree"

export let bClickedParent: Ref<boolean> = ref(false)
//* 将所有的tag都存储在tag容器内
export let cTagContainer: Ref<string[]> = ref([])
//* 加载的当前默认文件
export let openFiles: Ref<Set<string>> = ref(new Set([]))
export let currentFile = ref<string>("")

export let fTree: Ref<fileTree | null> = ref(null)
export let SettingPage: Ref<string> = ref("/Setting/Info")
export let menuDisplay = ref("none");
export let dialogVisible = ref(false)
export let trashBin: Ref<fileTree | null> = ref(null)
//* 配置全局菜单
export let chooseWorkspace = ref(false)