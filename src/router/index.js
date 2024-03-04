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
        path: '/infoFilm/:idFilm',
        name: 'InfoFilm',
        component: () => import('../components/InfoMovie.vue')
    },
    {
        path: '/infoActor/:idActor',
        name: 'InfoActor',
        component: () => import('../components/InfoActor.vue')
    },
    {
        path: '/moovieByCategorie/:idCategorie',
        name: 'MoovieByCategorie',
        component: () => import('../components/MoovieByCategorie.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    // history: createWebHistory(`/moviesApp`),
    routes,
    // base: `/moviesApp`,
})

export default router