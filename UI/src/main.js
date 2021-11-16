import Vue from 'vue'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bulma/css/bulma.css'

// Import the Auth0 configuration
import { domain, clientId } from '../auth_config.json';

// Import the plugin here
import { Auth0Plugin } from './auth';

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    );
  },
});


Vue.config.productionTip = false

// vue material
import Vuetify from 'vuetify'

import VueAnalytics from 'vue-analytics'

if (process.env.VUE_APP_GA_ID) {
  Vue.use(VueAnalytics, {
    id: process.env.VUE_APP_GA_ID,
    router: router,
    debug: {
      sendHitTask: process.env.NODE_ENV === 'production'
    }
  })
}

const vuetifyOptions = { }
Vue.use(Vuetify)
Vue.use(VueLodash, { name: 'custom', lodash: lodash })

new Vue({
  router,
  store,
  render: h => h(App),
  vuetify: new Vuetify(vuetifyOptions)
}).$mount('#app')