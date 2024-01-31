<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { baseURL } from '../config.js'
import { useRoute } from 'vue-router';
import categories from "../views/Categories.vue";

let isLoading = ref(true);
let movie = ref(null);

const route = useRoute();

onMounted(async () => {
  try {
    const response = await axios.get(`${baseURL}categories/${route.params.idCategorie}`);  // Corrected from route.params.id
    movie.value = response.data;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
  <p class="divider">{{ movie ? movie.name : '' }}</p>
  <div class="loading" v-if="isLoading">
    <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="#FFDEADFF"
    ></v-progress-circular>
  </div>
  <div class="cases" v-if="movie && movie.movies && movie.movies.length > 0">
    <router-link class="listing-link case" v-for="movie in movie.movies" :key="movie.id"
                 :to="{ name: 'InfoFilm', params: { idFilm: movie.id }}" >
      {{ movie.title }}
    </router-link>
  </div>
</template>

<style scoped>

.card{
  display: flex;
  justify-content: center;
  align-items: center;
}

.divider{
  text-transform: uppercase;
}

</style>
