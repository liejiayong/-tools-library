<script>
export default {
	name: "JyEmpty",
	props: {
		value: {
			type: String,
			default: "暂无数据~"
		}
	},
	render: function(h) {
		return h("div", { class: "jy-nomore" }, this.value);
	}
};
</script>

<style>
.jy-nomore {
	padding: 40px 0;
	text-align: center;
	font-size: 20px;
	color: #6b6b6b;
}
</style>
