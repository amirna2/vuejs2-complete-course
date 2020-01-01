import Vue from 'vue'
import App from './App.vue'

export const eventBus = new Vue({
  methods: {
    sendAgeUpdated(age) {
      this.$emit('ageUpdatedEvent', age)
    }
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
})

