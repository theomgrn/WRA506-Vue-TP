<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { routes } from './router';

const dynamicRoutes = routes.filter(route => {
  if (!route.name.startsWith('Info')
      && !route.name.startsWith('Compte')
      && !route.name.startsWith('Connexion')
      && !route.name.startsWith('MoovieByCategorie'))
  {
    return route.name;
  }
});

const isAuthenticated = ref(false);
const user = ref(localStorage.getItem('userMail') || '');

const checkToken = () => {
  const token = localStorage.getItem('userToken');
  isAuthenticated.value = !!token;
  user.value = localStorage.getItem('userMail') || '';
};

const logout = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userMail');
  isAuthenticated.value = false;
  user.value = '';
};

onMounted(() => {
  checkToken();
  watchEffect(() => {
    checkToken();
  });
});

const router = useRouter();

router.beforeEach((to, from, next) => {
  checkToken();
  next();
});
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="login">
        <router-link v-if="!isAuthenticated" class="link-nav-menu" to="/login">Login</router-link>
        <router-link v-if="isAuthenticated" @click="logout" class="link-nav-menu" to="/">Logout</router-link>
        <router-link v-if="isAuthenticated" class="link-nav-menu" to="/account">{{user}}</router-link>
      </div>
      <nav>
        <router-link
            class="link-nav-main"
            v-for="route in dynamicRoutes"
            :key="route.name"
            :to="{ name: route.name}"
        >
          {{ route.name }}
        </router-link>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
.login{
  display: flex;
  justify-content: flex-end;
}
nav {
  display: flex;
  justify-content: space-between;
  padding: 1em 10em 2em 10em
}
@media screen and (max-width: 1024px) {
  nav {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 1em;
  }
}

.link-nav-menu {
  text-decoration: none;
  color: white;
  margin: 0 10px;
  transition: color 0.3s ease-in-out; /* Animation de transition de la couleur */
}

.link-nav-main {
  font-family: 'Lilita One', sans-serif;
  font-size: 2em;
  text-decoration: none;
  color: white;
  margin: 0 10px;
  text-transform: uppercase;
  --c:linear-gradient(navajowhite 0 0);
  padding-bottom: .15em;
  background: var(--c), var(--c);
  background-size: .3em .1em;
  background-position:50% 100%;
  background-repeat: no-repeat;
  transition: .3s linear, background-size .3s;
}
.link-nav-main:hover {
  background-size: 40% .1em;
  background-position: 10% 100%, 90% 100%;
}
/**/

/* Animation de survol pour le lien 'Login' */
.login .link-nav-menu:hover {
  color: navajowhite; /* Nouvelle couleur au survol */
}

.login .link-nav-main:hover {
  color: navajowhite; /* Nouvelle couleur au survol */
}

</style>

