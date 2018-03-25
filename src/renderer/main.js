import Vue from 'vue'
import axios from 'axios'
import Buefy from 'buefy';

import 'font-awesome/css/font-awesome.min.css';

import App from './App'
import router from './router'
import store from './store'

require('brace/mode/text');
require('brace/mode/elixir');
require('brace/mode/elm');
require('brace/mode/golang');
require('brace/mode/haskell');
require('brace/mode/html');
require('brace/mode/java');
require('brace/mode/javascript');
require('brace/mode/json');
require('brace/mode/jsx');
require('brace/mode/jade');
require('brace/mode/makefile');
require('brace/mode/markdown');
require('brace/mode/ocaml');
require('brace/mode/perl');
require('brace/mode/pgsql');
require('brace/mode/php');
require('brace/mode/powershell');
require('brace/mode/python');
require('brace/mode/ruby');
require('brace/mode/scss');
require('brace/mode/sh');
require('brace/mode/sql');
require('brace/mode/swift');
require('brace/mode/typescript');
require('brace/mode/xml');
require('brace/theme/monokai');

Vue.use(Buefy, {
  defaultIconPack: 'fa',
});

Vue.filter('capitalize', value => {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  router,
  store,
  template: '<App/>'
})
