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
    const response = await axios.get(`${baseURL}movies?page=1&itemsPerPage=4&order[releaseDate]=desc`);
    movies.value = response.data;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
});

onMounted(async () => {
  try {
    const response = await axios.get(`${baseURL}actors?page=1&itemsPerPage=4&order[id]=desc`);
    actors.value = response.data;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>

    <p class="divider">FILMS</p>
    <div class="listing">
      <div v-if="isLoading" class="loading"><img src="../assets/loader.gif"></div>
      <div class="cases">
        <router-link class="listing-link case" v-for="movie in movies['hydra:member']" :key="movie.id" :to="{ name: 'InfoFilm', params: { idFilm: movie.id } }">
          {{ movie.title }}
        </router-link>
      </div>
    </div>
  <p class="divider">ACTEURS</p>
  <div class="listing">
    <div v-if="isLoading" class="loading"><img src="../assets/loader.gif"></div>
    <div class="cases">
      <router-link class="listing-link case" v-for="actor in actors['hydra:member']" :key="actor.id" :to="{ name: 'InfoActor', params: { idActor: actor.id } }">
        {{ actor.firstName }} {{ actor.lastName }}
      </router-link>
    </div>
  </div>

</template>

<style scoped>

</style>
