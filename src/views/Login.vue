<script>
import axios from 'axios';
import router from "../router/index.js";
import {useToast} from 'vue-toast-notification';

export default {
  data: vm => ({
    loading: false,
    rules: [
      v => !!v || 'Ce champ est requis.',
    ],
    timeout: null,
    userName: '',
    password: '',
  }),

  methods: {
    async submit() {
      this.loading = true;
      try {
        const response = await this.login(this.userName, this.password);
        const token = response.data.token;
        localStorage.setItem('userToken', token);
        localStorage.setItem('userMail', this.userName);
        await router.push({path: '/'});
        let toast = useToast();
        toast.success('Vous êtes connécté !');
      } catch (error) {
        console.error('Error:', error);
      } finally {
        this.loading = false;
      }
    },

    async login(userName, password) {
      const data = JSON.stringify({
        "email": userName,
        "password": password
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8888/WRA506-Symfony/public/index.php/api/login_check',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      return axios.request(config);
    },
  },
}
</script>

<template>
  <div class="loginForm">
  <v-sheet max-width="300" class="mx-auto" color="#242424">
    <v-form validate-on="submit lazy" @submit.prevent="submit">
      <v-text-field
          class="loginField mb-2"
          v-model="userName"
          :rules="rules"
          label="Nom d'utilisateur"
      ></v-text-field>
      <v-text-field
          class="loginField mb-2"
          v-model="password"
          :rules="rules"
          label="Mot de passe"
      ></v-text-field>
      <v-btn
          :loading="loading"
          type="submit"
          block
          class="mt-2"
          text="Connexion"
      ></v-btn>
    </v-form>
  </v-sheet>
  </div>
</template>

<style scoped>
.loginForm {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
.loginField {
  width: 300px;
}
</style>
