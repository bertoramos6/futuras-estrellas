<template>
  <nav>
      <div id="fondoMobile"></div>
      <show-at :breakpoints="{small: 759, medium: 1280, large: 1600}" breakpoint="small">
        <img :src="require('./../assets/logoPequeno.png')" class="logo" id="logoMobile" alt="Logo" height="40px" width="40px">
      </show-at>
      <show-at :breakpoints="{small: 759, medium: 1280, large: 1600}" breakpoint="mediumAndAbove">
        <img :src="require('./../assets/logoPequeno.png')" class="logo" id="logoDesktop" alt="Logo" height="40px" width="40px">
      </show-at>
      <ul ref="nav">
          <figure class="image-logo" @click="toggleNav">
              <hide-at :breakpoints="{small: 759, medium: 1280, large: 1600}" breakpoint="mediumAndAbove">
                <i class="ion-ios-menu" id="iconoMenu"/>
              </hide-at>
          </figure>
          <li @mouseenter="$event.currentTarget.style.background = '#ddd'" @mouseleave="$event.currentTarget.style.background = '#fff'">
              <router-link :to="{name:'Home'}">
                  Home
                  <i class="ion-ios-home"/>
              </router-link>
          </li>
          <li @mouseenter="$event.currentTarget.style.background = '#ddd'" @mouseleave="$event.currentTarget.style.background = '#fff'">
              <router-link :to="{name:'BuscarUsuarios'}">
                  Buscar
                  <i class="ion-ios-search"/>
              </router-link>
          </li>
          <li v-show="family" @mouseenter="$event.currentTarget.style.background = '#ddd'" @mouseleave="$event.currentTarget.style.background = '#fff'">
              <router-link :to="{name:'PerfilHomeFamilias', params: {email: getEmail()}}">
                  Perfil
                  <i class="ion-ios-person"/>
              </router-link>
          </li>
          <li v-show="scout" @mouseenter="$event.currentTarget.style.background = '#ddd'" @mouseleave="$event.currentTarget.style.background = '#fff'">
              <router-link :to="{name:'PerfilHomeOjeadores', params: {email: getEmail()}}">
                  Perfil
                  <i class="ion-ios-person"/>
              </router-link>
          </li>
          <li v-show="scout" @mouseenter="$event.currentTarget.style.background = '#ddd'" @mouseleave="$event.currentTarget.style.background = '#fff'">
              <router-link :to="{name:'ContratosEnviadosOjeadores', params: {email: getEmail()}}">
                  Contratos enviados
                  <i class="ion-ios-chatbubbles"/>
              </router-link>
          </li>
          <li v-show="family" @mouseenter="$event.currentTarget.style.background = '#ddd'" @mouseleave="$event.currentTarget.style.background = '#fff'">
              <router-link :to="{name:'ContratosRecibidosJugadores', params: {email: getEmail()}}">
                  Contratos recibidos
                  <i class="ion-ios-chatbubbles"/>
              </router-link>
          </li>
          <li id="logoutButton" v-show="logged" @mouseenter="$event.currentTarget.style.background = '#ddd'" @mouseleave="$event.currentTarget.style.background = '#fff'">
            <button @click="logoutUser()">Salir</button>
          </li>
          <li id="loginButton" v-show="notLogged" @mouseenter="$event.currentTarget.style.background = '#ddd'" @mouseleave="$event.currentTarget.style.background = '#fff'">
            <button @click="loginUser()">Iniciar sesión / Registrarse</button>
          </li>
      </ul>
  </nav>
</template>

<script>
import {showAt, hideAt} from 'vue-breakpoints'
import { logout, isLoggedIn, isFamily, isScout } from '@/utils/utils.js'

export default {
    components: {
        hideAt,
        showAt
    },
    props: ['imagePath'],
      data (){
          return {
              logged: false,
              notLogged: false,
              famliy: false,
              scout: false
          }
      },
    methods: {
        toggleNav() {
            const nav = this.$refs.nav.classList
            nav.contains('active') ? nav.remove('active') : nav.add('active')
        },
        getLogin() {
            this.logged = isLoggedIn()
            this.notLogged = !isLoggedIn()
        },
        getIsFamily() {
            this.family = isFamily()
        },
        getIsScout() {
            this.scout = isScout()
        },
        logoutUser() {
          logout()
          this.$router.push('/').catch(()=>{});
        },
        loginUser() {
            this.$router.push('/landing').catch(()=>{});
        },
        getEmail() {
            return localStorage.getItem('EMAIL')
        }
    },
    created() {
        this.getLogin()
        this.getIsFamily()
        this.getIsScout()
    }
}
</script>

<style scoped>
html, body {
    height: 100%;
    overflow: hidden;
}
nav {
    height: 70px;
    width: 100%;
    box-shadow: 5px 5px 7px rgb(71, 71, 71);
    background-color: #fff;
}
nav ul {
    display: flex;
    height: 100%;
    align-items: center;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    padding-inline-start: 0;
    list-style: none;
    box-shadow: 1px 1px 2px #CCC;
    background-color: #fff;
    margin-left: 50px;
}
nav ul a {
    text-decoration: none;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
}
nav ul li {
    list-style-type: none;
    padding: 10px 20px;
    border-radius: 1rem;
    margin-left: 10px;
}
nav ul i {
    margin-right: 10px;
    font-size: 20px;
    color: #35495E;
}
figure {
    cursor: pointer;
}
#iconoMenu {
    font-size: 200%;
    padding-left: 1rem
}
nav ul li a {
    color: #35495E;
}
#logoDesktop {
    position:absolute;
    top:0;
    left: 0;
    padding: 10px 0 0 10px;
}
.logo {
    cursor: pointer;
    height: 55px;
    width: 55px;
}
#logoutButton {
    position: absolute;
    right: 0;
}
#loginButton {
    position: absolute;
    right: 0;
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

@media screen and (max-width: 759px) {

    nav {
        height: 70px;
        position:top;
        top: 0;
    }
    nav ul {
        position: fixed;
        z-index: 2;
        width: 300px;
        flex-direction: column;
        padding: 0;
        left: -355px;
        transition: 300ms ease all;
        top: 60px;
    }
    nav ul.active {
        left: -50px;
    }
    nav ul li {
        width: 100%;
        padding-left: 0;
        padding-right: 0;
    }
    nav ul a {
        flex-direction: row;
        margin-left: 20px;
        justify-content: space-between;
        margin-right: 13px;
    }
    #iconoMenu {
        font-size: 200%;
        padding-left: 1rem;
        position: fixed;
        z-index: 1;
        top: 10px;
        left: 2px;
        z-index: 3;
    }
    #logoMobile {
        position: fixed;
        margin-left: -20px;
        margin-top: 10px;
        z-index:3;
    }
    #fondoMobile {
        height: 70px;
        width:100%;
        position: fixed;
        box-shadow: 1px 1px 20px #585858;
        background-color: #fff;z-index:2;
    }
    #logoutButton {
        position: relative;
    }
    #loginButton {
        position: relative;
    }
}
</style>