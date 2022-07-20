// 样式初始化
import {appearance, head} from "@/init/data";

export const initAppearance = () => {
    const color = appearance.color
    const global_en_font = appearance.global_en_font
    const global_cn_font = appearance.global_cn_font
    const code_font = appearance.code_font
    const trotting_horse = appearance.trotting_horse
    const font_size = appearance.font_size
    const line_height = appearance.line_height
    const paragraph_space = appearance.paragraph_space
    const line_width = appearance.line_width
    // const isMac = /macintosh|mac os x/i.test(navigator.userAgent);

    if (trotting_horse)
        document.getElementById("app")!.className += 'trotting_horse';

    let globalStyle = document.createElement('style');
    globalStyle.innerText = `
		html.${appearance.theme ? "light" : "dark"} {
			--el-color-primary: ${color};
			--chronicle-global-en-font: ${global_en_font};
			--chronicle-global-cn-font: ${global_cn_font};
			--el-font-family: ${global_en_font}, ${global_cn_font};
			--chronicle-code-font: ${code_font};
			--brand-height: 40px;
		}

		.vditor-reset {
			font-size: ${font_size}px;
			line-height: ${line_height}rem;
		}

		.vditor-reset p {
			margin-bottom: ${paragraph_space}rem;
		}

		body .editor {
			width: ${line_width}%  !important;
		}
	`
    head.appendChild(globalStyle);

    document.getElementsByTagName("html")[0].className = appearance.theme ? "light" : "dark"
}
