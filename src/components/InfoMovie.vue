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
    const response = await axios.get(`${baseURL}movies/${route.params.idFilm}`);
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
  >
    <v-card-item>
      <v-card-title>
        {{ movie.title }} ({{ convertMinutesToHours(movie.duration) }})
      </v-card-title>
      <v-card-subtitle class="custom-card-subtitle">
        <u>Sortie</u> : {{ formatDate(movie.releaseDate) }}
        <br>
        <u>Catégorie</u> : {{ movie.category.name }}
        <br>
        <p v-if="movie.actor && movie.actor.length > 0">
          <u>Acteurs</u> :
          <span v-for="(actor, index) in movie.actor" :key="actor['@id']">
          {{ actor.firstName }} {{ actor.lastName }}
          <span v-if="index < movie.actor.length - 1"> / </span>
        </span>
        </p>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      {{ movie.description }}
    </v-card-text>
  </v-card>
  </div>
  <div class="loading" v-else>
    <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="#FFDEADFF"
    ></v-progress-circular>
  </div>
</template>

<style scoped>
.card{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
