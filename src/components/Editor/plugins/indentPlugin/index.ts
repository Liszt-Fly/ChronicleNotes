import { indent, indentPlugin } from "@milkdown/plugin-indent"

export default indent.configure(indentPlugin, {
    type: "space",
    size: 4
})