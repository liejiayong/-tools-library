<template>
	<div v-show="value" :class="className" class="jy-dialog">
		<div v-if="overlay" @click="handleMask" class="jy-mask"></div>
		<div class="jy-dialog_container">
			<div v-if="showClose" @click="onClose" class="jy-dialog_close"></div>
			<div v-if="title || $slots.title" class="jy-dialog_title">
				<slot name="title">
					<span class="jy-dialog_title--border">{{ decodeURIComponent(title) }}</span>
				</slot>
			</div>
			<div v-if="content || $slots.content" :style="styles" class="jy-dialog_content">
				<slot name="content">{{ decodeURIComponent(content) }}</slot>
			</div>
			<div v-if="footer || $slots.footer" class="jy-dialog_footer">
				<slot name="footer">
					<template v-if="footer">{{ decodeURIComponent(footer) }}</template>
				</slot>
			</div>
			<div class="jy-dialog_btn">
				<div v-if="cancelText" @click="handleCancel" class="jy-dialog_btn--cancel">{{ cancelText }}</div>
				<div v-if="okText" @click="handleOk" class="jy-dialog_btn--ok">{{ okText }}</div>
				<slot name="button"></slot>
			</div>
		</div>
	</div>
</template>

<script>
/**
 * 关闭取消按钮与确认按钮的方法是
 */

const isFunction = function(name) {
	return name && typeof name == "function";
};

export default {
	name: "JyDialog",
	model: {
		props: "value",
		event: "change"
	},
	props: {
		value: {
			type: Boolean,
			default: false
		},
		overlay: {
			type: Boolean,
			default: true
		},
		maskClosable: {
			type: Boolean,
			default: false
		},
		// 关闭按钮
		showClose: {
			type: Boolean,
			default: false
		},
		// 调用模式：true:函数调用；false:组件调用
		isPlugin: {
			type: Boolean,
			default: false
		},
		title: {
			type: String
		},
		content: {
			type: String
		},
		footer: {
			type: String
		},
		// 完全关闭后的回调
		afterClose: {
			type: Function
		},
		className: {
			type: String
		},
		okText: {
			type: String,
			default: "确认"
		},
		onOk: {
			type: Function
		},
		cancelText: {
			type: String,
			default: "取消"
		},
		onCancel: {
			type: Function
		},
		styles: {
			type: String,
			default: ''
		}
	},
	data: () => ({
		route: false, // 路由标识
		status: false // Dialog status
	}),
	watch: {
		// 处理返回路由关闭弹窗
		// $route(to) {}
	},
	methods: {
		handleCancel() {
			this.onClose();
			if (isFunction(this.onCancel)) this.onCancel();
			this.$emit("onCancel");
		},
		handleOk() {
			this.onClose();
			if (isFunction(this.onOk)) this.onOk();
			this.$emit("onOk");
		},
		handleMask() {
			if (!this.maskClosable) return;
			this.onClose();
		},
		// 关闭弹窗
		onClose() {
			new Promise((resolve, reject) => {
				try {
					if (isFunction(this.afterClose)) this.afterClose();
					resolve();
				} catch (e) {
					reject(e);
				}
			});
			this.$emit("change", false);
			this.$emit("update:value", false);

			// 插件模式
			if (this.isPlugin) this.value = false;
		}
	}
};
</script>


<style>
@keyframes zoom {
	from {
		-webkit-transform: scale(0);
		-moz-transform: scale(0);
		-o-transform: scale(0);
		transform: scale(0);
	}
	to {
		-webkit-transform: scale(1);
		-moz-transform: scale(1);
		-o-transform: scale(1);
		transform: scale(1);
	}
}
.jy-dialog {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1000;
}
.jy-mask {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 1;
}
.jy-dialog_container {
	padding: 50px 40px;
	position: fixed;
	top: 20%;
	left: 50%;
	margin: 0 0 0 -45%;
	width: 90%;
	font-size: 32px;
	/* overflow: hidden; */
	-webkit-transition: 0.3s;
	transition: 0.3s;
	border-radius: 30px;
	background-color: #fff;
	animation: zoom 0.3s ease-in;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	line-height: 1.2;
	z-index: 2;
}
.jy-dialog_title {
	position: relative;
	margin-bottom: 30px;
	text-align: center;
	font-size: 34px;
	color: #222;
	box-sizing: content-box;
}
.jy-dialog_title--border {
	position: relative;
	display: inline-block;
}
.jy-dialog_title--border::before {
	content: "";
	display: inline-block;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translate3d(-50%, 0, 0);
	width: 100%;
	height: 12px;
	border-radius: 12px;
	background-color: #fada59;
	z-index: -1;
}
.jy-dialog_content {
	font-size: 24px;
	color: #555;
	white-space: pre-wrap;
}
.jy-dialog_footer {
	margin-top: 10px;
	font-size: 18px;
	color: #9a9a9a;
}
.jy-dialog_close {
	position: absolute;
	top: 10px;
	right: 10px;
	width: 30px;
	height: 30px;
	padding: 14px;
	box-sizing: content-box;
	z-index: 100;
}
.jy-dialog_close::before,
.jy-dialog_close::after {
	position: absolute;
	top: 50%;
	left: 50%;
	content: "";
	display: inline-block;
	width: 30px;
	height: 2px;
	background-color: #616161;
}
.jy-dialog_close::before {
	transform: translate(-50%, -50%) rotate(45deg);
}
.jy-dialog_close::after {
	transform: translate(-50%, -50%) rotate(-45deg);
}
.jy-dialog_btn {
	margin: 50px auto 0;
	display: flex;
	justify-content: space-around;
	align-items: center;
	text-align: center;
}
.jy-dialog_btn--ok {
	display: inline-block;
	width: 200px;
	height: 74px;
	line-height: 72px;
	font-size: 26px;
	color: #fff;
	background-color: #fb7000;
	border-radius: 12px;
}
.jy-dialog_btn--cancel {
	display: inline-block;
	width: 200px;
	height: 74px;
	line-height: 72px;
	font-size: 26px;
	color: #fff;
	background-color: #666;
	border-radius: 12px;
}
</style>

