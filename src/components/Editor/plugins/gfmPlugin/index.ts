import {gfm, listItem, SupportedKeys} from '@milkdown/preset-gfm'
export default gfm.configure(listItem, {
    keymap: {
        [SupportedKeys.SinkListItem]: 'Tab',

    },
});