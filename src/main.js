import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueLoading from 'vuejs-loading-plugin'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import vuetify from './plugins/vuetify';
import Toasted from 'vue-toasted';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faTrashCan, faPenToSquare, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faTrashCan, faPenToSquare, faCirclePlus)

Vue.use(BootstrapVue)
Vue.use(VueLoading)
Vue.use(Toasted);
Vue.use(VueSidebarMenu)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
