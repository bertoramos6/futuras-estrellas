<template>
  <div>
    <vue-headful title="Login Familias | FuturasEstrellas"/>
      <h1>LOGIN FAMILIAS</h1>
      <div id="formularioLogin">
        <p v-show="missingParamsMsg" class="errorMessages">Debes rellenar email y contraseña para acceder</p>
        <div class="input_field">
          <label for="email">Email del tutor:</label>
          <input v-model="email" type="text" name="email" placeholder="Email">
        </div>

        <div class="input_field">
          <label for="contrasena">Contraseña:</label>
          <input v-model="contrasena" type="password" name="contrasena" placeholder="Contraseña">
        </div>

        <button @click="validateData()">Iniciar sesión</button>
      </div>
      <p>Todavía no tienes cuenta?</p>
      <button @click="volverALanding()">Regístrate ahora</button>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios'
import { iniciarSesionFamilia } from './../utils/utils.js'

export default {
    name: 'LoginFamilia',
    data() {
      return {
        email: '',
        contrasena: '',
        missingParamsMsg: false
      }
    },
    methods: {
      async validateData() {
        if (this.email === '' || this.contrasena === '') {
          this.missingParamsMsg = true
          Swal.fire({
            title: 'No puede haber campos vacíos!',
            text: 'Debes rellenar todos los campos para poder iniciar seción',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        } else {
          await iniciarSesionFamilia(this.email, this.contrasena);
          if (localStorage.getItem('AUTH_TOKEN_KEY') !== null) {
            this.$router.push('/')
          }
          this.missingParamsMsg = false;
        }
      },
      volverALanding() {
        this.$router.push('/landing')
      }
    }
}
</script>

<style scoped>
#formularioLogin {
  background-color: #fff;
  max-width: 400px;
  width: 80%;
  margin: 20px auto;
  padding: 1rem;
  padding-top: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px #78a5d68f;
}
input {
  padding: .5rem;
  border: 1px solid #f08848;
  background-color: #fff;
  border-radius: .2rem;
  width: 100%;
  transition: all .3s ease-in-out
}
input:focus {
  background-color: #abd2fb8f;
}
input:hover {
  background-color: #abd2fb8f;
}
select {
  padding: .5rem;
  background-color: #fff;
  border-radius: .2rem;
  width: 100%;
  transition: all .3s ease-in-out;
  border: 1px solid #f08848;
}
select:focus {
  background-color: #beddff8f;
}
select:hover {
  background-color: #abd2fb8f;
}
.input_field {
  display:flex;
  align-items: center;
  margin-bottom: 1rem;
}
 .input_field label {
  width: 600px;
  padding-left: 1rem;
  text-align: left;
}
button {
  color: #35495E;
  font-weight: 700;
  padding: .5rem;
  text-transform: uppercase;
  text-decoration: none;
  background: #78a6d6;
  border-radius: .5rem;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s
}
button:hover  {
  text-shadow: 0px 0px 6px #8dc4ff;
  box-shadow: 4px 4px 1px 1px #4e79a7;
  transition: all 0.4s ease 0s;
  cursor: pointer;
  background-color: #8dc4ff;
}
@media screen and (max-width: 480px) {
  .input_field {
    flex-direction: column;
    align-items: flex-start
}
#formularioLogin {
  margin: 1rem;
  padding-top: 2rem;
  font-size: 90%;
}
select {
  padding: .3rem;
  width: 95%;
}
input {
  padding: .3rem;
  width: 95%;
  transition: all .3s ease-in-out
}
.input_field label {
  width: auto;
  padding-left: 1rem;
  text-align: left;
}
}
</style>