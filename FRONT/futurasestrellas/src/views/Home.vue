<template>
  <div>
    <vue-headful title="Home | FuturasEstrellas"/>
    <menucustom/>
    <slider/>
    <img :src="require('./../assets/logoGrande.png')" id="logo" alt="Logo">
    <div id="gridHome">
      <p id="texto1">Conecta con jugadores y ojeadores de tu zona. Además, gracias a nuestros filtros podrás encontrar tu candidato perfecto, ya que podrás buscar usuarios en función de su edad, posición principal, provincia de residencia y muchos más.</p>
      <img class="images" id="img1" src="@/assets/imagenesWeb/imagenHome1.jpeg" alt="pie pisando balón de fútbol">
      <img class="images" id="img2" src="@/assets/imagenesWeb/imagenHome2.jpeg" alt="bota y balón de fútbol en un campo con el sol en el fondo">
      <p id="texto2">Podrás editar tu perfil para atraer a más ojeadores y jugadores. Todos los usuarios podrán editar sus experiencias, donde se pueden añadir vivencias previas en otros equipos de fútbol, premios logrados u objetivos personales que puedan aportar valor al perfil.</p>
      <img class="images" id="img3" src="@/assets/imagenesWeb/imagenHome3.jpeg" alt="Dos jóvenes jugando al fútbol">
      <p id="texto3">Las cuentas de familia, adicionalmente, podrán subir vídeos de jugadas y highlights, los cuales podrán ver los ojeadores a la hora de decidir el fichaje de los jugadores.</p>
    </div>
  </div>
</template>

<script>
import slider from '@/components/Slider.vue'
import menucustom from '@/components/MenuCustom.vue'

export default {
  name: 'Home',
  components: {
    slider,
    menucustom
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');

h2 {
  font-family: 'Luckiest Guy', cursive;
  font-size: 175%;
}
.images {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 1rem;
  margin: 1rem;
}
#texto1 {
  grid-area: texto1;
  padding: 6rem 1rem 6rem 1rem;
  margin: 1rem;
  width: 90%;
  background-color:#f0884863;
  border-radius: 1rem
}
#texto2 {
  grid-area: texto2;
  padding: 1rem;
  padding: 6rem 1rem 6rem 1rem;
  margin: 1rem;
  width: 90%;
  background-color:#f0884863;
  border-radius: 1rem
}
#img1 {
  grid-area: img1;
}
#img2 {
  grid-area: img2;
}
#img3 {
  grid-area: img3;
}
#texto3 {
  grid-area: texto3;
  padding: 8rem 1rem 8rem 1rem;
  margin: 1rem;
  width: 90%;
  background-color:#f0884863;
  border-radius: 1rem
}
#gridHome {
  justify-content: center;
  place-items: center;
  align-items: center;
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  grid-template-columns: 30% 30% 30%;
  grid-template-rows: auto;
  grid-template-areas:
    "img1 texto1 img2"
    "texto2 img3 texto3";
}
#logo {
  width: 700px;
}
@media screen and (max-width: 480px) {
  .images {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 1rem;
  margin: 1rem;
  }
  #gridHome {
  display: flex;
  flex-direction: column;
  padding: 0 3rem 1rem 3rem;
  }
  #texto1 {
  grid-area: texto1;
  padding: 1rem;
  margin: 1rem;
  width: 90%;
  background-color:#f0884863;
  border-radius: 1rem
}
#texto2 {
  grid-area: texto2;
  padding: 1rem;
  padding: 1rem;
  margin: 1rem;
  width: 90%;
  background-color:#f0884863;
  border-radius: 1rem
}
  #texto3 {
  grid-area: texto3;
  padding: 1rem;
  margin: 1rem;
  width: 90%;
  background-color:#f0884863;
  border-radius: 1rem
}
#logo {
  width: 300px;
}
}
@media screen and (min-width: 481px) and (max-width: 767px) {
  #gridHome {
  display: flex;
  flex-direction: column;
  padding: 0 3rem 1rem 3rem;
  }
.images {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 1rem;
  margin: 1rem;
  }
  #texto1 {
  grid-area: texto1;
  padding: 1rem;
  margin: 1rem;
  width: 90%;
  background-color:#f0884863;
  border-radius: 1rem
}
#texto2 {
  grid-area: texto2;
  padding: 1rem;
  padding: 1rem;
  margin: 1rem;
  width: 90%;
  background-color:#f0884863;
  border-radius: 1rem
}
  #texto3 {
  grid-area: texto3;
  padding: 1rem;
  margin: 1rem;
  width: 90%;
  background-color:#f0884863;
  border-radius: 1rem
}
#logo {
  width: 450px;
}
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .images {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 1rem;
  margin: 1rem;
  }
  #texto1 {
  grid-area: texto1;
  padding: 3rem 1rem 3rem 1rem;
  margin: 1rem;
  width: 90%;
  background-color:#f0884863;
  border-radius: 1rem
}
#texto2 {
  grid-area: texto2;
  padding: 3rem 1rem 3rem 1rem;
  padding: 1rem;
  margin: 1rem;
  width: 90%;
  background-color:#f0884863;
  border-radius: 1rem
}
  #texto3 {
  grid-area: texto3;
  padding: 5rem 1rem 5rem 1rem;
  margin: 1rem;
  width: 90%;
  background-color:#f0884863;
  border-radius: 1rem
}
}
@media screen and (min-width: 1025px) and (max-width: 1280px) {
  
  
}
@media screen and (min-width: 1281px) {
  .images {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 1rem;
  margin: 1rem;
  }

}

</style>