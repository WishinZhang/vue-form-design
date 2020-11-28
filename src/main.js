import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import Bus from './utils/bus';
import install from './components/install';
import mixins from './components/mixins';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css';
import './styles/index.less';

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: 'small' });
Vue.use(install);
Vue.mixin(mixins);

Vue.prototype.$bus = Bus;

window.vueApp = new Vue({
  name: 'root',
  router,
  render: h => h(App)
}).$mount('#app');
