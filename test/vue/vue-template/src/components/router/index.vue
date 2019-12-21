<template>
	<!-- <keep-alive> -->
	<router-view class="jy-router"></router-view>
	<!-- </keep-alive> -->
</template>

<script>
export default {
	name: "RouterAgency",
	components: {},
	data() {
		return {};
	},
	beforeMount() {}
};
</script>

<style lang="scss">
.jy-router{
	padding-bottom: 0;
}
</style>
