<template>
  <div>
      <vue-headful title="Videos Familia | FuturasEstrellas"/>
      <menucustom/>
      <menuperfilfamilias/>
      <h1>VIDEOS</h1>
      <button v-show="owner" id="botonAnadirVideo" @click="mostrarAddVideo()">Añadir vídeo</button>
      <div v-for="videoInfo in videos" :key="videoInfo.id">
          <p id="tituloVideo">{{videoInfo.titulo}} <button v-show="owner" @click="borrarVideo(videoInfo.id)" class="deleteVideoButton"><i class="ion-ios-trash" /></button></p>
          <div class="videoInfo">
          <p id="descripcionVideo">{{videoInfo.descripcion}}</p>
          <div class="divVideo">
              <video :src="getVideoURL(videoInfo.url_video)" controls>VIDEO</video>
          </div>
          </div>
      </div>
      <!-- MODAL PARA AÑADIR VIDEOS -->
    <div v-show="seeModal" class="modal">
      <div class="modalBox">
        <h3>Añade tu vídeo:</h3>
        <label for="titulo">Título del vídeo</label>
        <br />
        <input type="text" name="titulo" placeholder="Título" v-model="tituloVideo" />
        <br />
        <label for="descripcion">Descripción del vídeo</label>
        <br />
        <input type="text" name="descripcion" placeholder="Descripción" v-model="descripcionVideo" />
        <br />
        <label for="video">Vídeo</label>
        <br />
        <input type="file" name="anoFin" @change="videoFamilia" accept="video/*" />
        <br />
        <button @click="seeModal = !seeModal">Cancelar</button>
        <button @click="validatingData()">Añadir vídeo</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import menucustom from '@/components/MenuCustom.vue'
import menuperfilfamilias from '@/components/MenuPerfilFamilias.vue'
import { isOwnerPlayer } from "@/utils/utils.js";
import Swal from 'sweetalert2'

export default {
    name:'PerfilVideosFamilias',
    components: {
        menucustom,
        menuperfilfamilias
    },
    data() {
        return {
            videos: [],
            seeModal: false,
            tituloVideo: '',
            owner: false,
            descripcionVideo: '',
            selectedVideo: null
        }
    },
    created() {
        let self = this;
        //llamada al back para obtener los vídeos de la familia
        axios.get(`http://localhost:7000/perfil/familia/${this.$route.params.email}/videos`)
        .then(function(response) {
            self.videos = response.data
            self.getIsOwnerPlayer(self.$route.params.email);
        })
        .catch(function(error) {
            console.log(error)
        })
    },
    methods: {
        getVideoURL(video) {
            return require(`./../../../../BACK/${video}`)
        },
        mostrarAddVideo() {
            this.seeModal = true;
        },
        getIsOwnerPlayer(emailTutor) {
            this.owner = isOwnerPlayer(emailTutor);
        },
        videoFamilia(event) {
            console.log(event)
            this.selectedVideo = event.target.files[0]
            console.log(this.selectedVideo)
        },
        validatingData() {
            if(this.tituloVideo === '' || this.descripcionVideo === '' || this.selectedVideo === null) {
                Swal.fire({
                    title: 'No puede haber campos vacíos!',
                    text: 'Debes rellenar todos los campos para poder añadir un nuevo vídeo',
                    icon: 'error',
                    confirmButtonText: 'OK',
                })
            } else {
                this.anadirVideo()
            }
        },
        anadirVideo() {
            let self = this;
            let fd = new FormData(); 

            fd.set('titulo', self.tituloVideo)
            fd.set('descripcion', self.descripcionVideo)
            fd.append('videoFamilia', self.selectedVideo)

            axios
              .post(
                  `http://localhost:7000/perfil/editar/familia/${this.$route.params.email}/videos`,
                  fd,
                  {
                      headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: localStorage.getItem("AUTH_TOKEN_KEY")
                      }
                  }
              )
              .then(function(response) {
              [self.videos].concat(response);
              })
              .catch(function(error) {
              console.log(error);
              });
              Swal.fire({
                title: "Vídeo añadido!",
                text: "Tu vídeo se ha añadido correctamente",
                icon: "success",
                confirmButtonText: "OK",
                onClose: () => {
                location.reload();
                }
              });
        },
        borrarVideo(videoId) {
            let self = this;
            Swal.fire({
                title:'¡Atención!',
                text:'Estás a punto de borrar una experiencia, esta acción no se podrá rehacer, ¿seguro que la quieres eliminar?',
                icon: 'warning',
                confirmButtonText: 'Sí',
                showCancelButton: true,
                cancelButtonText: 'Cancelar'
            })
            .then((result) => {
            if(result.value) {
                Swal.fire({
                title: '¡Borrado!',
                text: 'Tu vídeo será borrado',
                icon: 'success',
                onClose: () => {
                    axios
                    .delete(
                    `http://localhost:7000/perfil/editar/familia/${this.$route.params.email}/videos/${videoId}`,
                    {
                        headers: {
                            Authorization: localStorage.getItem("AUTH_TOKEN_KEY")
                        }
                    }
                    )
                    .then(function(response) {
                        console.log(response)
                    })
                    .catch(function(error) {
                    console.log(error);
                    });
                    location.reload()
                }
                })
            }
        })
        }
    }
}
</script>

<style scoped>
video {
    width: 320px;
    height: 240px;
    object-fit: cover;
    margin: 1rem;
}
.divVideo {
    background-color: #fff;
    border-radius: 0 0 1rem 1rem;
    margin: 0 auto 2rem auto;
    box-shadow: 0px 4px 5px grey;
}
#tituloVideo {
    font-weight: 800;
    padding: 1rem;
    margin: 0 auto;
    background-color: #fda46c;
    border-radius: 1rem 1rem 0 0;
}
#descripcionVideo {
    padding: 1rem;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0px 2.5px 5px grey;
}
#botonAnadirVideo {
    margin: 1rem;
}
.modal {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.8);
}
.modalBox {
  position: absolute;
  top: 250px;
  z-index: 11;
  background-color: whitesmoke;
  width: auto;
  padding: 2rem;
  border-radius: 1rem;
  position: fixed;
}
.modalBox {
  position: absolute;
  top: 250px;
  z-index: 11;
  background-color: whitesmoke;
  width: auto;
  padding: 2rem;
  border-radius: 1rem;
  position: fixed;
}
.modalBox button {
  margin: 1rem;
}
.modalBox input {
  padding: .5rem; 
  border: 1px solid #f08848;
  background-color: #fff;
  border-radius: .2rem;
  width: 100%;
  transition: all .3s ease-in-out
}
.modalBox input:focus {
  background-color: #abd2fb8f;
}
.modalBox input:hover {
  background-color: #abd2fb8f;
}
.modalBox textarea {
  padding: .5rem;
  border: 1px solid #f08848;
  background-color: #fff;
  border-radius: .2rem;
  width: 100%;
  transition: all .3s ease-in-out
}
.modalBox textarea:focus {
  background-color: #abd2fb8f;
}
.modalBox textarea:hover {
  background-color: #abd2fb8f;
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
.deleteVideoButton {
    position: relative;
    left: 20px;
}
i {
    font-size: 20px;
    padding: 0 .5rem;
}
@media screen and (max-width: 480px) {
    video {
    width: 272px;
    height: 153px;
    object-fit: cover;
    margin: 1rem;
    }
    .divVideo {
    border-radius: 0 0 1rem 1rem;
    width:95%;
    }
    #tituloVideo {
        font-weight: 800;
        padding: 1rem 0 1rem 0;
        border-radius: 1rem 1rem 0 0;
        width:95%;
    }
    #descripcionVideo {
        padding: 1rem 0 1rem 0;
        width:95%;
    }
    i {
    font-size: 15px;
    padding: 0 .3rem;
}
.deleteVideoButton {
    position: relative;
    left: 0;
}
}

@media screen and (min-width: 481px) and (max-width: 767px) {
    video {
    width: 352px;
    height: 198px;
    object-fit: cover;
    margin: 1rem;
    }
    .divVideo {
    border-radius: 0 0 1rem 1rem;
    width:95%;
    }
    #tituloVideo {
        font-weight: 800;
        padding: 1rem 0 1rem 0;
        border-radius: 1rem 1rem 0 0;
        width:95%;
    }
    #descripcionVideo {
        padding: 1rem 0 1rem 0;
        width:95%;
    }
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
    video {
    width: 416px;
    height: 234px;
    object-fit: cover;
    margin: 1rem;
    }
    .divVideo {
    border-radius: 0 0 1rem 1rem;
    width:700px;
    }
    #tituloVideo {
        font-weight: 800;
        padding: 1rem 0 1rem 0;
        border-radius: 1rem 1rem 0 0;
        width:700px;
    }
    #descripcionVideo {
        padding: 1rem 0 1rem 0;
        width:700px;
    }
}

@media screen and (min-width: 1025px) and (max-width: 1280px) {
    video {
    width: 480px;
    height: 270px;
    object-fit: cover;
    margin: 1rem;
    }
    .divVideo {
    border-radius: 0 0 1rem 1rem;
    width:800px;
    }
    #tituloVideo {
        font-weight: 800;
        padding: 1rem 0 1rem 0;
        border-radius: 1rem 1rem 0 0;
        width:800px;
    }
    #descripcionVideo {
        padding: 1rem 0 1rem 0;
        width:800px;
    }
}

@media screen and (min-width: 1281px) {
    video {
    width: 520px;
    height: 292.5px;
    object-fit: cover;
    margin: 1rem;
    }
    .divVideo {
    border-radius: 0 0 1rem 1rem;
    width:900px;
    }
    #tituloVideo {
        font-weight: 800;
        padding: 1rem 0 1rem 0;
        border-radius: 1rem 1rem 0 0;
        width:900px;
    }
    #descripcionVideo {
        padding: 1rem 0 1rem 0;
        width:900px;
    }
}
</style>