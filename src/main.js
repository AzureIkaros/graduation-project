import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


import 'element-ui/lib/theme-chalk/index.css';
import { Button,Input,Image,Menu,MenuItem, Submenu,Tabs,TabPane,InputNumber,Radio,RadioGroup,Pagination,Table,TableColumn,Popconfirm } from 'element-ui';

Vue.use(Button);
Vue.use(Input);
Vue.use(Image);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Popconfirm);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
