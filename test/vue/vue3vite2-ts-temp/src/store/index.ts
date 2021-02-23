import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

export interface State {
  count: number;
}

export const storeKey: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  state: { count: 0 },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

export default store;
