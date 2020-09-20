<template>
  <div>
      <vue-headful title="Error | FuturasEstrellas"/>
      <h1>404 - FUERA DE JUEGO</h1>
      <br>
      <img src="./../assets/imagenesWeb/gifOffside.gif" alt="fuera de juego"/>
      <div id="bajoError">
          <div id="textoError">
            <p>¡Parece ser que te has perdido!</p>
            <p>Por suerte, ¡puedes pedir el VAR y volver a Home!</p>
          </div>
        <img id="varGif" src="./../assets/imagenesWeb/gifVar.webp" alt="pidiendo el var"/>
        <button id="botonVar" @click="pushHome()">PEDIR EL VAR</button>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Error',
    methods: {
        pushHome() {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
img {
    width: 70%;
    height: auto;
    border-radius: 1rem;
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
#textoError {
    grid-area: texto;
}
#varGif {
    grid-area: gif;
    width: 85%;
    height: auto;
}
#botonVar {
    grid-area: boton;
}
#bajoError {
    padding: 5% 20% 0 20%;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
    grid-template-areas: 
        "gif texto"
        "gif boton"
}
@media screen and (max-width: 400px) {
    #bajoError {
        display: flex;
        flex-direction: column;
    }
    #varGif {
        margin: 1rem;
        height: 110px;
}
}
@media screen and (min-width: 401px) and (max-width: 480px) {
    #bajoError {
        display: flex;
        flex-direction: column;
    }
    #varGif {
        margin: 1rem;
        height: 150px;
}
}
@media screen and (min-width: 481px) and (max-width: 768px) {
    #bajoError {
        display: flex;
        flex-direction: column;
    }
    #varGif {
        margin: 1rem;
        height: 200px;
}
}


</style>