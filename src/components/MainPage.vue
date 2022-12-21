<template>
  <h1>Главная страница</h1>
  <button @click="testInfo">test</button>
  <h4>{{ this.userInfo }}</h4>
</template>

<script>
export default {
  name: 'MainPage',
  methods: {
    testInfo () {
      this.$store.dispatch('info', this.tokenInfo)
    }
  },
  computed: {
    tokenInfo () {
      return this.$store.getters.infoToken
    },
    userInfo () {
      return this.$store.getters.infoUser
    }
  }
}
</script>

<style scoped>

</style>
