// 通用初始化
import { general } from "@/init/data";

export const initGeneral = () => {
	const head = document.head || document.getElementsByTagName('head')[0];

	const devTools = general.devTools
	const tooltips = general.tooltips

	let generalStyle = document.createElement('style');
	generalStyle.innerText = `
	.devTools{
		display: ${devTools ? 'inline-flex' : 'none'}
	}
	${tooltips ? ".el-popper.is-customized {\
		/* Set padding to ensure the height is 32px */\
		padding: 6px 12px;\
		border: 1px solid var(--el-fill-color);\
		background: var(--el-fill-color);\
		user-select: none;\
	  }\
	  \
	  .el-popper.is-customized .el-popper__arrow::before {\
		background: var(--el-fill-color);\
		border: 1px solid var(--el-fill-color);\
		right: 0;\
		user-select: none;\
	  }" : ".el-popper.is-customized {display: none !important;}"
		}
	`
	head.appendChild(generalStyle);
}

export const locale = general.locale
