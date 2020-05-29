<template>
	<section class="cns-main-menu">
		<a-menu mode="inline" theme="dark" :selectedKeys="[selectKey]">
			<template v-if="menus && menus.length">
				<a-menu-item v-for="item in menus" :key="item.key" @click="changeMenu(item)">
					<router-link :to="{ path: item.path }">
						<a-icon v-if="item.icon" :type="item.icon" />
						<span>{{ item.title }}</span>
					</router-link>
				</a-menu-item>
			</template>
		</a-menu>
	</section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

type MenuItem = {
	key: string;
	title: string;
	icon?: string;
	path: string;
	children?: MenuItem[];
};

@Component
export default class Menu extends Vue {
	@Prop({ type: Array, default: [] })
	menus!: MenuItem[];

	@Watch("$route.path")
	onPathChange() {
		this._initMenus();
	}

	selectKey: string = "";

	created() {
		this._initMenus();
	}

	private _initMenus() {
		const currentMenu = this._findCurrentMenu(this.menus, this.$route.path) as MenuItem;
		if (!currentMenu) return;
		const { key } = currentMenu;
		this.selectKey = key;
	}

	private _findCurrentMenu(menus: MenuItem[], currentPath: string): MenuItem | null {
		for (let i = 0; i < menus.length; i++) {
			const menu = menus[i];
			const { path } = menu;
			if (path === currentPath) return menu;

			const currentMenu = this._findCurrentMenu(menu.children || [], currentPath);
			if (currentMenu) return currentMenu;
		}
		return null;
	}

	/**
	 * 切换菜单
	 */
	private changeMenu(item: MenuItem) {
		const { key } = item;
		this.selectKey = key;
	}
}
</script>
