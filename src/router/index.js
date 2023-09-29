import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
    {
        path: '/',
        name: 'Nouveautés',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/movies',
        name: 'Films',
        component: () => import('../views/Movies.vue')
    },
    {
        path: '/categories',
        name: 'Categories',
        component: () => import('../views/Categories.vue')
    },
    {
        path: '/actors',
        name: 'Acteurs',
        component: () => import('../views/Actors.vue')
    },
    {
        path: '/login',
        name: 'Connexion',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/account',
        name: 'Compte',
        component: () => import('../views/Account.vue')
    },
    {
        path: '/info/:idFilm',
        name: 'InfoFilm',
        component: () => import('../components/InfoMovie.vue')
    },
    {
        path: '/info/:idActor',
        name: 'InfoActeur',
        component: () => import('../components/InfoActor.vue')
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router