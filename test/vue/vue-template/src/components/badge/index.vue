<template>
	<span class="jy-badge">
		<slot></slot>
		<template v-if="dot">
			<sup :style="{ top: y, left: x }" :class="badgeCls"></sup>
		</template>
		<template v-else>
			<template v-if="showZero">
				<sup :style="{ top: y, left: x }" :class="badgeCls">{{ currCount }}</sup>
			</template>
			<template v-else>
				<sup v-if="count > 0" :style="{ top: y, left: x }" :class="badgeCls">{{
					currCount
				}}</sup>
			</template>
		</template>
	</span>
</template>

<script>
const classMap = {
	primary: "primary",
	success: "success",
	info: "info",
	error: "error",
	warning: "warning",
	normal: "normal"
};

export default {
	name: "JYBadge",
	props: {
		count: {
			// 显示的数字，大于overflowCount时，显示${overflowCount}+，为 0 时隐藏
			type: Number,
			default: 0
		},
		overflowCount: {
			// 展示封顶的数字值
			type: Number,
			default: 99
		},
		dot: {
			// 不展示数字，只有一个小红点
			type: Boolean,
			default: false
		},
		className: {
			// 自定义的class名称，dot 模式下无效
			type: String
		},
		type: {
			// 使用预设的颜色，可选值为 success、primary、normal、error、warning、info
			type: String
		},
		showZero: {
			// 当数值为 0 时，是否展示 Badge
			type: Boolean,
			default: false
		},
		// 一下属性功能暂未实现
		offset: {
			// 设置状态点的位置偏移，格式为 [x, y]
			type: Array
		},
		status: {
			// 设置 Badge 为状态点，可选值为 success、processing、default、error、warning
			type: String
		},
		text: {
			// 自定义内容，如果设置了 status，则为状态点的文本
			type: String
		}
	},
	computed: {
		badgeCls() {
			// dot 为true 则 显示点，否则显示count
			let ret = this.dot ? "jy-badge_dot" : "jy-badge_count";
			const type = classMap[this.type];
			ret = type ? (ret += `--${type}`) : (ret += "");

			// dot 为true 且count 为0 则不显示
			if (!this.dot && this.count === 0) ret = "";
			// 非dot模式下可自定义的class名称
			if (!this.dot) ret += ` ${this.className}`;
			return ret;
		},
		currCount() {
			const { overflowCount, count, dot } = this;
			let ret = ''
			if (!dot) {
				ret = overflowCount < count ? `${overflowCount}+` : count
			} 
			return ret;
		}
	},
	watch: {
		offset(newVal) {
			if (!Array.isArray(newVal)) return;
			this.x = newVal[0];
			this.y = newVal[1];
		}
	},
	data() {
		return {
			x: undefined,
			y: undefined
		};
	}
};
</script>

<style>
.jy-badge {
	position: relative;
	display: inline-block;
	line-height: 1;
}
.jy-badge_count {
	font-family: Monospaced Number;
	line-height: 1;
	vertical-align: middle;
	position: absolute;
	-webkit-transform: translateX(50%);
	transform: translateX(50%);
	top: -10px;
	right: 0;
	height: 20px;
	border-radius: 10px;
	min-width: 20px;
	background: #ed4014;
	border: 1px solid transparent;
	color: #fff;
	line-height: 18px;
	text-align: center;
	padding: 0 6px;
	font-size: 12px;
	white-space: nowrap;
	-webkit-transform-origin: -10% center;
	transform-origin: -10% center;
	z-index: 10;
	box-shadow: 0 0 0 1px #fff;
}
.jy-badge_count--primary {
	background: #2d8cf0;
}
.jy-badge_count--success {
	background: #19be6b;
}
.jy-badge_count--error {
	background-color: #ed4014;
}
.jy-badge_count--normal {
	background: #e6ebf1;
	color: #808695;
}
.jy-badge_count--info {
	background: #2db7f5;
}
.jy-badge_count--warning {
	background: #f90;
}
.jy-badge_dot {
	position: absolute;
	-webkit-transform: translateX(-50%);
	transform: translateX(-50%);
	-webkit-transform-origin: 0 center;
	transform-origin: 0 center;
	top: -4px;
	right: -8px;
	height: 8px;
	width: 8px;
	border-radius: 100%;
	background: #ed4014;
	z-index: 10;
	box-shadow: 0 0 0 1px #fff;
}
.jy-badge_dot--primary {
	background: #2d8cf0;
}
.jy-badge_dot--success {
	background: #19be6b;
}
.jy-badge_dot--error {
	background-color: #ed4014;
}
.jy-badge_dot--normal {
	background: #e6ebf1;
	color: #808695;
}
.jy-badge_dot--info {
	background: #2db7f5;
}
.jy-badge_dot--warning {
	background: #f90;
}
</style>
