import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import Bus from './utils/bus';
import install from './components/install';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css';
import './styles/index.less';

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: 'small' });
Vue.use(install);

Vue.prototype.$bus = Bus;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
