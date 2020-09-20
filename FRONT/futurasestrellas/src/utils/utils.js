import axios from 'axios'
import Swal from 'sweetalert2'
import jwt from 'jwt-decode'

const ENDPOINT = 'http://localhost:7000'

//funcion para iniciar sesion en caso de ser familia
export async function iniciarSesionFamilia(email, contrasena) {
    try {
      await axios.post(`${ENDPOINT}/loginFamilia`, {
        email: email,
        password: contrasena
      })
      .then(async function(response) {
          //si el token está vacío, no se ha encontrado el usuario en la base de datos
        if(response.data.token === '') {
            throw error;
        }
        //guardo el token
        setAuthToken(response.data.token)
        //guardo el email
        setEmail(email)
        //guardo el rol
        setID(response.data.responseDTO.id)
        //guardo el nombre de user
        setRole(response.data.responseDTO.rol)
      })
      .catch(function(error) { //devolvemos el error de no haber encotrado el usuario
        Swal.fire({
            title: 'El email y la contraseña no coinciden!',
            text: 'No hemos encontrado correlación entre el email y la contraseña introducidos en nuestra base de datos',
            icon: 'error',
            confirmButtonText: 'OK'
          })
      })
    } catch(error) {
      console.log(error)
    }
  }
  //funcion para iniciar sesion en caso de ser ojeador
  export async function iniciarSesionOjeador(email, contrasena) {
    try {
      await axios.post(`${ENDPOINT}/loginOjeador`, {
        email: email,
        password: contrasena
      })
      .then(async function(response) {
          //si el token está vacío, no se ha encontrado el usuario en la base de datos
        if(response.data.token === '') {
            throw error;
        }
        //guardo el token
        setAuthToken(response.data.token)
        //guardo el id
        setID(response.data.responseDTO.id)
        //guardo el email
        setEmail(email)
        //guardo el rol
        setRole(response.data.responseDTO.rol)
      })
      .catch(function(error) { //devolvemos el error de no haber encotrado el usuario
        Swal.fire({
            title: 'El email y la contraseña no coinciden!',
            text: 'No hemos encontrado correlación entre el email y la contraseña introducidos en nuestra base de datos',
            icon: 'error',
            confirmButtonText: 'OK'
          })
      })
    } catch(error) {
      console.log(error)
    }
  }
//funcion para guardar el jsonwebtoken en el local storage
export function setAuthToken(token) {
    axios.defaults.headers.common['Authorization'] = token
    localStorage.setItem('AUTH_TOKEN_KEY', token)
}
//funcion que guarda el id en localstorage
export function setID(id) {
    localStorage.setItem('ID', id)
}
//funcion que guarda el email en el localstorage
export function setEmail(email) {
    localStorage.setItem('EMAIL', email)
}
//funcion que guarda el rol en localstorage
export function setRole(rol) {
    localStorage.setItem('ROL', rol)
}
//funcion para recuperar el token desde el localstorage
export function getAuthToken() {
    return localStorage.getItem('AUTH_TOKEN_KEY')
}


//funcion para conseguir la fecha de caducidad del token
export function tokenExpiration(encodedToken) {
    let token = jwt(encodedToken)
    if(!token.exp) {
        return null
    }
    let date = new Date(0)
    date.setUTCSeconds(token.exp)
    return date 
}
//funcion que comprueba si el token esta pocho o no
export function isExpired(token) {
    let expirationDate = tokenExpiration(token)
    return expirationDate < new Date()
}
//funcion que comprueba si la persona esta logeada y su token es valido
export function isLoggedIn() {
    let authToken = getAuthToken()
    return !!authToken && !isExpired(authToken)
}

//funcion para recuperar el rol desde el localstorage
export function getRole() {
    return localStorage.getItem('ROL')
}
//funcion para recuperar el email desde localstorage
export function getEmail() {
  return localStorage.getItem('EMAIL')
}
//funcion que comprueba si la persona es una familia
export function isFamily() {
    let authToken = getAuthToken()
    let rol = getRole()

    return !!authToken && !isExpired(authToken) && rol === 'familia'
}
//funcion que comprueba si la persona es una ojeador
export function isScout() {
    let authToken = getAuthToken()
    let rol = getRole()

    return !!authToken && !isExpired(authToken) && rol === 'ojeador'
}

// funcion de logout
export function logout() {
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('AUTH_TOKEN_KEY')
    localStorage.removeItem('ID')
    localStorage.removeItem('ROL')
    localStorage.removeItem('EMAIL')
}
//funcion para comprobar si un usuario es el dueño del perfil de jugador
export function isOwnerPlayer(emailUsuario) {
  let authToken = getAuthToken()
  let email = getEmail()
  let rol = getRole()

  return !!authToken && !isExpired(authToken) && email === emailUsuario && rol === 'familia'
}
//funcion para comprobar si un usuario es el dueño del perfil de ojeador
export function isOwnerScout(emailUsuario) {
  let authToken = getAuthToken()
  let email = getEmail()
  let rol = getRole()

  return !!authToken && !isExpired(authToken) && email === emailUsuario && rol === 'ojeador'
}