<template>
  <div>
    <vue-headful title="Editar Perfil Familias | FuturasEstrellas"/>
      <menucustom/>
      <h1>EDITAR PERFIL HOME FAMILIAS</h1>
      <p v-show="missingParamsMsg" id="camposVacios" class="mensajeError">Hay algún campo vacío</p>
    <div id="formularioEdicion">
      <div class="input_field">
        <label for="nombreJugador">Nombre del/la jugador/a:</label>
        <input type="text" name="nombreJugador" v-model="nombreJugador">
      </div>

      <div class="input_field">
        <label for="apellidosJugador">Apellidos del/la jugador/a:</label>
        <input type="text" name="apellidosJugador" v-model="apellidosJugador" placeholder="Apellidos">
      </div>

      <div class="input_field">
        <label for="nombreTutor">Nombre del/la tutor/a:</label>
        <input type="text" name="nombreTutor" v-model="nombreTutor" placeholder="Nombre">
      </div>

      <div class="input_field">
        <label for="apellidosTutor">Apellidos del/la tutor/a:</label>
        <input type="text" name="apellidosTutor" v-model="apellidosTutor" placeholder="Apellidos">
      </div>

      <div class="input_field">
        <label for="emailTutor">Email del/la tutor/a:</label>
        <input type="text" name="emailTutor" v-model="emailTutor" placeholder="email">
      </div>

      <div class="input_field">
        <label for="sexo">Sexo del/la jugador/a:</label>
        <select v-model="sexo" name="sexo" id="sexo">
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
        </select>
      </div>

      <div class="input_field">
        <label for="provincia">Seleccione la provincia de residencia:</label>
        <select v-model="provincia" name="provincia" id="provincia">
          <option value='Álava'>Álava</option>
          <option value='Albacete'>Albacete</option>
          <option value='Alicante/Alacant'>Alicante/Alacant</option>
          <option value='Almería'>Almería</option>
          <option value='Asturias'>Asturias</option>
          <option value='Ávila'>Ávila</option>
          <option value='Badajoz'>Badajoz</option>
          <option value='Barcelona'>Barcelona</option>
          <option value='Burgos'>Burgos</option>
          <option value='Cáceres'>Cáceres</option>
          <option value='Cádiz'>Cádiz</option>
          <option value='Cantabria'>Cantabria</option>
          <option value='Castellón/Castelló'>Castellón/Castelló</option>
          <option value='Ceuta'>Ceuta</option>
          <option value='Ciudad Real'>Ciudad Real</option>
          <option value='Córdoba'>Córdoba</option>
          <option value='Cuenca'>Cuenca</option>
          <option value='Girona'>Girona</option>
          <option value='Las Palmas'>Las Palmas</option>
          <option value='Granada'>Granada</option>
          <option value='Guadalajara'>Guadalajara</option>
          <option value='Guipúzcoa'>Guipúzcoa</option>
          <option value='Huelva'>Huelva</option>
          <option value='Huesca'>Huesca</option>
          <option value='Illes Balears'>Illes Balears</option>
          <option value='Jaén'>Jaén</option>
          <option value='A Coruña'>A Coruña</option>
          <option value='La Rioja'>La Rioja</option>
          <option value='León'>León</option>
          <option value='Lleida'>Lleida</option>
          <option value='Lugo'>Lugo</option>
          <option value='Madrid'>Madrid</option>
          <option value='Málaga'>Málaga</option>
          <option value='Melilla'>Melilla</option>
          <option value='Murcia'>Murcia</option>
          <option value='Navarra'>Navarra</option>
          <option value='Ourense'>Ourense</option>
          <option value='Palencia'>Palencia</option>
          <option value='Pontevedra'>Pontevedra</option>
          <option value='Salamanca'>Salamanca</option>
          <option value='Segovia'>Segovia</option>
          <option value='Sevilla'>Sevilla</option>
          <option value='Soria'>Soria</option>
          <option value='Tarragona'>Tarragona</option>
          <option value='Santa Cruz de Tenerife'>Santa Cruz de Tenerife</option>
          <option value='Teruel'>Teruel</option>
          <option value='Toledo'>Toledo</option>
          <option value='Valencia/Valéncia'>Valencia/Valéncia</option>
          <option value='Valladolid'>Valladolid</option>
          <option value='Vizcaya'>Vizcaya</option>
          <option value='Zamora'>Zamora</option>
          <option value='Zaragoza'>Zaragoza</option>
        </select>
      </div>

      <p v-show="ageErrorMsg" id="edadInvalida" class="mensajeError">Los jugadores deben ser menores de edad</p>

      <div class="input_field">
        <label for="fechaNacimiento">Fecha de nacimiento del/la jugador/a: (debe ser menor de edad)</label>
        <input type="date" v-model="fechaNacimiento" placeholder="yyyy-mm-dd" value="04/05/2020">
      </div>

      <div class="input_field">
        <label for="clubActual">Club actual del/la jugador/a:</label>
        <input type="text" v-model="clubActual" placeholder="Club actual">
      </div>

      <div class="input_field">
        <label for="categoria">Categoría actual del/la jugador/a:</label>
        <select v-model="categoria" name="categoria" id="categoria">
          <option value="Prebenjamín">Prebenjamín</option>
          <option value="Benjamín">Benjamín</option>
          <option value="Alevín">Alevín</option>
          <option value="Infantil">Infantil</option>
          <option value="Cadete">Cadete</option>
          <option value="Juvenil">Juvenil</option>
        </select>
      </div>

      <div class="input_field">
        <label for="posicionPrincipal">Posición principal del/la jugador/a:</label>
        <select v-model="posicion" name="posicionPrincipal" id="posicionPrincipal">
          <option value="Portero">Portero</option>
          <option value="Lateral Derecho">Lateral Derecho</option>
          <option value="Lateral Izquierdo">Lateral Izquierdo</option>
          <option value="Central Derecho">Central Derecho</option>
          <option value="Central Izquierdo">Central Izquierdo</option>
          <option value="Mediocentro Defensivo">Mediocentro Defensivo</option>
          <option value="Mediocentro Creador">Mediocentro Creador</option>
          <option value="Mediocentro Ofensivo">Mediocentro Ofensivo</option>
          <option value="Extremo Derecho">Extremo Derecho</option>
          <option value="Extremo Izquierdo">Extremo Izquierdo</option>
          <option value="Delantero">Delantero</option>
        </select>
      </div>

      <div class="input_field">
        <label for="piernaBuena">Pierna buena del/la jugador/a:</label>
        <select v-model="piernaBuena" name="piernaBuena" id="piernaBuena">
          <option value="Derecha">Derecha</option>
          <option value="Izquierda">Izquierda</option>
          <option value="Ambas">Ambas</option>
        </select>
      </div>

    </div>
    <button @click="validatingData()">Actualizar perfil</button>
  </div>
</template>

<script>
import menucustom from '@/components/MenuCustom.vue'
import Swal from 'sweetalert2';
import axios from 'axios';
import moment from 'moment'

export default {
    name: 'editarPerfilHomeFamilias',
    components: {
        menucustom
    },
    data() {
        return {
            infoGeneral: this.$route.query,
            nombreJugador: this.$route.query.nombre_jugador,
            apellidosJugador: this.$route.query.apellidos_jugador,
            nombreTutor: this.$route.query.nombre_tutor,
            apellidosTutor: this.$route.query.apellidos_tutor,
            emailTutor: this.$route.query.email_tutor,
            sexo: this.$route.query.sexo,
            provincia: this.$route.query.provincia,
            fechaNacimiento: this.$route.query.fecha_nacimiento.slice(0,10),
            clubActual: this.$route.query.club_actual,
            categoria: this.$route.query.categoria,
            posicion: this.$route.query.posicion_principal,
            piernaBuena: this.$route.query.pierna_buena,
            selectedFile: this.$route.query.avatar,
            missingParamsMsg: false,
            invalidPasswordMsg: false,
            passwordsDontMatchMsg: false,
            ageErrorMsg: false
        }
    },
    methods: {
    validatingData() {
      if(this.nombreJugador === '' || this.apellidosJugador === '' || this.nombreTutor === '' || this.apellidosTutor === '' || this.sexo === '' || this.provincia === '' || this.fechaNacimiento === '' || this.clubActual === '' || this.categoria === '' || this.posicion === '' || this.piernaBuena === '') {
        this.missingParamsMsg = true;
        Swal.fire({
            title: 'No puede haber campos vacíos!',
            text: 'Debes rellenar todos los campos para poder editar tu perfil',
            icon: 'error',
            confirmButtonText: 'OK',
        })
      } else if(moment().diff(this.fechaNacimiento, 'years') > 18) {
          this.ageErrorMsg = true;
          Swal.fire({
            title: 'El jugador debe ser menor de edad!',
            text: 'Debes ser mayor de edad para poder tener una cuenta de jugador',
            icon: 'error',
            confirmButtonText: 'OK',
        })
      } else {
        this.editarFamilia(this.infoGeneral);
        this.missingParamsMsg = false;
        this.invalidPasswordMsg = false;
        this.passwordsDontMatchMsg = false;
        this.ageErrorMsg = false;
      }
    },
    avatarPerfil(event) {
      this.selectedFile = event.target.files[0]
    },
    editarFamilia(infoGeneral) {
      let self = this;

      //cambiamos el email actual por el nuevo, en caso de que se haya añadido uno nuevo (si no simplemente se cambiará y se quedará el mismo)
      // localStorage.removeItem('EMAIL')
      // localStorage.setItem('EMAIL', self.emailTutor)

      let fd = new FormData();
      fd.set('name', self.nombreJugador)
      fd.set('surname', self.apellidosJugador)
      fd.set('nameTutor', self.nombreTutor)
      fd.set('surnameTutor', self.apellidosTutor)
      fd.set('emailTutor', self.emailTutor)
      fd.set('gender', self.sexo)
      fd.set('province', self.provincia)
      fd.set('birthDate', self.fechaNacimiento)
      fd.set('actualClub', self.clubActual)
      fd.set('category', self.categoria)
      fd.set('position', self.posicion)
      fd.set('strongLeg', self.piernaBuena)
      fd.append('avatarPerfil', self.selectedFile)
      axios.put(`http://localhost:7000/perfil/editar/familia/${this.infoGeneral.email_tutor}/home`,
      fd,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('AUTH_TOKEN_KEY')
        }
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      self.nombreJugador = '';
      self.apellidosJugador= '',
      self.nombreTutor = '',
      self.apellidosTutor = '',
      self.sexo = '',
      self.provincia = '',
      self.fechaNacimiento = '',
      self.clubActual = '',
      self.categoria = '',
      self.posicion = '',
      self.piernaBuena = '',
      self.selectedFile = null
      this.$router.push({name: 'PerfilHomeFamilias', params: infoGeneral.email_tutor}).catch(()=>{});
      location.reload()
    }
  }
}
</script>

<style scoped>
#formularioEdicion {
  background-color: #fff;
  max-width: 700px;
  width: 80%;
  margin: 20px auto;
  padding: 1rem;
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
#formularioEdicion {
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