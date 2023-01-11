<template>
  <h1>Страница логина</h1>
  <form>
    <div id="loginForm" style="text-align: center">
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
      <h7> {{ this.errMsg }} </h7>
      <q-btn push id="loginButton" color="primary" label="Войти" @click="authLogin"/>
      <q-btn flat id="registrationButton" color="primary" label="Создать новый аккаунт" @click="routeToRegistration"/>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

// TODO: При пустых полях не отправлял запрос на сервер.
// TODO: Сделать кнопку регистрации.
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
  name: 'LoginAuth',
  methods: {
    authLogin () {
      if (this.loginInput || this.pwdInput !== '') {
        this.$store.dispatch('auth', {
          login: this.loginInput,
          password: this.pwdInput
        })
          .then(() => {
            this.$router.push('/mainpage')
          })
          .catch(err => console.log(err))
      }
    },
    routeToRegistration () {
      this.$router.push('/registration')
    }
  },
  computed: {
    errMsg () {
      return this.$store.getters.infoErrorMsg
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
  button#registrationButton {
    margin-top: 25px;
  }
  h1 {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
  }
  h7 {
    display: block;
    color: #C10015;
    margin-top: 25px;
  }
  form {
    margin-left: auto;
    margin-right: auto;
    width: 354px;
    height: 394px;
    border: 1px solid black;
  }
</style>

<style lang="sass" scoped>
.q-input
  max-width: 300px
  display: block
  margin-left: auto
  margin-right: auto
  margin-top: 25px
  font-size: 15px
</style>
