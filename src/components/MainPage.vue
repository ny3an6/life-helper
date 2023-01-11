<template>
  <h1>Главная страница</h1>
  <h4>{{ this.userInfo }}</h4>
  <button @click="logout">Выход</button>
</template>

<script>
export default {
  name: 'MainPage',
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/')
      })
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
    console.log(this.tokenInfo)
  }
}
</script>

<style scoped>

</style>
