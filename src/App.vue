<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { routes } from "./router";

const dynamicRoutes = routes.filter(route => {
  if (!route.name.startsWith("Info") && !route.name.startsWith("Compte") && !route.name.startsWith("Connexion") ) {
    return route.name;
  }
});
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="login">
        <router-link class="link-nav-menu" to="/login">Login</router-link>
        <router-link class="link-nav-menu" to="/account">Compte</router-link>
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
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');

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
  font-family: Ubuntu, sans-serif;
  font-size: 2em;
  text-decoration: none;
  color: white;
  margin: 0 10px;
  transition: color 0.3s ease-in-out; /* Animation de transition de la couleur */
}

.link-nav-main {
  --c:linear-gradient(#d2b735 0 0);
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
  color: #fafa80; /* Nouvelle couleur au survol */
}

.login .link-nav-main:hover {
  color: #fafa80; /* Nouvelle couleur au survol */
}

</style>

