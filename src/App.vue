<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Registration from '@/components/RegistrationAuth'
import Login from '@/components/Login'

export default {
  name: 'app',
  // eslint-disable-next-line vue/no-unused-components
  components: { Registration, Login },

  setup () {
    return {
    }
  }
}
</script>
