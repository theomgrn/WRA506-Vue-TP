<script setup>
import {onMounted, ref} from 'vue'
import axios from 'axios'
import {baseURL} from '../config.js'
import {RouterLink} from "vue-router";

let isLoading = ref(true);
let movies = ref([]);
let actors = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(`${baseURL}movies?page=1`);
    movies.value = response.data;
    isLoading.value = false;
    console.log("movies", movies);
  } catch (error) {
    console.error(error);
  }
});

onMounted(async () => {
  try {
    const response = await axios.get(`${baseURL}actors?page=1`);
    actors.value = response.data;
    isLoading.value = false;
    console.log("actors", actors);
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>

  <p class="divider">FILMS</p>
  <div class="listing">
    <router-link class="listing-link"  v-for="movie in movies['hydra:member']" :key="movie.id" to="/InfoMovie">  {{ movie.title }}</router-link>
  </div>
  <p class="divider">ACTEURS</p>
  <div class="listing">
    <router-link class="listing-link"  v-for="actor in actors['hydra:member']" :key="actor.id" to="/InfoActor">{{ actor.firstName }} {{ actor.lastName }}</router-link>
  </div>

</template>

<style scoped>
.listing-link {
  text-decoration: none;
  color: white;
  margin: 0 10px;
  transition: color 0.3s ease-in-out; /* Animation de transition de la couleur */
}
.listing-link:hover {
  color: #d2b735;
}
.divider {
  font-family: "Roboto Light", sans-serif;
  color: #fff;
  font-size: 3vh;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, .45);
  display: flex;
  justify-content: center;
  align-items: center;

  &::before,
  &::after {
    content: '';
    display: block;
    height: 0.09em;
    min-width: 30vw;
  }

  &::before {
    background: linear-gradient(to right, rgba(240,240,240,0), #d2b735);
    margin-right: 4vh;
  }

  &::after {
    background: linear-gradient(to left, rgba(240,240,240,0), #d2b735);
    margin-left: 4vh;
  }
}
</style>
