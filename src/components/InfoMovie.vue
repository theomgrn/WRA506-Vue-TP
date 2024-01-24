<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { baseURL } from '../config.js'
import { useRoute } from 'vue-router';

let isLoading = ref(true);
let movie = ref(null);

const route = useRoute();

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const convertMinutesToHours = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}H${remainingMinutes}`;
};

onMounted(async () => {
  try {
    const response = await axios.get(`${baseURL}movies/${route.params.idFilm}`);  // Corrected from route.params.id
    movie.value = response.data;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
  <div class="card" v-if="movie">
  <v-card
      class="mx-auto"
      max-width="344"
      hover
  >
    <v-card-item>
      <v-card-title>
        {{ movie.title }} ({{ convertMinutesToHours(movie.duration) }})
      </v-card-title>
      <v-card-subtitle>
        Sortie : {{ formatDate(movie.releaseDate) }}
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      {{ movie.description }}
    </v-card-text>
  </v-card>
  </div>
  <div class="loading" v-else>
    <img src="../assets/loader.gif">
  </div>
</template>

<style scoped>
.card{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
