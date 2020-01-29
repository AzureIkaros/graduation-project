import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


import 'element-ui/lib/theme-chalk/index.css';
import { Button,Input } from 'element-ui';

Vue.use(Button);
Vue.use(Input);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
