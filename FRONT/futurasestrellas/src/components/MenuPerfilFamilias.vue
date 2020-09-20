<template>
  <div>
      <button @click="redirectHomeProfile($route.params.email)" class="botonesPerfilFamilia" id="botonHomeFamilia">Home</button>
      <button @click="redirectVideos($route.params.email)" class="botonesPerfilFamilia" id="botonVideosFamilia">Vídeos</button>
  </div>
</template>

<script>
export default {
    name:'MenuPerfilFamilias',
    methods: {
        redirectHomeProfile(email) {
            this.$router.push(`/perfil/familia/${email}`).catch(()=>{});
        },
        redirectVideos(email) {
            this.$router.push(`/perfil/familia/${email}/videos`).catch(()=>{});
        }
    }
}
</script>

<style scoped>
div {
    padding: 1rem;
    margin-top: 1rem;
}
.botonesPerfilFamilia {
    margin: 0 2rem 0 2rem;
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
</style>