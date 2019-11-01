<template>
	<div class="jy-selector-panel">
		<select @change="onChange" @click="onFocus" @blur="onBlur" :name="name" :class="activeCls" class="jy-selector">
			<option v-if="placeholder && !value">{{ placeholder }}</option>
			<option v-if="load">{{ loadText }}</option>
			<slot></slot>
		</select>
		<!-- <input type="text" autocomplete="off" spellcheck="false" class="jy-selector-input" /> -->
	</div>
</template>

<script>
const ACTIVE_CLASS = "active";

export default {
	name: "JySelector",
	model: {
		event: "change",
		prop: "value"
	},
	props: {
		value: {
			type: String
		},
		name: {
			type: String
		},
		placeholder: {
			type: String
		},
		load: {
			type: Boolean,
			default: true
		},
		loadText: {
			type: String,
			default: "数据加载中..."
		}
	},
	data() {
		return {
			expand: false,
			activeCls: "",
			
		};
	},
	methods: {
		onChange({ target: { value } }) {
			this.$emit("update:value", value);
			this.$emit("change", value);
		},
		onBlur() {
			this.expand = false;
			this.setCls();
		},
		onFocus() {
			this.expand = !this.expand;

			this.setCls();
		},
		setCls() {
			if (this.expand) {
				this.activeCls = ACTIVE_CLASS;
			} else {
				this.activeCls = "";
			}
		}
	}
};
</script>

<style>
.jy-selector-panel {
	position: relative;
	width: 100%;
}
.jy-selector-input {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 20%;
	appearance: none;
	border: 0;
	outline: 0;
	background: transparent;
	padding: 0 30px;
	box-sizing: border-box;
}
.jy-selector-input:active,
.jy-selector-input:focus {
	border: 0;
	outline: 0;
}
.jy-selector {
	position: relative;
	padding: 0 30px;
	display: block;
	width: 100%;
	background: transparent;
	border: 0;
	outline: 0;
	height: 70px;
	line-height: 70px;
	border-radius: 20px;
	box-sizing: border-box;
	appearance: none;
	font-size: 24px;
	color: #777;
	background: #f3f3f3
		url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAARCAYAAAAougcOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc1NDQ4MUEzRjk0RTExRTk4MTIwQjMxQTg3MDY2MDYwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc1NDQ4MUE0Rjk0RTExRTk4MTIwQjMxQTg3MDY2MDYwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzU0NDgxQTFGOTRFMTFFOTgxMjBCMzFBODcwNjYwNjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzU0NDgxQTJGOTRFMTFFOTgxMjBCMzFBODcwNjYwNjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7tWZJSAAAA+0lEQVR42rTNXQoBURjG8eNkAS6EFbAF1xaAGYooLtRkBe5wYQPKrZILylcUsQGbIBtQFuAjjeetMzVN5oOZ89Z/pjlnzvmFNE1jmCjqoTxKMP9zRWvURrcwHhF0RCkW3MRRE2VQmuPRCRgwTxJ1CVGZ3FEIiUlGEoRcJCMnQvqSkQEhIzSWBNC9Q0J01ECTgIGpuFfnYuGN6mgWEDBHNXEv46YNWqiihU9giSoGYEXM0OpPYGUFviE0L/Hj+kdgI869rBvc5sATldHWI7BDJXGOeUUMqIj2LsABFewAN8SAVAeIAMUJ8ILQPFAOtdAZ3cWbvrNi33E+AgwAR+A1KPTvrbUAAAAASUVORK5CYII=")
		no-repeat 95% 50% / 26px auto;
}
.jy-selector::-ms-expand {
	display: none;
}
.jy-selector.active {
	background: #f3f3f3 url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAARCAYAAAAougcOAAAA/klEQVQ4jbXUvy4EURTA4W/XLm+hEh6CQktI/JdQaGQ7CY9AqdEqKEgICesdvAWlCg2tRCEnuTfZyOzOWju/8uae82Uymam1Wi191MABdjGOF5zhBN9l440+gDE8YK7jbBLHmMUKvnotqJcAowVAZ/Nop3sDITF43wPIBXTXC+qGxMAtFkqA3CJuukFFSBPXWOoTyC2nuWYZMpIurv4RyMXcVdpTiGRgbUAgt/4bykgcXGLjn0BuExcZCqSGc2wNCchtp721RvqKd4YM5GLvYzzJXkVAbj+QqYqRiUBeK0be6+nfVGXtQA7xXBHyhKNAPjCNU7wNaXm8gtg3g88f7X8mkwpcxhYAAAAASUVORK5CYII=") no-repeat 95% 50% / 26px auto;
}
.jy-selector option {
	color: #777;
	background: #e9e9e9;
	border-top: 1.5px solid #fff;
}
</style>
