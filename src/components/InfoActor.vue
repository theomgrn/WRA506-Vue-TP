<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { baseURL } from '../config.js'
import { useRoute } from 'vue-router';

let isLoading = ref(true);
let actor = ref(null);

const route = useRoute();

onMounted(async () => {
  try {
    const response = await axios.get(`${baseURL}actors/${route.params.idActor}`);  // Corrected from route.params.id
    actor.value = response.data;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
  <div class="card" v-if="actor">
    <v-card
        class="mx-auto"
        max-width="344"
        hover
    >
      <v-card-item>
        <v-card-title>
          {{ actor.firstName }} {{ actor.lastName }}
        </v-card-title>
        <v-card-subtitle>
          {{ actor.nationality.name }}
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>
       test
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
