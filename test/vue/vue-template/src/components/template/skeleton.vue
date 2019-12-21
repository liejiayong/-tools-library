<template>
	<div class="jy-skeleton">
		<empty v-if="isLoading" value="加载中..."></empty>
		<template v-else>
			<template v-if="isExit">
				<slot></slot>
			</template>
			<empty v-else></empty>
		</template>
	</div>
</template>

<script>
import empty from "@/components/template/empty";

export default {
	name: "JySkeleton",
	components: { empty },
	model: {
		prop: "loading",
		event: "change"
	},
	props: {
		loading: {
			type: Boolean,
			default: true
		},
		value: {
			type: [Object, Array],
			default: () => []
		}
	},
	data() {
		return {
			isLoading: this.loading,
			isExit: true
		};
	},
	watch: {
		loading(newVal) {
			this.isLoading = newVal;
			if (!newVal) {
				this.$emit("change", newVal);
				this.$emit("update:loading", newVal);
			}
		},
		value(newVal) {
			if (!newVal) return (this.isExit = false);

			this.isExit = (Object.prototype.toString.call(newVal) === "[object Array]" && newVal.length) || (Object.prototype.toString.call(newVal) === "[object Object]" && JSON.stringify(newVal) !== "{}");
		}
	}
};
</script>

<style>
.jy-skeletion {
}
</style>
