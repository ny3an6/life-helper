<template>
  <h1>Главная страница</h1>
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
  },
  created: function () {
    this.$store.dispatch('info', this.tokenInfo)
  }
}
</script>

<style scoped>

</style>
