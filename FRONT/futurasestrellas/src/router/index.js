import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'
import {isLoggedIn} from '@/utils/utils.js'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/landing',
    name: 'Landing',
    component: Landing,
    meta: {
      allowAnon: true
    }
  },
  {
    path: '/registrofamilia',
    name: 'RegistroFamilia',
    component: () => import('../views/RegistroFamilia.vue'),
    meta: {
      allowAnon: true
    }
  },
  {
    path: '/registroojeador',
    name: 'RegistroOjeador',
    component: () => import('../views/RegistroOjeador.vue'),
    meta: {
      allowAnon: true
    }
  },
  {
    path: '/loginfamilia',
    name: 'LoginFamilia',
    component: () => import('../views/LoginFamilia.vue'),
    meta: {
      allowAnon: true
    }
  },
  {
    path: '/loginojeador',
    name: 'LoginOjeador',
    component: () => import('../views/LoginOjeador.vue'),
    meta: {
      allowAnon: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      allowAnon: true
    }
  },
  {
    path: '/buscar',
    name: 'BuscarUsuarios',
    component: () => import('../views/BuscarUsuarios.vue'),
    meta: {
      allowAnon: true
    }
  },
  {
    path: '/perfil/ojeador/:email',
    name: 'PerfilHomeOjeadores',
    component: () => import('../views/PerfilHomeOjeadores.vue'),
    meta: {
      allowAnon: true
    }
  },
  {
    path: '/perfil/familia/:email',
    name: 'PerfilHomeFamilias',
    component: () => import('../views/PerfilHomeFamilias.vue'),
    meta: {
      allowAnon: true
    }
  },
  {
    path: '/perfil/familia/:email/videos',
    name: 'PerfilVideosFamilias',
    component: () => import('../views/PerfilVideosFamilias.vue'),
    meta: {
      allowAnon: true
    }
  },
  {
    path: '/mensajes/familia/:email',
    name: 'ContratosRecibidosJugadores',
    component: () => import('../views/ContratosRecibidosJugadores.vue'),
    meta: {
      allowAnon: false
    }
  },
  {
    path: '/mensajes/ojeador/:email',
    name: 'ContratosEnviadosOjeadores',
    component: () => import('../views/ContratosEnviadosOjeadores.vue'),
    meta: {
      allowAnon: false
    }
  },
  {
    path: '/perfil/editar/familia/:email',
    name: 'EditarPerfilHomeFamilias',
    component: () => import('../views/EditarPerfilHomeFamilias.vue'),
    meta: {
      allowAnon: false
    }
  },
  {
    path: '/perfil/editar/ojeador/:email',
    name: 'EditarPerfilHomeOjeadores',
    component: () => import('../views/EditarPerfilHomeOjeadores.vue'),
    meta: {
      allowAnon: false
    }
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('../views/Error.vue'),
    meta: {
      allowAnon: true
    }
  }
]

const router = new VueRouter({
  routes
})
// esta funcion se ejecuta cada vez que entras en cualquier ruta
router.beforeEach((to, from, next) => {
  if (!to.meta.allowAnon && !isLoggedIn()) { //si la pagina no permite anonimos y tu no estas logeado, no puedes entrar
    next({
      path: '/error'
    })
  } else { //si se da otro caso, si puedes entrar
    next()
  }
})

export default router
