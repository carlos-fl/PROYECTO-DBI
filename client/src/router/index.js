import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import BoleteriaView from '../views/BoleteriaView.vue';
import HomeView from '../views/HomeView.vue'
<<<<<<< HEAD
import GerenteHomeView from '../views/GerenteHomeView.vue'
import GerenteFormsView from '../views/GerenteFormsView.vue'
import Prueba from '../views/Prueba.vue'
=======
import GuestLoginForm from '../views/GuestLoginView.vue'
>>>>>>> 12b9f4d (Includes view for registering a new customer)


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
    component: GerenteFormsView 
  },
  {
    path: '/:sucursal/proyecciones/:name/:id',
    name: 'Proyeccion',
    component: Prueba
  },
  {
    path: '/boleteria/:id',
    name: 'Boleteria',
    component: BoleteriaView
  },
  {
<<<<<<< HEAD
    path: '/gerente',
    name: 'GerenteHome',
    component: GerenteHomeView,
    meta: { requiresAuth: true, }
=======
    path: '/invitado',
    name: 'invitado',
    component: GuestLoginForm
>>>>>>> 12b9f4d (Includes view for registering a new customer)
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
