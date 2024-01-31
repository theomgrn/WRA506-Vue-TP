<script setup>
import {onMounted, ref} from 'vue'
import axios from 'axios'
import {baseURL} from '../config.js'
import {RouterLink} from "vue-router";

let isLoading = ref(true);
let categories = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(`${baseURL}categories?page=1`);
    categories.value = response.data;
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
      <router-link class="listing-link case" v-for="categorie in categories['hydra:member']" :key="categorie.id" :to="{ name: 'MoovieByCategorie', params: { idCategorie: categorie.id } }">
        {{ categorie.name }}
      </router-link>
    </div>
  </div>

</template>

<style scoped>

</style>
