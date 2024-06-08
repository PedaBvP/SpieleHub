<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="end" justify="center" class="memory-board">
          <v-col v-for="(card, index) in cards" :key="index" cols="6" sm="2">
            <v-card
              color="#3399ff"
              class="memory-card"
              @click="flipCard(index)"
            >
              <v-fade-transition>
                <div
                  v-if="card.flipped || card.matched"
                  class="memory-image-container"
                >
                  <img
                    :src="card.content"
                    alt="Card Image"
                    class="memory-image"
                  />
                </div>
              </v-fade-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Memory",
  data() {
    return {
      cards: this.initializeCards(),
      flippedIndices: [],
      isChecking: false,
    };
  },
  methods: {
    initializeCards() {
      let contents = [
        "https://picsum.photos/id/239/200/200",
        "https://picsum.photos/id/239/200/200",
        "https://picsum.photos/id/238/200/200",
        "https://picsum.photos/id/238/200/200",
        "https://picsum.photos/id/237/200/200",
        "https://picsum.photos/id/237/200/200",
        "https://picsum.photos/id/236/200/200",
        "https://picsum.photos/id/236/200/200",
        "https://picsum.photos/id/235/200/200",
        "https://picsum.photos/id/235/200/200",
        "https://picsum.photos/id/234/200/200",
        "https://picsum.photos/id/234/200/200",
        "https://picsum.photos/id/233/200/200",
        "https://picsum.photos/id/233/200/200",
        "https://picsum.photos/id/232/200/200",
        "https://picsum.photos/id/232/200/200",
        "https://picsum.photos/id/231/200/200",
        "https://picsum.photos/id/231/200/200",
        "https://picsum.photos/id/230/200/200",
        "https://picsum.photos/id/230/200/200",
        "https://picsum.photos/id/229/200/200",
        "https://picsum.photos/id/229/200/200",
        "https://picsum.photos/id/228/200/200",
        "https://picsum.photos/id/228/200/200",
        "https://picsum.photos/id/227/200/200",
        "https://picsum.photos/id/227/200/200",
        "https://picsum.photos/id/225/200/200",
        "https://picsum.photos/id/225/200/200",
        "https://picsum.photos/id/223/200/200",
        "https://picsum.photos/id/223/200/200",
      ];
      contents = this.shuffle(contents);
      return contents.map((content) => ({
        content,
        flipped: false,
        matched: false,
      }));
    },
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    flipCard(index) {
      if (
        this.isChecking ||
        this.cards[index].flipped ||
        this.cards[index].matched
      )
        return;

      this.cards[index].flipped = true;
      this.flippedIndices.push(index);

      if (this.flippedIndices.length === 2) {
        this.isChecking = true;
        setTimeout(this.checkForMatch, 800);
      }
    },
    checkForMatch() {
      const [index1, index2] = this.flippedIndices;
      if (this.cards[index1].content === this.cards[index2].content) {
        this.cards[index1].matched = true;
        this.cards[index2].matched = true;
      } else {
        this.cards[index1].flipped = false;
        this.cards[index2].flipped = false;
      }
      this.flippedIndices = [];
      this.isChecking = false;
    },
  },
};
</script>

<style>
.memory-board {
  max-width: 800px;
  margin: 0 auto;
}

.memory-card {
  height: 120px;
  width: 120px;
  margin: 5px;
  border-radius: 10px;
}

.memory-image-container {
  height: 100%;
  width: 100%;
}

.memory-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>