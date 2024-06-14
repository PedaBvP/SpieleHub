<template>
  <v-container v-if="!won()" >
    <h1>Solitaire</h1>
    
      <!-- Overflow stapel -->
    <v-row>
      <v-col v-for="(stack, stackIndex) in stacks[2]" 
      :key="stackIndex" 
      cols="2" 
      class="card-stack">
        <v-card v-for="(card, cardIndex) in stack" 
        :key="cardIndex" 
        class="card text-center" 
        :class="{ selected: isSelected(2, stackIndex, cardIndex) }" 
        @click="selectOverflowCard(stackIndex, cardIndex)">
        <img v-if="stackIndex === 0 && cardIndex !== 0"
            :width="100"
            src="../assets/images/rueckseite.jpg"
          />
          <v-card-title class="text-center" v-else>
            <v-icon :color="card.color" :icon="card.suit"></v-icon> {{ card.value }}
          </v-card-title>
        </v-card>
      </v-col>
      <!-- Ablagestapel -->
      <v-spacer> <v-row style="padding-top: 70px; padding-left: 40px;"><v-btn v-if="completeAble()" @click="autoComplete()" class="text-center" > Complete Game</v-btn></v-row></v-spacer>
      <v-col v-for="(stack, stackIndex) in stacks[0]" 
      :key="stackIndex" 
      cols="1.1" 
      class="card-stack">
        <v-card v-for="(card, cardIndex) in stack" 
        :key="cardIndex" 
        class="card text-center"
        :class="{ selected: isSelected(0, stackIndex, cardIndex) }" 
        @click="selectCard(0, stackIndex, cardIndex)">
          <v-card-title>
            <v-text v-if="!card.default">{{ card.value }}</v-text>
            <v-icon :color="card.color" :icon="card.suit"></v-icon> 
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <!-- Spielfeld -->
    <v-row>
      <!-- Plätze für Kartenstapel -->
      <v-col v-for="(stack, stackIndex) in stacks[1]" 
      :key="stackIndex" 
      cols="1.5" 
      class="card-stack">
        <v-card v-for="(card, cardIndex) in stack" 
        :key="cardIndex" 
        class="card" 
        :style="cardStyle(cardIndex)"
        :class="{ selected: isSelected(1, stackIndex, cardIndex) }" 
        @click="selectCard(1, stackIndex, cardIndex)">
        <img v-if="!card.seeable"
            :width="100"
            src="../assets/images/rueckseite.jpg"
          />
          <v-card-title v-else-if="!card.default">
            {{ card.value }} <v-icon :color="card.color" :icon="card.suit"></v-icon> 
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Gratulationsfenster -->
  <v-dialog v-model="winDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Herzlichen Glückwunsch!</v-card-title>
        <v-card-text>Sie haben das Spiel gewonnen!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="restart()">Erneut spielen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      //stacks[0] = Ablagestapel, stacks[1] = Spielfeld, stacks[2] = Overflowstapel
      stacks: [
      [
        [{ value: 0, color: 'red', suit: 'mdi-heart', seeable: true , default: true}],
        [{ value: 0, color: 'red', suit: 'mdi-cards-diamond', seeable: true, default: true}],
        [{ value: 0, color: 'black', suit: 'mdi-cards-spade', seeable: true, default: true}],
        [{ value: 0, color: 'black', suit: 'mdi-cards-club', seeable: true, default: true}],
      ],[
        [{ value: 14, default: true }],
        [{ value: 14, default: true }],
        [{ value: 14, default: true }],
        [{ value: 14, default: true }],
        [{ value: 14, default: true }],
        [{ value: 14, default: true }],
        [{ value: 14, default: true }],
      ],
      [
      [{ default: true}],
      [{ default: true}],
      ],
    ],
    // Spielkarten
      cards:[
      { value: 'A', color: 'red', suit: 'mdi-heart', seeable: false,  default: false},
      { value: 'K', color: 'red', suit: 'mdi-heart', seeable: false,  default: false},
      { value: 'Q', color: 'red', suit: 'mdi-heart', seeable: false,  default: false},
      { value: 'J', color: 'red', suit: 'mdi-heart', seeable: false,  default: false},
      { value: 10, color: 'red', suit: 'mdi-heart', seeable: false,  default: false},
      { value: 9, color: 'red', suit: 'mdi-heart', seeable: false,  default: false},
      { value: 8, color: 'red', suit: 'mdi-heart', seeable: false,  default: false},
      { value: 7, color: 'red', suit: 'mdi-heart', seeable: false,  default: false},
      { value: 6, color: 'red', suit: 'mdi-heart', seeable: false,  default: false},
      { value: 5, color: 'red', suit: 'mdi-heart', seeable: false,  default: false},
      { value: 4, color: 'red', suit: 'mdi-heart', seeable: false,  default: false},
      { value: 3, color: 'red', suit: 'mdi-heart', seeable: false,  default: false},
      { value: 2, color: 'red', suit: 'mdi-heart', seeable: false,  default: false},
      { value: 'A', color: 'red', suit: 'mdi-cards-diamond', seeable: false,  default: false},
      { value: 'K', color: 'red', suit: 'mdi-cards-diamond', seeable: false,  default: false},
      { value: 'Q', color: 'red', suit: 'mdi-cards-diamond', seeable: false,  default: false},
      { value: 'J', color: 'red', suit: 'mdi-cards-diamond', seeable: false,  default: false},
      { value: 10, color: 'red', suit: 'mdi-cards-diamond', seeable: false,  default: false},
      { value: 9, color: 'red', suit: 'mdi-cards-diamond', seeable: false,  default: false},
      { value: 8, color: 'red', suit: 'mdi-cards-diamond', seeable: false,  default: false},
      { value: 7, color: 'red', suit: 'mdi-cards-diamond', seeable: false,  default: false},
      { value: 6, color: 'red', suit: 'mdi-cards-diamond', seeable: false,  default: false},
      { value: 5, color: 'red', suit: 'mdi-cards-diamond', seeable: false,  default: false},
      { value: 4, color: 'red', suit: 'mdi-cards-diamond', seeable: false,  default: false},
      { value: 3, color: 'red', suit: 'mdi-cards-diamond', seeable: false,  default: false},
      { value: 2, color: 'red', suit: 'mdi-cards-diamond', seeable: false,  default: false},
      { value: 'A', color: 'black', suit: 'mdi-cards-spade', seeable: false,  default: false},
      { value: 'K', color: 'black', suit: 'mdi-cards-spade', seeable: false,  default: false},
      { value: 'Q', color: 'black', suit: 'mdi-cards-spade', seeable: false,  default: false},
      { value: 'J', color: 'black', suit: 'mdi-cards-spade', seeable: false,  default: false},
      { value: 10, color: 'black', suit: 'mdi-cards-spade', seeable: false,  default: false},
      { value: 9, color: 'black', suit: 'mdi-cards-spade', seeable: false,  default: false},
      { value: 8, color: 'black', suit: 'mdi-cards-spade', seeable: false,  default: false},
      { value: 7, color: 'black', suit: 'mdi-cards-spade', seeable: false,  default: false},
      { value: 6, color: 'black', suit: 'mdi-cards-spade', seeable: false,  default: false},
      { value: 5, color: 'black', suit: 'mdi-cards-spade', seeable: false,  default: false},
      { value: 4, color: 'black', suit: 'mdi-cards-spade', seeable: false,  default: false},
      { value: 3, color: 'black', suit: 'mdi-cards-spade', seeable: false,  default: false},
      { value: 2, color: 'black', suit: 'mdi-cards-spade', seeable: false,  default: false},
      { value: 'A', color: 'black', suit: 'mdi-cards-club', seeable: false,  default: false},
      { value: 'K', color: 'black', suit: 'mdi-cards-club', seeable: false,  default: false},
      { value: 'Q', color: 'black', suit: 'mdi-cards-club', seeable: false,  default: false},
      { value: 'J', color: 'black', suit: 'mdi-cards-club', seeable: false,  default: false},
      { value: 10, color: 'black', suit: 'mdi-cards-club', seeable: false,  default: false},
      { value: 9, color: 'black', suit: 'mdi-cards-club', seeable: false,  default: false},
      { value: 8, color: 'black', suit: 'mdi-cards-club', seeable: false,  default: false},
      { value: 7, color: 'black', suit: 'mdi-cards-club', seeable: false,  default: false},
      { value: 6, color: 'black', suit: 'mdi-cards-club', seeable: false,  default: false},
      { value: 5, color: 'black', suit: 'mdi-cards-club', seeable: false,  default: false},
      { value: 4, color: 'black', suit: 'mdi-cards-club', seeable: false,  default: false},
      { value: 3, color: 'black', suit: 'mdi-cards-club', seeable: false,  default: false},
      { value: 2, color: 'black', suit: 'mdi-cards-club', seeable: false,  default: false},
      ],

      selectedCard: null,
      selectedCardStack: null,
      selectedStack: null,
      selectedCardIndex: null,
      winDialog: false,
    };
  },
  // Wird aufgerufen, wenn die Seite das erste mal geladen wird
  created() {
        this.generateSolitaire();
    },
  methods: {
    // Weißt die Karten zufällig den Stapeln zu 
    generateSolitaire(){
      const shuffled = this.cards.sort(() => 0.5 - Math.random());
      
      // Karten auf die Spielfeld aufteilen
      for (let i = 0; i < 7; i++) {
        this.stacks[1][i].push(...shuffled.splice(0, i + 1));
        this.stacks[1][i][i+1].seeable = true;
      }

      // Rest auf overflowstapel ablegen
      this.stacks[2][0].push(...shuffled.splice(0,24));      
    },
    // Überprüfung, ob man gewonnen hat
    won(){ 
      if(this.stacks[0][0].length === 14 && this.stacks[0][1].length === 14 && this.stacks[0][2].length === 14 && this.stacks[0][3].length === 14){
        this.winDialog = true;
        return true;
      }
      return false;
    },
    // Möchte man ein neues Spiel starten
    restart(){
      //Karten werden vom Ablagestapel in das cards Array wieder gespeichert
      this.cards.push(...this.stacks[0][0].splice(1,14));
      this.cards.push(...this.stacks[0][1].splice(1,14));
      this.cards.push(...this.stacks[0][2].splice(1,14));
      this.cards.push(...this.stacks[0][3].splice(1,14));

      
      for(let i = 0; i < this.cards.length; i++){
        this.cards[i].seeable = false;
      }

      // Spielkarten werden wieder erneut ausgeteilt
      this.generateSolitaire();
      this.winDialog = false;
    },
    // Überprüft, ob das Spiel bereits gewonnen ist, und nurmehr die Karten auf den Ablagestapel platziert werden müssen
    completeAble(){
      let complete = true;
      for(let i = 0; i < this.stacks[1].length; i++){
        for(let j = 1; j < this.stacks[1][i].length; j++){
          complete = complete && this.stacks[1][i][j].seeable;
        }
      }
      if(!this.won() && this.stacks[2][0].length === 1 && this.stacks[2][1].length === 1 && complete){
        return true;
      }
      return false;
    },
    // Legt alle Karten, welche auf dem Spielfeld sind automatisch auf den Ablagestapel
    // async, damit es nicht instant passiert und etwas visuelles für das Auge dabei ist
    async autoComplete(){
      while(!this.won()){
        for(let i = 0; i < this.stacks[1].length; i++){
        let j = this.stacks[1][i].length - 1
        this.selectedCard = this.stacks[1][i][j];
        this.selectedCardIndex = j;
        this.selectedCardStack = i;
        this.selectedStack = 1;
        for(let k = 0; k < this.stacks[0].length; k++){
          if(this.checkMove(0,k)){
            this.moveCard(0,k);
            await this.delay(200);
          }
        }
      }

      }
      this.selectedCard = null;
      this.selectedCardStack = null;
      this.selectedStack = null;
      this.selectedCardIndex = null;
    },
    // delay methode
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  // Deckt eine Karte vom Overflowstapel auf oder wählt die Karte aus, um diese zu verschieben
    selectOverflowCard(cardStackIndex, cardIndex){
      if(cardStackIndex === 0){
        if(cardIndex !== 0){
          //wähle die oberste Karte aus und lege sie auf den anderen Stapel in Overflowstapel
            this.selectedCard = this.stacks[2][0][cardIndex];
            this.selectedStack = 2;
            this.selectedCardStack = cardStackIndex;
            this.selectedCardIndex = cardIndex;
            this.selectedCard.seeable = true;

            this.moveCard(2,1);
            
            this.selectedStack = null;
            this.selectedCardStack = null;
            this.selectedCardIndex = null; 
            this.selectedCard = null;
          }else{
            let length = this.stacks[2][1].length-1;
            for(let i = length; 0 < i; i--){
              this.stacks[2][0].push(this.stacks[2][1][i]);
              this.stacks[2][1][i].seeable = false;
            }
            this.stacks[2][1] = this.stacks[2][1].slice(0,1);
          }
      }else{
        this.selectCard(2, cardStackIndex, cardIndex)
      }

    },
    //wählt eine Karte aus, um diese anschließend zu verschieben
    selectCard(stackIndex, cardStackIndex, cardIndex) {
      if (this.selectedCard === null) {
        // Speichere die erste ausgewählte Karte und den Stapel
        let lastEntry = this.stacks[stackIndex][cardStackIndex].length - 1;
        if(this.stacks[stackIndex][cardStackIndex][cardIndex].seeable && !this.stacks[stackIndex][cardStackIndex][lastEntry].default){
          this.selectedCard = this.stacks[stackIndex][cardStackIndex][cardIndex];
          this.selectedStack = stackIndex;
          this.selectedCardStack = cardStackIndex;
          this.selectedCardIndex = cardIndex;
        }

      } else {
        // Prüfe, ob es erlaubt ist, dass die Karte übertragen wird
        if(this.checkMove(stackIndex,cardStackIndex)){
          // Verschiebe die Karte auf den neuen Stapel
          this.moveCard(stackIndex, cardStackIndex);
          // Zurücksetzen der Auswahl
        }
        this.selectedCardIndex = null;
        this.selectedCard = null;
        this.selectedStack = null;
        this.selectedCardStack = null;
      }
    },
    // Es wird überprüft, ob es erlaubt ist die Karte zu übertragen.
    // Ist es der Overflowstapel, ist es nicht erlaubt
    // Ist es ein stapel vom Spielfeld, muss die Zielkarte nicht der gleichen Farbe entsprechen und eins höher sein
    // Ist es ein stapel vom Ablagestapel, muss die Zielkarte der gleichen Art (Herz, Karo, Pik, Kreuz) entsprechen
    checkMove(toStackIndex, toCardStackIndex){
      if(toStackIndex !== 2){
        
        let length = this.stacks[toStackIndex][toCardStackIndex].length;

        let stackValue = this.valueToNumber(this.stacks[toStackIndex][toCardStackIndex][length-1].value);
        let cardValue = this.valueToNumber(this.selectedCard.value);

        let stackColor = this.stacks[toStackIndex][toCardStackIndex][length-1].color;
        let cardColor = this.selectedCard.color;

        let stackSuit = this.stacks[toStackIndex][toCardStackIndex][0].suit;
        let cardSuit = this.selectedCard.suit;

        if(toStackIndex === 1 && stackColor !== cardColor && stackValue === (cardValue + 1)){
          return true;
        }

        if(toStackIndex === 0 && stackSuit === cardSuit && stackValue === (cardValue - 1)){
          return true;
        }

      }

      return false;
    },
    // die Charakter der values werden in Zahlen umgerechnet
    valueToNumber(cardValue){
      let value = null;

      switch (cardValue) {
        case 'A':
        value = 1;
        break;
      case 'K':
        value = 13;
        break;
      case 'Q':
        value = 12;
        break;
      case 'J':
        value = 11;
        break;
      default:
        value = cardValue;
        break;
      } 

      return value;
    },
    // Eine Karte wird vom ersten Stapel auf den zweiten Stapel übertragen
    moveCard(toStackIndex, toCardStackIndex) {
      // Entferne die Karte aus dem ursprünglichen Stapel
      let length = this.stacks[this.selectedStack][this.selectedCardStack].length;
      let tempStack = this.stacks[this.selectedStack][this.selectedCardStack].slice(this.selectedCardIndex, length)

      this.stacks[this.selectedStack][this.selectedCardStack] = this.stacks[this.selectedStack][this.selectedCardStack].slice(0,this.selectedCardIndex)
      
      this.stacks[this.selectedStack][this.selectedCardStack][this.selectedCardIndex-1].seeable = true;
      // Füge die Karte zum neuen Stapel hinzu
      this.stacks[toStackIndex][toCardStackIndex].push(...tempStack);
    },
    // Überprüft, ob eine Karte ausgewählt ist, wodurch diese eine Makierung bekommt
    isSelected(stackIndex, cardStackIndex, cardIndex) {
      return this.selectedStack === stackIndex && this.selectedCardStack === cardStackIndex && this.selectedCardIndex <= cardIndex;
    },
    // Sorgt für das überlappen der Karten
    cardStyle(cardIndex) {
      if(cardIndex !== 0){
        return {
        top: `${cardIndex * 40 - 30}px` // Abstand zwischen den überlappenden Karten
      };
      }
    },
  },

});
</script>

<style>
.card-stack {
  min-height: 300px;
  /* Erhöhte Höhe für die Stapel */
  position: relative;
  padding: 10px;
}

.card {
  width: 100px;
  height: 150px;
  margin: 0;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  position: absolute;
  transition: transform 0.3s, box-shadow 0.3s;
}

.text-center{
  display: flex; 
  align-items: center; 
  justify-content: center;
}

.card.selected {
  transform: scale(1.1);
  box-shadow: 0 0 10px 2px rgba(255, 0, 0, 0.5);
}

</style>
