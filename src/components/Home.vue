<!-- src/components/Home.vue -->
<template>
  <v-card>
    <v-card-title>
      <h1 class="display-1">Willkommen zu unserer Spiele-App!</h1>
    </v-card-title>
    <v-row>
      <v-col v-for="game in games" :key="game.id">
        <v-card @click="$router.push(game.route)">
          <v-img
          src="https://picsum.photos/1920/1080?random"
          ><h1>{{ game.name }}</h1></v-img>
          
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      games: [
        { id: 1, name: "Spiel 1", route: "/game1" },
        { id: 2, name: "Spiel 2", route: "/game2" },
        { id: 3, name: "Spiel 3", route: "/game3" },
        { id: 4, name: "Spiel 4", route: "/game4"}
      ],
    };
  },
  methods: {
    selectGame(game) {
      this.$emit("game-selected", game);
      alert(`Du hast ${game.name} ausgewählt!`);
    },
  },
};
</script>

<style scoped>
.ma-2 {
  margin: 8px;
}
</style>
