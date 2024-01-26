import Vue from 'vue';
import App from './App.vue';
import 'animate.css';

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount('#app');