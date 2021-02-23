<template>
  <div class="container">
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  </div>
</template>
<script lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import { defineComponent } from 'vue';
const Hello = defineComponent({
  components: {
    HelloWorld,
  },
  created() {},
  methods: {
    hello() {
      console.log('hahha');
      return 'nihao';
    },
  },
});
export default Hello;
</script>
