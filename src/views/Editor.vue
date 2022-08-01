<script setup lang="ts">
import FileSystem from "@/components/common/FileSystem/FileSystem.vue";
// import 'prosemirror-view'
// import codemark from 'prosemirror-codemark';
// import 'prosemirror-codemark/dist/codemark.css';
// import { baseKeymap } from "prosemirror-commands"
import { onMounted, ref, Ref } from "vue";
// import {
//   schema, defaultMarkdownParser,
//   defaultMarkdownSerializer
// } from "prosemirror-markdown"
// import { EditorState, Command } from "prosemirror-state"
// import { EditorView } from "prosemirror-view"
// import { buildInputRules, exampleSetup } from "prosemirror-example-setup"
// import { Transform } from "prosemirror-transform"
// import { undo, redo, history } from "prosemirror-history"
// import { keymap } from "prosemirror-keymap"
// import { Transaction } from "_prosemirror-state@1.4.1@prosemirror-state";
// import { markRule } from "@milkdown/prose";
import Milkdown from "@/components/Editor/MilkEditor.vue";

let content = ref<HTMLDivElement | null>()
// let initState:EditorState
// let recoverParagraph:Command
// recoverParagraph=(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView):boolean=>{
//   if(dispatch&&state.doc.content.size==2&&state.doc.content.firstChild?.type.name!="paragraph"){
//     let newNode=state.doc.firstChild
//     let node=initState.doc.firstChild
//     dispatch(state.tr.replaceWith(0,1,node!))
//     return true
//   }
//   return false
//
//
//   // if(dispatch&&state.doc.content.size==2&&state.doc.content.firstChild?.type.name!="paragraph"){
//   //   dispatch(state.tr)
//   //   let tr=new Transform(state.doc) as Transaction
//   //   let node=schema.node("paragraph",null,state.doc.firstChild?.content,[])
//   //
//   // }
//   // return  true
// }
onMounted(() => {
  // let state = EditorState.create({schema,plugins:[ keymap(baseKeymap),history(),  keymap({"Mod-z": undo, "Backspace": recoverParagraph}),buildInputRules(schema),...codemark({markType:schema.marks.code})]})
  // initState=state
  // let view = new EditorView(content.value!, {
  //   state,
  //   dispatchTransaction(transaction) {
  //
  //     let startPoint=transaction.before.content.size-2
  //     let endPoint=transaction.doc.content.size-2
  //     console.log( `startPoint:${startPoint},endPoint:${endPoint}`)
  //     let newState = view.state.apply(transaction)
  //
  //
  //     if(newState.doc.content.size==2&&newState.doc.content.firstChild?.type.name=="paragraph"){
  //
  //       view.updateState(state)
  //     }
  //     else{
  //       view.updateState(newState)
  //     }
  //
  //   }
  // })
  // console.log(view);
})

</script>

<template>
  <div class="column">
    <div class="column-left">
      <!-- 中间调整大小 -->
      <div class="resize-bar"></div>
      <div class="resize-line"></div>
      <!-- 左侧文件系统 -->
      <div class="resize-save">
        <FileSystem></FileSystem>
      </div>
    </div>
    <div class="column-right">
      <!-- 右侧 editor -->
      <el-scrollbar>
        <div id="milkdown">
          <milkdown></milkdown>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.column {
  overflow: hidden;
  height: 100%;
}

.column-left {
  position: relative;
  float: left;
  height: calc(100vh - var(--brand-height));
}

.column-right {
  overflow: hidden;
  height: calc(100vh - var(--brand-height));

}

.resize-save {
  position: absolute;
  top: 0;
  right: 8px;
  bottom: 0;
  left: 0;
  overflow-x: hidden;
  height: 100vh;
}

.resize-bar {
  height: inherit;
  resize: horizontal;
  cursor: ew-resize;
  cursor: col-resize;
  opacity: 0;
  overflow: scroll;
  max-width: 80vw;
  min-width: 120px;
}

/* 拖拽线 */
.resize-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
}

.resize-bar::-webkit-scrollbar {
  width: 200px;
  height: inherit;
}

#milkdown {
  height: calc(100vh - var(--brand-height));
  overflow: scroll;
}
</style>
