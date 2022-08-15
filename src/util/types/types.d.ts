interface data {
    rename?: (v: HTMLSpanElement) => void,
    nameBox?: HTMLSpanElement
}

interface workspace {
    name: string
    createdDate: string
    modifiedDate: string
    path: string
    totalWorktime: string
    lastOpenFile: string
}

interface appConfig {
    workspaces: workspace[],
    recent: workspace | string

}