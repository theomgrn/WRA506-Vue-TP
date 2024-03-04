<script setup>
import {onMounted, ref} from 'vue'
import axios from 'axios'
import {baseURL, baseURLimg} from '../config.js'
import {RouterLink} from "vue-router";

let isLoading = ref(true);
let movies = ref([]);
let movie;


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
    <div class="loading" v-if="isLoading">
      <v-progress-circular
          v-if="isLoading"
          indeterminate
          color="#FFDEADFF"
      ></v-progress-circular>
    </div>
    <div class="cases">
      <router-link class="listing-link case" v-for="movie in movies['hydra:member']" :key="movie.id"
                   :to="{ name: 'InfoFilm', params: { idFilm: movie.id } }">
        <div class="card-cover">
          <img :src="baseURLimg + mediaObject.filePath" alt="cover" class="cover" v-for="mediaObject in movie.mediaObjects" :key="mediaObject.id">
          <p>{{ movie.title }}</p>
        </div>
      </router-link>
    </div>
  </div>

</template>

<style scoped>

</style>
