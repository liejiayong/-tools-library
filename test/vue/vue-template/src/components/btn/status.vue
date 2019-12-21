<template>
	<a href="javascript:;" @click="onClick" :class="getCls" class="jy-btn_status">{{ getTxt }}</a>
</template>

<script>
export default {
	name: "btnStatus",
	props: {
		status: {
			type: Boolean,
			default: false
		},
		txt: {
			type: String,
			default: "已领取"
		},
		txtActive: {
			type: String,
			default: "领取"
		},
		activeClass: {
			type: String,
			default: "active"
		},
		clickable: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		getTxt() {
			return this.status ? this.txtActive : this.txt;
		},
		getCls() {
			let ret = this.activeClass;
			if (!this.status) ret = "";
			if (this.clickable) ret += " jy-btn_status--clickable";
			return ret;
		}
	},
	methods: {
		onClick() {
			if (!this.clickable) return;
			if (this.status) this.$emit("click");
			this.$emit("change");
		}
	}
};
</script>

<style lang="scss">
.jy-btn_status {
	display: inline-block;
	vertical-align: middle;
	padding: 0 20px;
	font-size: 26px;
	color: #666;
	border: 2px solid #666;
	box-shadow: 0 0 2px #666;
	background: #fff;
	border-radius: 10px;
	min-width: 130px;
	text-align: center;
	height: 56px;
	line-height: 54px;
	&.active {
		color: orange;
		border-color: orange;
		box-shadow: 0 0 2px orange;
	}
	&.jy-btn_status--clickable {
		&:active {
			background-color: rgba(0, 0, 0, 0.2);
		}
	}
}
</style>
