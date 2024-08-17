import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import BoleteriaView from '../views/BoleteriaView.vue';
import HomeView from '../views/HomeView.vue'
import GerenteHomeView from '../views/GerenteHomeView.vue'
import GerenteFormsView from '../views/GerenteFormsView.vue'
import AsientosView from '../views/AsientosView.vue'
import Prueba from '../views/Prueba.vue'
import GuestLoginView from '../views/GuestLoginView.vue'
import SnackSelectionView from '../views/SnackSelectionView.vue'
import FacturacionView from '../views/facturacionView.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView 
   // redirect: '/login'
  },
  {
    path: '/:sucursal',
    name: 'HomeSucursal',
    component: HomeView
  },
  {
    path: '/gerente/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/gerente/form/:feature',
    name: 'GerenteFeatures',
    component: GerenteFormsView,
    meta: { requiresAuth: true, }
  },
  {
    path: '/:sucursal/proyecciones/:name/:id',
    name: 'Proyeccion',
    component: Prueba
  },
  {
    path: '/:sucursal/proyecciones/:name/:id/:idProyeccion',
    name: 'Boleteria',
    component: BoleteriaView
  },
  {
    path: '/:sucursal/proyecciones/:pelicula/:id/:idProyeccion/dulceria',
    name: 'Dulceria',
    component: SnackSelectionView
  },
  {
    path: '/:sucursal/proyecciones/:name/:id/:idProyeccion/asientos',
    name: 'Asientos',
    component: AsientosView
  },
  {
    path: '/gerente',
    name: 'GerenteHome',
    component: GerenteHomeView,
    meta: { requiresAuth: true, }
  },
  {
    path: '/:sucursal/proyecciones/:name/:id/:idProyeccion/login/cliente',
    name: 'GuestLogin',
    component: GuestLoginView
  },
  {
    path: '/:sucursal/proyecciones/:pelicula/:id/:idProyeccion/dulceria/facturacion',
    name: 'Facturacion',
    component: FacturacionView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
