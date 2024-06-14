<template>
  <v-container>
   
    <v-row>
      <v-col cols="12" md="6">
        <v-card @click="navigateTo('Solitaire')" class="game-card">
          <img :width="1000" src="../assets/images/solitaire.png" class="game-icon">
          <v-card-title>Solitaire</v-card-title></img>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card @click="navigateTo('Memory')" class="game-card">
          <img src="../assets/images/memory.png" :width="230">
          <v-card-title>Memory</v-card-title></img>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card @click="navigateTo('GuessTheSound')" class="game-card">
          <img src="../assets/images/guessTheSound.png" :width="240"></img>
          <v-card-title>Guess The Sound</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card @click="navigateTo('GuessTheFlag')" class="game-card">
          <img src="../assets/images/guessTheFlag.png" :width="350"></img>
          <v-card-title>Guess The Flag</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: 'HomeScreen',
  methods: {
    navigateTo(game) {
      this.$router.push({ name: game });
    }
  }
};
</script>


<style scoped>
.game-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  cursor: pointer;
  transition: transform 0.2s;
}

.game-card:hover {
  transform: scale(1.05);
}

.game-icon {
  max-width: 400px;
  margin-bottom: 16px;
}
</style>
