<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<hello-world msg="Welcome to Your Vue.js App" />
		<button @click="increment">Count is: {{ state.count }}, double is: {{ state.double }}</button>
	</div>
</template>

<script>
// @ is an alias to /src
import { reactive, computed } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
export default {
	name: 'Home',
	components: {
		HelloWorld
	},
	setup() {
		const state = reactive({
			count: 0,
			double: computed(() => state.count * 2)
		})
		function increment() {
			state.count++
		}
		return {
			state,
			increment
		}
	}
}
</script>
