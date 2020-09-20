<template>
  <div>
      <vue-headful title="Buscar Usuarios | FuturasEstrellas"/>
      <menucustom/>
      <h1>BUSCAR USUARIOS</h1>
      <!-- div del formulario de busqueda de usuarios -->
      <div id="formularioBusqueda">
          <div class="elementoBuscar">
            <label for="rol">Tipo de cuenta: <br>(obligatorio seleccionar una opción)</label>
            <br>
            <select v-model="rol" name="rol" id="rol">
                <option value="familia">Jugador/a</option>
                <option value="ojeador">Ojeador/a</option>
            </select>
        </div>

      <div class="elementoBuscar">
        <label for="nombre">Nombre:</label>
        <br>
        <input type="search" name="nombre" v-model="nombre">
      </div>

      <div class="elementoBuscar">
        <label for="apellidos">Apellidos:</label>
        <br>
        <input type="search" name="apellidos" v-model="apellidos">
      </div>

      <div class="elementoBuscar">
        <label for="sexo">Sexo:</label>
        <br>
            <select v-model="sexo" name="sexo" id="sexo">
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
            </select>
      </div>

      <div class="elementoBuscar">
            <label for="provincia">Provincia de residencia:</label>
            <br>
        <select v-model="provincia" name="provincia" id="provincia">
            <option value='alava'>Álava</option>
            <option value='albacete'>Albacete</option>
            <option value='alicante'>Alicante/Alacant</option>
            <option value='almeria'>Almería</option>
            <option value='asturias'>Asturias</option>
            <option value='avila'>Ávila</option>
            <option value='badajoz'>Badajoz</option>
            <option value='barcelona'>Barcelona</option>
            <option value='burgos'>Burgos</option>
            <option value='caceres'>Cáceres</option>
            <option value='cadiz'>Cádiz</option>
            <option value='cantabria'>Cantabria</option>
            <option value='castellon'>Castellón/Castelló</option>
            <option value='ceuta'>Ceuta</option>
            <option value='ciudadreal'>Ciudad Real</option>
            <option value='cordoba'>Córdoba</option>
            <option value='cuenca'>Cuenca</option>
            <option value='girona'>Girona</option>
            <option value='laspalmas'>Las Palmas</option>
            <option value='granada'>Granada</option>
            <option value='guadalajara'>Guadalajara</option>
            <option value='guipuzcoa'>Guipúzcoa</option>
            <option value='huelva'>Huelva</option>
            <option value='huesca'>Huesca</option>
            <option value='illesbalears'>Illes Balears</option>
            <option value='jaen'>Jaén</option>
            <option value='acoruña'>A Coruña</option>
            <option value='larioja'>La Rioja</option>
            <option value='leon'>León</option>
            <option value='lleida'>Lleida</option>
            <option value='lugo'>Lugo</option>
            <option value='madrid'>Madrid</option>
            <option value='malaga'>Málaga</option>
            <option value='melilla'>Melilla</option>
            <option value='murcia'>Murcia</option>
            <option value='navarra'>Navarra</option>
            <option value='ourense'>Ourense</option>
            <option value='palencia'>Palencia</option>
            <option value='pontevedra'>Pontevedra</option>
            <option value='salamanca'>Salamanca</option>
            <option value='segovia'>Segovia</option>
            <option value='sevilla'>Sevilla</option>
            <option value='soria'>Soria</option>
            <option value='tarragona'>Tarragona</option>
            <option value='santacruztenerife'>Santa Cruz de Tenerife</option>
            <option value='teruel'>Teruel</option>
            <option value='toledo'>Toledo</option>
            <option value='valencia'>Valencia/Valéncia</option>
            <option value='valladolid'>Valladolid</option>
            <option value='vizcaya'>Vizcaya</option>
            <option value='zamora'>Zamora</option>
            <option value='zaragoza'>Zaragoza</option>
        </select>
        </div>

      <div class="elementoBuscar">
        <label for="edadMinima">Edad mínima:</label>
        <br>
        <input type="number" name="edadMinima" v-model="edadMinima" min="1" max="100">
      </div>

      <div class="elementoBuscar">
        <label for="edadMaxima">Edad máxima:</label>
        <br>
        <input type="number" name="edadMaxima" v-model="edadMaxima" min="1" max="100">
      </div>

      <div class="elementoBuscar">
        <label for="posicionPrincipal">Posición principal:</label>
        <br>
        <select v-model="posicion" name="posicionPrincipal" id="posicionPrincipal">
            <option value="portero">Portero</option>
            <option value="lateral-derecho">Lateral Derecho</option>
            <option value="lateral-izquierdo">Lateral Izquierdo</option>
            <option value="central-derecho">Central Derecho</option>
            <option value="central-izquierdo">Central Izquierdo</option>
            <option value="mediocentro-defensivo">Mediocentro Defensivo</option>
            <option value="medioccentro-creador">Mediocentro Creador</option>
            <option value="mediocentro-ofensivo">Mediocentro Ofensivo</option>
            <option value="extremo-derecho">Extremo Derecho</option>
            <option value="extremo-izquierdo">Extremo Izquierdo</option>
            <option value="delantero">Delantero</option>
        </select>
      </div>

      <div class="elementoBuscar">
        <label for="categoria">Categoría:</label>
        <br>
        <select v-model="categoria" name="categoria" id="categoria">
            <option value="prebenjamín">Prebenjamín</option>
            <option value="benjamín">Benjamín</option>
            <option value="alevín">Alevín</option>
            <option value="infantil">Infantil</option>
            <option value="cadete">Cadete</option>
            <option value="juvenil">Juvenil</option>
        </select>
      </div>

      <div class="elementoBuscar">
        <label for="piernaBuena">Pierna buena:</label>
        <br>
        <select v-model="piernaBuena" name="piernaBuena" id="piernaBuena">
            <option value="derecha">Derecha</option>
            <option value="izquierda">Izquierda</option>
            <option value="ambas">Ambas</option>
        </select>
      </div>
      </div>
      <!-- este boton llama a la funcion de validar datos, que nos dira si nuestros datos son correctos -->
      <div id="botonesBuscar">
        <button class="big-button" @click="validatingData()">Buscar usuarios</button>
        <button class="big-button" @click="limpiarFiltros()">Limpiar filtros</button>
      </div>
      <h2>RESULTADOS</h2>
      <div id="listaUsuarios">
          <ul v-for="user in users" :key="user.index">
          <li>
              <table @click="redirectProfile(user.email, user.email_tutor)">
                  <tr>
                      <td class="tdImagen">
                      <img class="imagenAvatar" :src="getImgUrl(user.avatar)" alt="avatar de perfil">
                    </td>
                    <td class="titulos1">
                        <p class="titulo">Nombre:</p>
                        <p class="titulo">Categoría:</p>
                        <p class="titulo">Posición:</p>
                    </td>
                    <td class="tdDatos1">
                      <p> {{user.nombre}} {{user.apellidos}} {{user.nombre_jugador}} {{user.apellidos_jugador}}</p>
                      <p> {{user.categoria}} {{user.categoria_busca}}</p>
                      <p> {{user.posicion_principal}} {{user.posicion_principal_busca}}</p>
                    </td>
                    <td class="titulos2">
                        <p class="titulo">Sexo:</p>
                        <p class="titulo">Provincia:</p>
                        <p class="titulo">Pierna:</p>
                    </td>
                    <td class="tdDatos2">
                      <p>{{user.sexo}}</p>
                      <p>{{user.provincia}}</p>
                      <p>{{user.pierna_buena}} {{user.pierna_buena_busca}}</p>
                    </td>
                  </tr>
              </table>
          </li>
      </ul>
      </div>
  </div>
</template>

<script>
import menucustom from '@/components/MenuCustom.vue'
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
    name: 'BuscarUsuarios',
    components: {
        menucustom //importamos el menu de navegacion desde su componente
    },
    data() {
        return { //añadimos los datos a rellenar para la busqueda de usuarios
            rol: '',
            nombre: '',
            apellidos: '',
            sexo: '',
            provincia: '',
            edadMaxima: '',
            edadMinima: '',
            clubActual: '',
            categoria: '',
            posicion: '',
            piernaBuena: '',
            users: []
        }
    },
    methods: {
        redirectProfile(emailOjeador, emailFamilia) {
            if (emailOjeador !== undefined) {
                this.$router.push(`/perfil/ojeador/${emailOjeador}`)
            } else if (emailFamilia !== undefined) {
                this.$router.push(`/perfil/familia/${emailFamilia}`)
            }
        },
        getImgUrl(file) {
            return require('./../../../../BACK/' + file);
        },
        validatingData() { //comprobamos si el campo de rol ha sido especificado
            if (this.rol === '') {
                Swal.fire({
                    title: 'El campo de rol no puede estar vacío!',
                    text: 'Debes rellenar el campo de rol para poder buscar usuarios',
                    icon: 'error',
                    confirmButtonText: 'OK',
                })
            } else {
                this.buscarUsuarios();
            }
        },
        buscarUsuarios () { //llamamos a la api para buscar usuarios
            let self = this;
            axios.get(`http://localhost:7000/search?rol=${self.rol}&nombre=${self.nombre}&apellidos=${self.apellidos}&genero=${self.sexo}&provincia=${self.provincia}&edadMinima=${self.edadMinima}&edadMaxima=${self.edadMaxima}&posicion=${self.posicion}&categoria=${self.categoria}&piernaBuena=${self.piernaBuena}&`)
            .then(function(response) {
                self.users = response.data
            })
            .catch(function(error) {
                console.log(error)
            })
        },
        limpiarFiltros() {
            this.nombre = '';
            this.rol = '';
            this.nombre = '';
            this.apellidos = '';
            this.sexo = '';
            this.provincia = '';
            this.edadMaxima = '';
            this.edadMinima = '';
            this.clubActual = '';
            this.categoria = '';
            this.posicion = '';
            this.piernaBuena = '';
        }
    }
}
</script>

<style scoped>
#formularioBusqueda {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 1rem;
  justify-content: space-evenly;
  background-color:#f08848c9;
}
input {
  margin: 0 1rem 1rem 1rem;
  border: 0;
  border-bottom: 2px solid #35495E;
  color: #2e4e6e;
  outline: 0;
  font-size: 1rem;
  background: transparent;
  transition: border-color 0.2s;
}
select {
  margin: 0 1rem 1rem 1rem;
  border: 0;
  border-bottom: 2px solid #35495E;
  color: #2e4e6e;
  outline: 0;
  font-size: 1rem;
  background: transparent;
  transition: border-color 0.2s ease-in-out;
}
label {
    margin: 0 1rem 0 1rem;
    font-weight: 600;
}
ul {
    list-style: none;
}
.tdImagen {
    margin: 0;
}
.imagenAvatar {
    width: 125px;
    height: 125px;
    object-fit: cover;
    border-radius: 50%;
    padding: 1rem;
}
#listaUsuarios {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
}
table {
    background-color:#ffb383bb;
    width: 80vw;
    max-width: 900px;
    border-radius: 1rem;
    transition: all .2s ease-in-out;
}
table:hover {
    cursor: pointer;
    transform: scale(1.05)
}
td {
    width: 30%;
}
.titulos1 {
    width: auto;
    height: auto;
}
.titulos2 {
    width: auto;
}
.titulo {
    font-weight: 700;
    font-size: 110%;
}
.elementoBuscar {
    padding: 1rem;
}
h1 {
    background-color:#f08848c9;
    margin: 0;
    padding: 1rem;
    color: #35495E;
    text-shadow: 2px 2px #bcdcff;
}
h2 {
    color: #35495E;
    text-shadow: 2px 2px #bcdcff;
}
#botonesBuscar {
    background-color:#f08848c9;
    border-radius: 0 0 2rem 2rem;
    padding: 0 1rem 3rem 1rem;
}

@media screen and (max-width: 480px) {
    .elementoBuscar {
    padding: 0;
}
input {
  margin: 0 1rem 1rem 1rem;
}
select {
  margin: 0 1rem 1rem 1rem
}
label {
    margin: 0 1rem 0 1rem;
}
}
button {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  color: #35495E;
  vertical-align: middle;
  text-decoration: none;
  font-weight: 700;
  text-transform: uppercase;
  font-family: inherit;
  margin: 1rem;
}
button.big-button {
   padding: 1em 2em;
   border: 2px solid #35495E;
   border-radius: 1em;
   background:#6b93be;
   transform-style: preserve-3d;
   transition: all 175ms cubic-bezier(0, 0, 1, 1);
}
button.big-button::before {
    position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #547495;
  border-radius: inherit;
    box-shadow: 0 0 0 2px #35495E, 0 0.75em 0 0 #496583;
 transform: translate3d(0, 0.75em, -1em);
     transition: all 175ms cubic-bezier(0, 0, 1, 1);
}


button.big-button:hover {
  background: #469fff;
  transform: translate(0, 0.375em);
}

button.big-button:hover::before {
  transform: translate3d(0, 0.75em, -1em);
}

button.big-button:active {
            transform: translate(0em, 0.75em);
}

button.big-button:active::before {
  transform: translate3d(0, 0, -1em);
  
      box-shadow: 0 0 0 2px var(--colorShadeB), 0 0.25em 0 0 var(--colorShadeB);

}
</style>