<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row no-gutters>
          <v-col cols="2" class="player-info player-one">
            <h2>Player One</h2>
            <p>Points: {{ points.playerOne }}</p>
          </v-col>
          <v-col cols="8">
            <v-row align="center" justify="center" class="memory-board">
              <v-col v-for="(card, index) in cards" :key="index" cols="6" sm="2">
                <v-card
                  :color="playerOne ? 'red' : 'blue'"
                  class="memory-card"
                  @click="flipCard(index)"
                >
                  <v-fade-transition>
                    <div v-if="card.flipped || card.matched" class="memory-image-container">
                      <img :src="card.content" alt="Card Image" class="memory-image" />
                    </div>
                  </v-fade-transition>
                </v-card>
              </v-col>
            </v-row>
            <v-dialog v-model="gameOver" max-width="500">
              <v-card>
                <v-card-title class="headline">Game Over</v-card-title>
                <v-card-text>
                  <p>{{ winnerMessage }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="restartGame">Restart</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="2" class="player-info player-two">
            <h2>Player Two</h2>
            <p>Points: {{ points.playerTwo }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import bird from '../assets/images/bird.jpg';
import bug from '../assets/images/bug.jpg';
import cat from '../assets/images/cat.jpg';
import cow from '../assets/images/cow.jpg';
import deer from '../assets/images/deer.jpg';
import dog from '../assets/images/dog.jpg'; 
import eagle from '../assets/images/eagle.jpg';
import flamingo from '../assets/images/flamingo.jpg';
import fox from '../assets/images/fox.jpg';
import giraffe from '../assets/images/giraffe.jpg';
import meerkat from '../assets/images/meerkat.jpg';
import monkey from '../assets/images/monkey.jpg';
import owl from '../assets/images/owl.jpg';
import peacock from '../assets/images/peacock.jpg';
import seagull from '../assets/images/seagull.jpg';

export default {
  name: "Memory",
  data() {
    return {
      cards: this.initializeCards(),
      flippedIndices: [],
      isChecking: false,
      playerOne: true,
      points: {
        playerOne: 0,
        playerTwo: 0
      },
      gameOver: false,
      winnerMessage: ""
    };
  },
  methods: {
    initializeCards() {
      let contents = [
        bird, bird,
        bug, bug,
        cat, cat,
        cow, cow,
        deer, deer,
        dog, dog,
        eagle, eagle,
        flamingo, flamingo,
        fox, fox,
        giraffe, giraffe,
        meerkat, meerkat,
        monkey, monkey,
        owl, owl,
        peacock, peacock,
        seagull, seagull
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
        this.$nextTick(() => {
          setTimeout(this.checkForMatch, 800);
        });
      }
    },
    checkForMatch() {
      const [index1, index2] = this.flippedIndices;
      if (this.cards[index1].content === this.cards[index2].content) {
        this.cards[index1].matched = true;
        this.cards[index2].matched = true;
        this.updatePoints();
        if (this.checkGameOver()) {
          this.endGame();
        }
      } else {
        this.cards[index1].flipped = false;
        this.cards[index2].flipped = false;
        this.playerOne = !this.playerOne;
      }
      this.flippedIndices = [];
      this.isChecking = false;
    },
    updatePoints() {
      if (this.playerOne) {
        this.points.playerOne++;
      } else {
        this.points.playerTwo++;
      }
    },
    checkGameOver() {
      return this.cards.every(card => card.matched);
    },
    endGame() {
      this.gameOver = true;
      if (this.points.playerOne > this.points.playerTwo) {
        this.winnerMessage = "Player One wins!";
      } else if (this.points.playerOne < this.points.playerTwo) {
        this.winnerMessage = "Player Two wins!";
      } else {
        this.winnerMessage = "It's a tie!";
      }
    },
    restartGame() {
      this.cards = this.initializeCards();
      this.flippedIndices = [];
      this.isChecking = false;
      this.playerOne = true;
      this.points = { playerOne: 0, playerTwo: 0 };
      this.gameOver = false;
      this.winnerMessage = "";
    }
  }
};
</script>

<style>
.player-info {
  text-align: center;
  margin-top: 50px;
}

.player-one {
  color: red;
}

.player-two {
  color: blue;
}

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
