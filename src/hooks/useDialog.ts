import {createVNode, render, h, VNode, RendererNode, RendererElement} from "vue";
import ChronDialog from "@/components/common/Dialog/ChronDialog.vue"

export default function useDialog(option?: any) {
    const props = {
        ...option
    }
    const vm = createVNode(ChronDialog, props)
    console.log(JSON.stringify(vm, null, 2));
    const container = document.createElement("div");
    render(vm, container);
    console.log(vm.props);
    document.querySelector("#app")?.appendChild(container.firstElementChild!);


}