<template>
  <form>
    <div id="loginForm" style="text-align: center">
      <h1>Страница логина</h1>
      <q-input v-model= "loginInput" :rules = "[ myRule ]" label="Логин"
               filled
               hint="Введите логин"/>
      <q-input v-model= "pwdInput" :rules = "[ myRule ]" label="Пароль"
               hint="Введите пароль"
               filled
               :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn push id="loginButton" color="primary" label="Войти" @click="authLogin"/>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      loginInput: ref(''),
      pwdInput: ref(''),
      isPwd: ref(true),
      myRule (val) {
        if (val === '') {
          return 'Поле необходимо заполнить'
        }
      }
    }
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'LoginAuth',
  methods: {
    authLogin () {
      this.$store.dispatch('auth', {
        login: this.loginInput,
        password: this.pwdInput
      })
      // this.axios.post('http://localhost:8888/authentication-service/api/auth/login', {
      //   login: this.loginInput,
      //   password: this.pwdInput
      // })
      //   .then(function (response) {
      //     console.log(response)
      //   })
    }
  }
}
</script>

<style scoped>
  button#loginButton {
    max-width: 300px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
  }
</style>

<style lang="sass" scoped>
.q-input
  max-width: 300px
  display: block
  margin-left: auto
  margin-right: auto
  margin-top: 25px
</style>
