<template>
	<span class="jy-stepper ">
		<!-- <button v-if="showMinus" @click="onMinus" :disabled="disableMinus" :class="disableMinusCls" class="jy-stepper__minus "> -->
		<button v-if="showMinus" @click="onMinus" :class="disableMinusCls" class="jy-stepper__minus ">
			<slot name="minus"><div class="jy-stepper__btn-minus"></div></slot>
		</button>
		<input @blur="onBlur" @focus="onFocus" @input="onInput" @change="onChange" v-model="count" :disabled="isInput" :placeholder="placeholder" :style="{ width: inputW }" :class="disableInputCls" type="number" class="jy-stepper__input" />
		<!-- <button v-if="showPlus" @click="onPlus" :disabled="disablePlus" :class="disablePlusCls" class="jy-stepper__plus"> -->
		<button v-if="showPlus" @click="onPlus" :class="disablePlusCls" class="jy-stepper__plus">
			<slot name="plus"><div class="jy-stepper__btn-plus"></div></slot>
		</button>
	</span>
</template>

<script>
export default {
	name: "JyStepper",
	model: {
		event: "change",
		prop: "value"
	},
	props: {
		// 	当前输入值
		value: {
			type: Number,
			default: 0
		},
		// 最小值
		min: {
			type: Number,
			default: 0
		},
		// 最大值
		max: {
			type: Number,
			default: Number.MAX_SAFE_INTEGER
		},
		// 步长
		step: {
			type: Number,
			default: 1
		},
		// 固定显示的小数位数
		decimalLength: {
			type: Number
		},
		// 是否只允许输入整数
		integer: {
			type: Boolean,
			default: false
		},
		// 是否禁用步进器
		disabled: {
			type: Boolean,
			default: false
		},
		// 是否禁用输入框
		disableInput: {
			type: Boolean,
			default: false
		},
		// 是否开启异步变更，开启后需要手动控制输入值
		asyncChange: {
			type: Boolean,
			default: false
		},
		// 是否显示增加按钮
		showPlus: {
			type: Boolean,
			default: true
		},
		// 是否显示减少按钮
		showMinus: {
			type: Boolean,
			default: true
		},
		// 输入框宽度，默认单位为px
		inputWidth: {
			type: String,
			default: "30px"
		},
		placeholder: {
			type: String,
			default: ""
		}
	},
	computed: {
		disableMinusCls() {
			return this.disableMinus ? "jy-stepper__minus--disabled" : "";
		},
		disablePlusCls() {
			return this.disablePlus ? "jy-stepper__plus--disabled" : "";
		},
		disableInputCls() {
			return this.isInput ? "jy-stepper__input--disabled" : "";
		},
		disableMinus() {
			return this.disabled || this.count <= this.min;
		},
		disablePlus() {
			return this.disabled || this.count >= this.max;
		},
		isInput() {
			return this.disabled || this.disableInput ? "disabled" : false;
		},
		inputW() {
			const inputWidth = this.inputWidth;
			if (inputWidth && inputWidth === "30px") return "";

			return inputWidth;
		}
	},
	watch: {
		value(newVal) {
			if (!this.asyncChange) return;
			this.count = +newVal;
			// this.count = newVal == oldVal ? +newVal : +oldVal;
			// console.log("stepper current count", this.count, newVal, oldVal);
			// this._check();
			// this.emit();
		}
	},
	data() {
		return {
			count: this.min > this.value ? this.min : this.value
		};
	},
	methods: {
		overlimit(type) {
			this.$emit("overlimit", {
				type,
				count: this.count
			});
		},
		onBlur() {
			this._check();
			this.$emit("blur", this.count);
		},
		onFocus() {
			this._check();
			this.$emit("focus", this.count);
		},
		onInput({ target: { value } }) {
			if (!value) {
				this.count = this.min;
			} else {
				this.count = this.decimalLength ? this._decimalLength(value) : value;
			}
			this.$emit("input", this.count);
		},
		onChange() {
			this._check();
			this.emit();
		},
		onMinus() {
			if (this.disableMinus) {
				this.overlimit();
				return;
			}

			const count = +this.count,
				min = this.min,
				step = this.step;
			if (count - step > min) {
				const diff = count - step;
				this.count = this.integer ? parseInt(diff) : diff;
			} else {
				this.count = min;
				this.overlimit();
			}

			this.emit();
			this.$emit("minus", this.count);
		},
		onPlus() {
			if (this.disablePlus) {
				this.overlimit();
				return;
			}

			const count = +this.count,
				max = this.max,
				step = this.step;
			if (count + step < max) {
				const diff = count + step;
				this.count = this.integer ? parseInt(diff) : diff;
			} else {
				this.count = max;
				this.overlimit();
			}

			this.emit();
			this.$emit("plus", this.count);
		},
		emit() {
			this.$emit("change", this.count);
			this.$emit("update:value", this.count);
		},
		_check() {
			const count = +this.count,
				min = this.min,
				max = this.max;

			if (count > max) return (this.count = max);
			if (count < min) return (this.count = min);
			this.count = this.integer ? parseInt(count) : count;
		},
		_decimalLength(value) {
			const curr = value + "";
			if (!~curr.indexOf(".")) return value;

			const sub = curr.split(".");
			if (sub[1]) {
				const res = sub[0] + "." + sub[1].substring(0, this.decimalLength);
				return res;
			}

			return sub[0] + ".";
		}
	}
};
</script>

<style>
.jy-stepper {
	display: inline-block;
}
.jy-stepper__input {
	position: relative;
	box-sizing: border-box;
	width: 30px;
	height: 15px;
	margin: 0 2px;
	padding: 0;
	color: #222;
	font-size: 14px;
	text-align: center;
	vertical-align: middle;
	background-color: #f5f5f5;
	border: 0;
	border-radius: 4px;
	appearance: none;
	vertical-align: middle;
	box-sizing: content-box;
}
.jy-stepper__minus {
	position: relative;
	display: inline-block;
	padding: 4px;
	width: 13px;
	height: 13px;
	line-height: 13px;
	-webkit-box-flex: 0;
	-webkit-flex: 0 0 13px;
	-moz-box-flex: 0;
	-ms-flex: 0 0 13px;
	flex: 0 0 13px;
	border: 0;
	outline: 0;
	vertical-align: middle;
	box-sizing: content-box;
	background: transparent;
}
.jy-stepper__btn-minus {
	display: inline-block;
	width: 13px;
	height: 13px;
	background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABk0lEQVRIib2WvUoDQRSFv10sJKVpNPb+NSlD0CgqKGih5BUCq629VtpY2kXUR1C0UbSISkRImca/F0iVNpaRK3eDLrMTd7PrgWl25p6Pnbl7Zh3P8+ijCWATWAFmgKwubwMvwB1wCXzYbIYscwvAPlAKmR/TsQwcAnVgD3g0LXYNz4aBKnBvgZhU0pqqelhBI0AN2AKcCBBfjtbW1MsIygDXQDEGIKiiemVMoCOgkADEV0E9f4Hk4CsJQnxV1LsHOoh5Jv3kqPc3KA/MpQDxJd55AZVThPgquxG/lbiaF9BUSPENkNN9/svIaY1Jk+6P7ApKOqYV4Q1als7NmiJoEHXDal1NYZNOgdEI0HHgLGSuLen9pikc1FrErbPp3dV4T1t1AV38A+hcQE3gKUWIeDf9rtu1dcwA6uqt2wtVuX5PUgCJ5wOB+2gHaCQIaagnQVAHWE8I1lCvjgmEfryLwHHMM5MaqV0KBoEpgj6BbQU+R4DIWgFIbe9NfNn+66RBZjXdN4BVYDrwA/kK3AJXmjBmAV/OA0ZioMnp8gAAAABJRU5ErkJggg==") no-repeat center / 13px auto;
}
.jy-stepper__plus {
	position: relative;
	display: inline-block;
	padding: 4px;
	width: 13px;
	height: 13px;
	line-height: 13px;
	-webkit-box-flex: 0;
	-webkit-flex: 0 0 13px;
	-moz-box-flex: 0;
	-ms-flex: 0 0 13px;
	flex: 0 0 13px;
	border: 0;
	outline: 0;
	vertical-align: middle;
	box-sizing: content-box;
	background: transparent;
}
.jy-stepper__btn-plus {
	display: inline-block;
	width: 13px;
	height: 13px;
	background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABt0lEQVRIib2WO0sDQRSFv10sJKVpfPS+mpQhaBQVFLRQ8hcC0dZeK20s7SLqT1C0MWgRlYiQMo2vWrBKG8vIlbthHWY3s4l6YGDJzDknO/fOmfVKpRJdMA5sAMvANJDW5U3gCbgBLoC3OJmBmLl5YA/IR8yP6FgCDoAasAvc2xb7lt8GgTJwG2NiQ145ZdWINRoCqsAm4CUwCeApt6paVqMUcAXkejAwkVOtlM3oEMj+gkmArGr+MJLCFx3IFWBUR8VhfVG1O0b7jjUR4ocOlz/mqfa3UQaYdSChBrbnOIh2RowKjoR+UPATnpVeMSdGkxHkoPBeaJgIz8U1yIQfyi4TRdzrQJcGSdsiqB+0o7i+prANJ8BwAtMx4DRirinp/aIpbGLVsnVmnSLfwMCrr/H+16iJ0fk/GJ2JUQN4cCSEt9i1fqLdCLpux3G/gwaJK3wYbb11O6Eq1++xAzFokHd97gbRvMO4j7aBugPZFXXVxDRqAWu/ZFZXrZbNCD28C8BRgjMShnCEu2gGgS2CPoEtNXxMYCJrxUC4nTcJEPddJw0yo+m+DqwAU8YH5DNwDVxqwtgBfAE7mVFeQxc54wAAAABJRU5ErkJggg==") no-repeat center / 13px auto;
}
.jy-stepper__minus.jy-stepper__minus--disabled,
.jy-stepper__plus.jy-stepper__plus--disabled,
.jy-stepper__input--disabled {
	opacity: 0.5;
}
</style>
