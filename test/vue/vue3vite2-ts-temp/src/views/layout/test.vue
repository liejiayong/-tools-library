<template>
  <div class="container">
    <el-row>
      <h1>Test Room</h1>
    </el-row>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-button @click="$router.push({ name: 'test_hello' })" class="button" type="text">hello</el-button>
          <el-button @click="$router.push({ name: 'test_static' })" class="button" type="text">静态资源引用</el-button>
        </div>
      </template>
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

const Test = defineComponent({
  setup(props, context) {
    console.log(this);
  },
  methods: {
    navTo(route) {},
  },
});

export default Test;
</script>

<style>
</style>
