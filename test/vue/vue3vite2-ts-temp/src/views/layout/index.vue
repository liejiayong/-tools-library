<template>
  <div class="container">
    <h1>index page</h1>
    <img alt="Vue logo" src="/logo.png" />
    <br />
    <router-link :to="{ name: 'LayoutTest' }">前往测试</router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

const Home = defineComponent({
  components: {},
  created() {
    console.log('routerList', this.$route);
    console.log(this);
  },
  methods: {},
});

export default Home;
</script>
