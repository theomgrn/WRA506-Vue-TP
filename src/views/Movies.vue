<script setup>
import {onMounted, ref} from 'vue'
import axios from 'axios'
import {baseURL} from '../config.js'
import {RouterLink} from "vue-router";

let isLoading = ref(true);
let movies = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(`${baseURL}movies?page=1`);
    movies.value = response.data;
    isLoading.value = false;
   } catch (error) {
    console.error(error);
  }
});

</script>

<template>

  <div class="listing">
    <div v-if="isLoading" class="loading"><img src="../assets/loader.gif"></div>
    <div class="cases">
      <router-link class="listing-link case" v-for="movie in movies['hydra:member']" :key="movie.id" :to="{ name: 'InfoFilm', params: { idFilm: movie.id } }">
        {{ movie.title }}
      </router-link>
    </div>
  </div>

</template>

<style scoped>

</style>
