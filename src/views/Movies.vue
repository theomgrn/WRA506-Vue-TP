<script setup>
import {computed, onMounted, ref} from 'vue'
import axios from 'axios'
import {baseURL, baseURLimg} from '../config.js'
import {RouterLink} from "vue-router";


let isLoading = ref(true);
let movies = ref([]);
let searchQuery = ref('');
let page = ref(1);
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

async function deleteMovie(movieId) {
  try {
    await axios.delete(`${baseURL}movies/${movieId}`);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}

const filteredMovies = computed(() => {
  return movies.value.filter(movie => movie.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

console.log(filteredMovies);
function searchMovies() {
  isLoading.value = true;
}

</script>

<template>
  <div class="listing">
      <div class="mt-2 ml-10 d-flex flex-0-0">
        <v-col cols="8">
          <v-text-field v-model="searchQuery" label="Rechercher un film..." outlined></v-text-field>
        </v-col>
        <v-col cols="2 mt-5">
          <v-btn @click="searchMovies" color="white" outlined>Rechercher</v-btn>
        </v-col>
      </div>
    <div class="loading" v-if="isLoading">
      <v-progress-circular
          v-if="isLoading"
          indeterminate
          color="#FFDEADFF"
      ></v-progress-circular>
    </div>
    <div class="cases">
      <div class="listing-link case" v-for="movie in movies['hydra:member']" :key="movie.id">
        <div class="card-cover">
          <img :src="baseURLimg + mediaObject.filePath" alt="cover" class="cover" v-for="mediaObject in movie.mediaObjects" :key="mediaObject.id">
          <p>{{ movie.title }}</p>
            <router-link class="listing-link box" :to="{ name: 'InfoFilm', params: { idFilm: movie.id } }">
              <v-btn>
                Plus d'infos
              </v-btn>
            </router-link>
          <div class="edit">
            <v-dialog  max-width="600">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn text="Edit Profile" v-bind="activatorProps">
                  <img src="/pen.svg" alt="Pen Icon" style="width: 24px; height: 24px;">
                  <v-tooltip
                      activator="parent"
                      location="bottom"
                  >Modifier</v-tooltip>
                </v-btn>
              </template>

              <v-card title="Modification du film">
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field label="Titre*" required v-model="movie.title"></v-text-field>
                    </v-col>

<!--                    <v-col cols="12" md="4" sm="6">-->
<!--                      <v-date-picker-->
<!--                          label="Date de sortie*"-->
<!--                          required-->
<!--                          scrollable-->
<!--                      ></v-date-picker>-->
<!--                    </v-col>-->

<!--                    <v-col cols="12" md="4" sm="6">-->
<!--                      <v-text-field label="Date de sortie*" required></v-text-field>-->
<!--                    </v-col>-->

                    <v-col cols="12" md="12" sm="12">
                      <v-textarea label="Description*" required v-model="movie.description"></v-textarea>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-select
                          :items="['Romance', 'Action', 'Aventure', 'horreur']"
                          label="Catégorie*"
                          required
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-autocomplete
                          :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                          label="Acteurs*"
                          auto-select-first
                          multiple
                      ></v-autocomplete>
                    </v-col>
                  </v-row>

                  <small class="text-caption text-medium-emphasis"
                  >*Champs obligatoire</small
                  >
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="primary"
                      text="Modifier"
                      variant="tonal"
                      @click="dialog = false"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog max-width="500">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                    v-bind="activatorProps"
                    text="Open Dialog">
                  <img src="/delete.svg" alt="Pen Icon" style="width: 24px; height: 24px;">
                  <v-tooltip
                      activator="parent"
                      location="bottom"
                  >Supprimer</v-tooltip>
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="">
                  <v-card-text>
                    Voulez vous vraiment supprimer ce film ?
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        text="Annuler"
                        @click="isActive.value = false"
                    ></v-btn>
                    <v-btn
                        text="Confirmer"
                        @click="deleteMovie(movie.id)"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class="text-center">
      <v-pagination
          v-model="page"
          :length="4"
          rounded="circle"
          prev-icon="mdi-chevron-left"
          next-icon="mdi-chevron-right"
      ></v-pagination>
    </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    page: 1,
  }),
}
</script>

<style scoped>
.edit{
  display: flex;
  justify-content: space-between;
  gap: 15px;
}
</style>
