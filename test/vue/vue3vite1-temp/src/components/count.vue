<template>
  <h1>{{ msg }}</h1>
  <p>count is: {{ count }}</p>
  <p>cost: {{ countLabel }}</p>
  <button @click="onCountAdd">+</button>
  <button @click="onCountDecrease">-</button>
</template>

<script>
import { reactive, toRefs, computed } from 'vue';

export default {
  name: 'Counter',
  setup(props, content) {
    console.log('counter：：：', props, content);
    const state = reactive({ count: 0, countLabel: computed(() => `$ ${state.count}.00`) });
    const onCountAdd = () => {
      state.count++;
    };
    const onCountDecrease = () => {
      state.count--;
    };
    let { msg } = props;

    return { msg, ...toRefs(state), onCountAdd, onCountDecrease };
  },
};
</script>
