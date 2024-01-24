<script setup>
import {onMounted, ref} from 'vue'
import axios from 'axios'
import {baseURL} from '../config.js'
import {RouterLink} from "vue-router";

let isLoading = ref(true);
let actors = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(`${baseURL}actors?page=1`);
    actors.value = response.data;
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
      <router-link class="listing-link case" v-for="actor in actors['hydra:member']" :key="actor.id" :to="{ name: 'InfoActor', params: { idActor: actor.id } }">
        {{ actor.firstName }} {{ actor.lastName }}
      </router-link>
    </div>
  </div>

</template>

<style scoped>

</style>
