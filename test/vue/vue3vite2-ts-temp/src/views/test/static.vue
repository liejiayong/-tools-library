<template>
  <div class="container">
    <el-button @click="showPic">查看图片</el-button>
    <div>
      <img src="" alt="" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { engineer } from '/@/config/static';

const defCom = defineComponent({
  setup(props, context) {

      showPic() {
        console.log(engineer);
  }
  },
});

export default defCom;
</script>

<style>
</style>
