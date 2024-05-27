<!-- src/components/Home.vue -->
<template>
  <v-card><v-btn color="100 255 100" plain @click="$router.push('/about')"
          >SpieleHub</v-btn
        >
    <v-card-title>
      <h1 class="display-1">Willkommen zu unserer Spiele-App!</h1>
    </v-card-title>
    <v-card-text>
      <p class="headline">Wählen Sie ein Spiel aus:</p>
      <v-list>
        <v-list-item
          v-for="game in games"
          :key="game.id"
          @click="selectGame(game)"
          button
          class="ma-2"
        >
          <v-list-item-content>
            <v-list-item-title>{{ game.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      games: [
        { id: 1, name: "Spiel 1" },
        { id: 2, name: "Spiel 2" },
        { id: 3, name: "Spiel 3" },
        { id: 4, name: "Spiel 4" },
        { id: 5, name: "Spiel 5" },
        { id: 6, name: "Spiel 6" },
        { id: 7, name: "Spiel 7" },
        { id: 8, name: "Spiel 8" },
        { id: 9, name: "Spiel 9" },
        { id: 10, name: "Spiel 10" },
        { id: 6, name: "Spiel 6" },
        { id: 7, name: "Spiel 7" },
        { id: 8, name: "Spiel 8" },
        { id: 9, name: "Spiel 9" },
        { id: 10, name: "Spiel 10" },
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
