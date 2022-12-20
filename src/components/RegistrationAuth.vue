<template>
  <form>
    <div id="registrationForm" style="text-align: center">
      <h1>Страница регистрации</h1>
      <q-input v-model="loginInputReg" :rules = "[ myRule ]" label="Логин"
               filled
               hint="Введите логин"/>
      <q-input v-model="inputEmail" label="E-mail"
               filled
               :rules = "[ myRule ]"/>
      <q-input v-model="inputFirstName" label="Имя"
               filled
               :rules = "[ myRule ]"/>
      <q-input v-model="inputLastName" label="Фамилия"
               filled
               :rules = "[ myRule ]"/>
      <q-input v-model="pwdInputReg" :rules = "[ myRule ]" label="Пароль"
               hint="Введите пароль"
               filled
                type="password"/>
<!--               :type="isPwd ? 'password' : 'text'">-->
<!--        <template v-slot:append>-->
<!--            <q-icon-->
<!--              :name="isPwd ? 'visibility_off' : 'visibility'"-->
<!--              class="cursor-pointer"-->
<!--              @click="isPwd = !isPwd"-->
<!--            />-->
<!--        </template>-->
<!--      </q-input>-->
      <q-input v-model="pwdInputRegRepeat" :rules = "[ (val) => (val && val === pwdInputReg) || 'Пароль не совпадает']"
               label="Подтвердите пароль"
               hint="Введите пароль снова"
               filled
                type="password"/>
<!--               :type="isPwd ? 'password' : 'text'"/>-->

      <q-btn push id="registrationButton" color="primary" label="Зарегистрироваться" @click="authReg"/>
    </div>
  </form>
</template>

<script>

import { ref } from 'vue'

export default {
  setup () {
    return {
      loginInputReg: ref(''),
      pwdInputReg: ref(''),
      pwdInputRegRepeat: ref(''),
      isPwd: ref(true),
      inputEmail: ref(''),
      inputFirstName: ref(''),
      inputLastName: ref(''),
      myRule (val) {
        if (val === '') {
          return 'Поле необходимо заполнить'
        }
      }
    }
  },
  // eslint-disable-next-line vue/multi-word-component-names // избавиться по возможности от конфликтов с esLint 
  name: 'RegistrationAuth', // переименовать
  data () {
    return {}
  },
  methods: {
    authReg () {
      this.axios.post('http://localhost:8888/authentication-service/api/registration/user/create', {
        login: this.loginInputReg,
        password: this.pwdInputReg,
        confirmedPassword: this.pwdInputRegRepeat, // отрефачить в один обьект 
        firstName: this.inputFirstName,
        lastName: this.inputLastName,
        email: this.inputEmail
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      // this.axios.get('http://localhost:8888/authentication-service/api/user/info').then(response => {
      // console.log(response)
      // })
      // this.$router.push('Login')
    }
  }
}

</script>

<style lang="sass" scoped>
  .q-input
    max-width: 300px
    display: block
    margin-left: auto
    margin-right: auto
    margin-top: 25px
</style>

<style scoped>
  button#registrationButton {
    max-width: 300px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px
  }
  div#registrationForm {
    margin-top: 10px;
  }
</style>
