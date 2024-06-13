<template>
  <v-container class="custom-container">
    <audio ref="audio" :src="currentAudio.url" @timeupdate="updateProgress"></audio>

    <h1 class="text-uppercase">
      <v-icon>mdi-volume-medium</v-icon>
      <span> Guess the Audio</span>
    </h1>
    
    <span>{{ currentTime }}</span>
    <div class="soundbar">
      <v-slider :disabled="enable <= 6" v-model="progress" @click="seekAudio" ></v-slider>
    </div>



    <v-row class="d-flex align-center justify-space-between">
      <v-col cols="4">
      </v-col>
      <v-col cols="4" class="text-center">
        <v-btn v-if="isPlaying == false" density="default" icon="mdi-play-circle-outline" variant="outlined"
          @click="playButton"></v-btn>
        <v-btn v-if="isPlaying == true" density="default" icon="mdi-pause-circle-outline" variant="outlined"
          @click="playButton"></v-btn>
      </v-col>
      <v-col cols="4" class="text-right">
        <v-slider v-model="volume" prepend-icon="mdi-volume-high" @click="updateVolume"></v-slider>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-btn variant="outlined" @click="playForSeconds(1)">1</v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn :disabled="enable < 2" variant="outlined" @click="playForSeconds(2)">2</v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn :disabled="enable < 3" variant="outlined" @click="playForSeconds(3)">3</v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn :disabled="enable < 4" variant="outlined" @click="playForSeconds(4)">4</v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn :disabled="enable < 5" variant="outlined" @click="playForSeconds(5)">5</v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn :disabled="enable < 6" variant="outlined" @click="playForSeconds(6)">6</v-btn>
      </v-col>
    </v-row>

    <div class="mt-8">
      <p>Verbleibende Versuche {{ remainingGuesses }}</p>
    </div>

    <div class="mt-2">
      <p>Punkte: {{ points }}</p>
    </div>

    <v-sheet class="mx-auto mt-5" width="300">
      <v-form @submit.prevent>
        <v-text-field v-model="inputText" label="Tiername..."></v-text-field>
        <v-btn class="mt-2" type="submit" block @click="checkInput">Bestätigen</v-btn>
      </v-form>
    </v-sheet>

    <v-btn v-if="submitted && inputText.toLowerCase().replace(' ', '') === currentAudio.name.toLowerCase().replace(' ', '')"
     elevation="24" class="mt-8" size="x-large" block variant="outlined" @click="playRandomAudio">Nächstes Tier</v-btn>
    <v-btn v-else elevation="24" class="mt-8" size="x-large" block variant="outlined" @click="playRandomAudio">Überspringen</v-btn>

    <div
      v-if="submitted && inputText.toLowerCase().replace(' ', '') === currentAudio.name.toLowerCase().replace(' ', '')">
      <img class="mt-8" src="https://upload.wikimedia.org/wikipedia/commons/0/05/Check_Mark_CSS_Green.svg"
        alt="Valid image" style="width: 70px; height: 70px;">
      <p>Name: {{ currentAudio.name }}</p>
    </div>
    <div v-else-if="submitted || remainingGuesses <= 0">
      <img class="mt-8" src="https://upload.wikimedia.org/wikipedia/commons/9/92/RedX_Transparent.svg"
        alt="Invalid image" style="width: 70px; height: 70px;">
      <p v-if="remainingGuesses <= 0">Name: {{ currentAudio.name }}</p>
    </div>



  </v-container>
</template>

<style scoped>
.custom-container {
  background-color:white;
  max-width: 800px;
}
</style>


<script>
export default {
  data() {
    return {
      audioFiles: [
        {name: "Elefant", id: 0, url:"http://soundbible.com/grab.php?id=157&type=mp3"},
        {name: "Katze", id: 1, url:"http://soundbible.com/grab.php?id=1954&type=mp3"},
        {name: "Hund", id: 2, url: "http://soundbible.com/grab.php?id=2215&type=mp3"},
        {name: "Eule", id: 3, url: "http://soundbible.com/grab.php?id=1331&type=mp3"},
        {name: "Vogel", id: 4, url: "http://soundbible.com/grab.php?id=1213&type=mp3"},
        {name: "Alpaka", id: 5, url: "http://soundbible.com/grab.php?id=1735&type=mp3"},
        {name: "Kuh", id: 6, url: "http://soundbible.com/grab.php?id=1568&type=mp3"},
        {name: "Hahn", id: 7, url: "http://soundbible.com/grab.php?id=1134&type=mp3"},
        {name: "Frosch", id: 8, url: "http://soundbible.com/grab.php?id=2033&type=mp3"},
        {name: "Hirsch", id: 9, url: "http://soundbible.com/grab.php?id=2073&type=mp3"},
        {name: "Drache", id: 10, url: "http://soundbible.com/grab.php?id=543&type=mp3"},
        {name: "Pferd", id: 11, url: "http://soundbible.com/grab.php?id=429&type=mp3"},
        {name: "Löwe", id: 12, url: "http://soundbible.com/grab.php?id=1272&type=mp3"},
        {name: "Ente", id: 13, url: "http://soundbible.com/grab.php?id=1378&type=mp3"},
        {name: "Gans", id: 14, url: "http://soundbible.com/grab.php?id=1209&type=mp3"},
      ], 
      currentAudio: {},
      progress: 0,
      isPlaying: false,
      currentTime: '00:00',
      volume: 20,
      remainingGuesses: 5,
      inputText: null,
      submitted: false,
      enable: 1,
      points: 0,
      pointsEnabled: true
    }
  },
  created() {
      this.generateGame();
  },
  watch: {
    volume(newVolume) {
      this.updateVolume(newVolume);
    },
    inputText() {
      this.submitted = false;
    },

  },
  methods: {
    generateGame(){
      const shuffled = this.audioFiles.sort(() => 0.5 - Math.random());
      this.currentAudio = shuffled[0];
    },
    playButton(){
      if(this.enable <= 6){
        this.playForSeconds(this.enable);
      }else{
        this.togglePlayPause();
      }
    },
    togglePlayPause() {
      if (this.isPlaying) {
        this.$refs.audio.pause()
        this.isPlaying = false
      } else {
        this.$refs.audio.play()
        this.isPlaying = true
      }
    },
    updateProgress() {
      this.progress = (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100
      this.currentTime = this.formatTime(this.$refs.audio.currentTime)
    },
    formatTime(time) {
      let minutes = Math.floor(time / 60)
      let seconds = Math.floor(time % 60)
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
    seekAudio() {
      this.$refs.audio.currentTime = (this.progress / 100) * this.$refs.audio.duration;
    },
    updateVolume() {
      this.$refs.audio.volume = this.volume / 100
    },
    playForSeconds(n) {
      if(n <= this.$refs.audio.duration){ 
      this.enable = Math.max(this.enable, n + 1);
      this.isPlaying = true;
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      setTimeout(() => {
        this.isPlaying = false;
        this.progress = 0;
        this.currentTime = '00:00';
        this.$refs.audio.pause()
      }, (n + 1) * 1000)
    }else{
      this.enable = n;
      this.isPlaying = true;
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play()
      setTimeout(() => {
        this.isPlaying = false;
        this.progress = 0;
        this.currentTime = '00:00';
        this.$refs.audio.pause()
      }, (n + 1) * 1000)
    }
    },
    checkInput() {
      this.submitted = true;
      if (this.inputText.toLowerCase().replace(' ', '') !== this.currentAudio.name.toLowerCase().replace(' ', '')) {
        if(this.remainingGuesses == 0){
          this.remainingGuesses = 0;
        }else{
          this.remainingGuesses -= 1;
        }
      }else{
        if(this.pointsEnabled){
          this.points = this.remainingGuesses + this.points;
          this.pointsEnabled = false;
        }
      }
    },
    playRandomAudio() {
      let randomIndex
      do {
        randomIndex = Math.floor(Math.random() * this.audioFiles.length)
      } while (randomIndex === this.lastPlayedIndex)
      this.lastPlayedIndex = randomIndex
      this.currentAudio = this.audioFiles[randomIndex]
      this.$refs.audio.src = this.audioFile

      this.pointsEnabled = true;
      this.submitted = false;
      this.currentTime = '00:00';
      this.progress = 0;
      this.remainingGuesses = 5;
      this.isPlaying = false;
      this.enable = 1;
    },
  }
}
</script>