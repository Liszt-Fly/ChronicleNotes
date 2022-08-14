// 样式初始化
import { appearance, head } from "@/data/data";

const primary_colors = {
	// 翡翠
	"#9fd7b6": `--el-color-primary: #9fd7b6;
    			--el-color-primary-light-3: #bce3cc;
    			--el-color-primary-light-5: #cfebdb;
    			--el-color-primary-light-7: #e2f3e9;
				--el-color-primary-light-8: #ecf7f0;
				--el-color-primary-light-9: #f5fbf8;
				--el-color-primary-dark-2: #7fac92;`,
	// 墨
	"#444444": `--el-color-primary: #444444;
				--el-color-primary-light-3: #7c7c7c;
				--el-color-primary-light-5: #a2a2a2;
				--el-color-primary-light-7: #c7c7c7;
				--el-color-primary-light-8: #dadada;
				--el-color-primary-light-9: #ececec;
				--el-color-primary-dark-2: #363636;`,
	// 花青
	"#5a5ec6": `--el-color-primary: #5a5ec6;
				--el-color-primary-light-3: #8c8ed7;
				--el-color-primary-light-5: #adafe3;
				--el-color-primary-light-7: #cecfee;
				--el-color-primary-light-8: #dedff4;
				--el-color-primary-light-9: #efeff9;
				--el-color-primary-dark-2: #484b9e;`,

	// 胭脂
	"#ed764c": `--el-color-primary: #ed764c;
				--el-color-primary-light-3: #f29f82;
				--el-color-primary-light-5: #f6bba6;
				--el-color-primary-light-7: #fad6c9;
				--el-color-primary-light-8: #fbe4db;
				--el-color-primary-light-9: #fdf1ed;
				--el-color-primary-dark-2: #be5e3d;`,

	// 丹
	"#ffb11b": `--el-color-primary: #ffb11b;
				--el-color-primary-light-3: #ffc85f;
				--el-color-primary-light-5: #ffd88d;
				--el-color-primary-light-7: #ffe8bb;
				--el-color-primary-light-8: #ffefd1;
				--el-color-primary-light-9: #fff7e8;
				--el-color-primary-dark-2: #cc8e16;`
}

export const initAppearance = () => {
	const color = appearance.color
	// @ts-ignore
	const primary_color: string = primary_colors[color]
	const global_en_font = appearance.global_en_font
	const global_cn_font = appearance.global_cn_font
	const code_font = appearance.code_font
	const trotting_horse = appearance.trotting_horse
	const font_size = appearance.font_size
	const line_height = appearance.line_height
	const paragraph_space = appearance.paragraph_space
	const line_width = appearance.line_width

	if (trotting_horse)
		document.getElementById("app")!.className += 'trotting_horse';

	let globalStyle = document.createElement('style');
	globalStyle.innerText = `
		html.${appearance.theme} {
			--el-color-primary: ${color};
			--pi-global-en-font: ${global_en_font};
			--pi-global-cn-font: ${global_cn_font};
			--pi-global-font: ${global_en_font}, ${global_cn_font}, "NotoColorEmoji";
			--pi-code-font: ${code_font};
			--brand-height: 40px;
			${primary_color};
		}

		.milkdown .editor p, .list-item[data-list-type="bullet"] > .list-item_label {
			font-size: ${font_size}px !important;
			line-height: ${line_height} !important;
		}

		.milkdown .editor p {
			margin-bottom: ${paragraph_space}rem !important;
		}

		.milkdown .editor p.paragraph {
			margin-bottom: ${paragraph_space - 1}rem !important;
		  }

		body .editor {
			width: ${line_width}%  !important;
			margin: auto;
		}
	`
	head.appendChild(globalStyle);

	document.getElementsByTagName("html")[0].className = appearance.theme
}
