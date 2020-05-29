<template>
	<a-config-provider>
		<a-layout id="components-layout-demo-custom-trigger">
			<a-layout-sider v-model="collapsed" :trigger="null" collapsible>
				<div class="logo" />
				<main-menu :menus="menus" />
			</a-layout-sider>
			<a-layout>
				<a-layout-header style="background: #fff; padding: 0">
					<a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="() => (collapsed = !collapsed)" />
				</a-layout-header>
				<a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
					<!-- 主应用渲染区，用于挂载主应用路由触发的组件 -->
					<router-view v-show="$route.name" />

					<!-- 子应用渲染区，用于挂载子应用节点 -->
					<section v-show="!$route.name" id="frame"></section>
				</a-layout-content>
			</a-layout>
		</a-layout>
	</a-config-provider>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import MainMenu from "@/components/menu/index";

@Component({
	components: {
		MainMenu
	}
})
export default class App extends Vue {
  collapsed = false
	/**
	 * 菜单列表
	 * key: 唯一 Key 值
	 * title: 菜单标题
	 * path: 菜单对应的路径
	 */
	menus = [
		{
			key: "Home",
			title: "主页",
			path: "/"
		},
		{
			key: "VueMicroApp",
			title: "Vue 主页",
			path: "/vue"
		}
		// {
		//   key: "VueMicroAppList",
		//   title: "Vue 列表页",
		//   path: "/vue/list"
		// },
		// {
		//   key: "ReactMicroApp",
		//   title: "React 主页",
		//   path: "/react"
		// },
		// {
		//   key: "ReactMicroAppList",
		//   title: "React 列表页",
		//   path: "/react/list"
		// },
		// {
		//   key: "AngularMicroApp",
		//   title: "Angular 主页",
		//   path: "/angular"
		// },
		// {
		//   key: "AngularMicroAppList",
		//   title: "Angular 列表页",
		//   path: "/angular/list"
		// },
		// {
		//   key: "StaticMicroApp",
		//   title: "Static 微应用",
		//   path: "/static"
		// }
	];
}
</script>

<style lang="less">
#components-layout-demo-custom-trigger .trigger {
	font-size: 18px;
	line-height: 64px;
	padding: 0 24px;
	cursor: pointer;
	transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
	color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
	height: 32px;
	background: rgba(255, 255, 255, 0.2);
	margin: 16px;
}
</style>
