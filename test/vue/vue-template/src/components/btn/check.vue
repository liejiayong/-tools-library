<template>
	<div @click="getTopup" class="jy-btn_check">查询角色今天充值</div>
</template>

<script>
export default {
	name: "BtnCheck",
	data() {
		return {
			loadingCheck: false // 查询今天充值
		};
	},
	methods: {
		getTopup() {
			if (this.loadingCheck) return;

			this.getToday();
		},
		getToday() {
			this.loadingCheck = true;
			this.$http({ query: "get_role_today_pay" })
				.then(({ data }) => {
					const txt = data > 0 ? `您今天已充值${data}元` : "您今天未充值";
					this.$toast({ message: txt });
				})
				.finally(() => {
					this.loadingCheck = false;
				});
		}
	}
};
</script>

<style lang="scss">
.jy-btn_check {
	position: relative;
	display: inline-block;
	padding: 24px 30px 24px 0;
	font-weight: bold;
	font-size: 24px;
	color: #222;
	&::before,
	&::after {
		content: "";
		position: absolute;
		top: 48%;
		width: 15px;
		height: 15px;
		border-right: 1px solid #222;
		border-bottom: 1px solid #222;
		transform: rotate(-45deg) translate(0, -50%);
	}
	&::before {
		right: 0px;
	}
	&::after {
		right: 10px;
	}
}
</style>
