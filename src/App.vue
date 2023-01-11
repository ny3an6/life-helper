<template>
  <div id="app">
    <q-layout view="hhh Lpr lfr">
      <q-header bordered class="bg-primary text-white">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
                <img src="/logo.png">
            </q-avatar>
            <router-link to="/">
             LIFE Helper
            </router-link>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import Registration from '@/components/Registration'
import Login from '@/components/Login'
import MainPage from '@/components/MainPage'

export default {
  name: 'app',
  // eslint-disable-next-line vue/no-unused-components
  components: { Registration, Login, MainPage },

  setup () {
    return {
    }
  }
}
</script>

<style scoped>
  .router-link-active {
    color: white;
  }
  a {
    color: white;
    text-decoration: none;
  }
</style>
