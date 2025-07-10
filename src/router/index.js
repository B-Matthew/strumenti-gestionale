import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Strumenti from '@/views/Strumenti.vue'
import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from "firebase/auth";
import Operatori from '../views/Operatori.vue'

const routes = [
    { path: '/login', name: 'Login', component: Login, meta: {layout: 'no-header'} },
    { path: '/', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
	{ path: '/strumenti', name: 'Strumenti', component: Strumenti, meta: { requiresAuth: true } },
	{ path: '/operatori', name: 'Operatori', component: Operatori, meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
	scrollBehavior(to, from, savedPosition) {
		// Se disponibile, torna alla posizione salvata (es. tasto Indietro)
		if (savedPosition) {
			return savedPosition
		} else {
			// Altrimenti scrolla in cima alla pagina
			return { top: 0 }
		}
	}
})

let isAuthChecked = false;

// Protezione delle rotte
router.beforeEach((to, from, next) => {
  if (isAuthChecked) {
    const user = auth.currentUser;
    if (to.meta.requiresAuth && !user) {
      next("/login");
    } else {
      next();
    }
  } else {
    // Prima volta: aspetta che Firebase recuperi lo stato
    onAuthStateChanged(auth, (user) => {
      isAuthChecked = true;
      if (to.meta.requiresAuth && !user) {
        next("/login");
      } else {
        next();
      }
    });
  }
});

export default router