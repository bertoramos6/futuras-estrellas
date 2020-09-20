<template>
  <div class="home">
    <vue-headful title="Landing | FuturasEstrellas"/>
    <h1>BIENVENIDOS A FUTURAS ESTRELLAS</h1>
    <img :src="require('./../assets/logoGrande.png')" id="logo" alt="Logo">
    <h2>Selecciona el tipo de cuenta</h2>
    <div id="landingRegistros">
      <div class="plantillaRegistro" id="registroFamilia">
        <h3>Registro como familia</h3>
        <p>Encuentra ojeadores cerca de ti</p>
        <p>Sube vídeos de tus mejores jugadas</p>
        <p>Recibe ofertas de ojeadores</p>
        <p>Añade experiencias y equipos pasados</p>
        <button @click="pantallaRegistroFamilia()">Registro Familia</button>
      </div>
      <div class="plantillaRegistro" id="registroOjeador">
        <h3>Registro como ojeador</h3>
        <p>Encuentra jugadores cerca de ti</p>
        <p>Visualiza los vídeos de las familias</p>
        <p>Envía ofertas a las familias</p>
        <p>Añade experiencias y equipos pasados</p>
        <button @click="pantallaRegistroOjeador()">Registro Ojeador</button>
      </div>
    </div>
    <button id="botonLoginFamilia" @click="pantallaLoginFamilia()">Tengo cuenta de familia</button>
    <button id="botonLoginOjeador" @click="pantallaLoginOjeador()">Tengo cuenta de ojeador</button>
    <br>
    <button id="botonInvitado" @click="pantallaHome()">Continuar como invitado</button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    pantallaRegistroFamilia() {
      this.$router.push('/registrofamilia')
    },
    pantallaRegistroOjeador() {
      this.$router.push('/registroojeador')
    },
    pantallaLoginOjeador() {
      this.$router.push('/loginojeador')
    },
    pantallaLoginFamilia() {
      this.$router.push('/loginfamilia')
    },
    pantallaHome() {
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
#landingRegistros {
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
  justify-content: center;
}
.plantillaRegistro {
  padding: 1rem;
  margin: 1rem;
  background-color: white;
  box-shadow: 0 0 5px #CCC;
  border-radius: 1rem;
  transition: all ease-in-out .2s;
}
.plantillaRegistro:hover {
  box-shadow: 15px 15px 1px #f08848;
  border: 1px solid grey;
}
p {
  padding: 1rem 0 1rem 0;
  font-weight: 500;
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
h1, h2 {
  color: #f08848
}
#botonLoginFamilia {
  margin: 1rem;
  background-color: transparent;
  border: 2px solid #35495E;
}
#botonLoginOjeador {
  margin: 1rem;
  background-color: transparent;
  border: 2px solid #35495E;
}
#botonInvitado {
  margin: 1rem;
  margin-top: 3rem;
  background: transparent;
  border: 1px solid #35495E;
  text-transform: lowercase;
}
#logo {
  width: 700px;
}
#registroFamilia {
  background-image: url('./../assets/imagenesWeb/imagenRegistroFamilia.jpeg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: #fff
}
#registroOjeador {
  background-image: url('./../assets/imagenesWeb/imagenRegistroOjeador.jpeg');
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  color: #fff
}
@media screen and (max-width: 480px) {
  #logo {
  width: 300px;
}
}
@media screen and (min-width: 481px) and (max-width: 767px) {
#logo {
  width: 450px;
}
}
</style>
