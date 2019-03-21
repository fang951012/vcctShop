// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './js/rem'
import './style/common.css'
import promise from 'es6-promise'
import axios from 'axios'
import Mint from 'mint-ui'
import moment from 'moment'
import infiniteScroll from 'vue-infinite-scroll'
import 'mint-ui/lib/style.css'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
promise.polyfill();
Vue.use(Mint)
Vue.use(infiniteScroll)
Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.prototype.$http=axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
