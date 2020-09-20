<template>
  <div>
      <vue-headful title="Contratos Recibidos | FuturasEstrellas"/>
      <menucustom/>
      <h1>CONTRATOS RECIBIDOS</h1>
      <ul v-for="mensaje in mensajes" :key="mensaje.id">
          <li>
              <div class="personasMensajes">
                  <span id="mensajeDe">De: <button @click="redirectPerfilOjeador(mensaje.email_ojeador)">{{mensaje.email_ojeador}}</button></span> <br>
              </div>
              <p class="textoMensaje">{{mensaje.mensaje}}</p>
          </li>
      </ul>
  </div>
</template>
<script>
import menucustom from '@/components/MenuCustom.vue'
import axios from 'axios'

export default {
    name: 'ContratosRecibidosJugadores',
    components: {
        menucustom
    },
    data() {
        return {
            mensajes: []
        }
    },
    created() {
        let self = this; 
    //llamada al back para obtener los contratos recibidos por la familia
    axios.get(`http://localhost:7000/mensajes/familia/${this.$route.params.email}`, {
        headers: {
            Authorization: localStorage.getItem('AUTH_TOKEN_KEY')
        }
    })
      .then(function(response) {
        self.mensajes = response.data
      })
      .catch(function(error) {
        console.log(error)
      })
    },
    methods: {
        redirectPerfilOjeador(email) {
            this.$router.push(`/perfil/ojeador/${email}`).catch(()=>{});
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
}
.personasMensajes {
    position: relative;
    left: 0;
    background-color: #fda46c;
    width: 40%;
    max-width: 500px;
    border-radius: .5rem .5rem 0 0;
    padding: .5rem;
}
.textoMensaje {
    background-color: #fff;
    box-shadow: 0px 0px 5px grey;
    border-radius: 0 .5rem .5rem .5rem;
    padding: 1rem;
    margin: 0 2rem 3rem 0;
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
  button {
    font-size: 80%;
  }
.textoMensaje {
    border-radius: 0 .0 .5rem .5rem;
    width: 250px;
    margin-right: auto;
    margin-left: auto;
    padding: 1rem;
}
.personasMensajes {
      width: 250px;
      margin-right: auto;
      margin-left: auto;
      padding: 1rem;
}
ul {
    padding-left: 0;
}
#mensajeDe {
    font-size: 70%
}
}
@media screen and (min-width: 481px) and (max-width: 767px) {
    button {
    font-size: 60%;
  }
    .personasMensajes {
      width: 300px;
      margin-right: 2rem;
      padding: .5rem;
}
#mensajeDe {
    font-size: 90%
}
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
button {
    font-size: 70%;
  }
  #mensajeDe {
    font-size: 90%
}
}
</style>