<template>
    <v-card>
      <div>
        <audio ref="audio" :src="audioFile" @timeupdate="updateProgress"></audio>
        <div class="soundbar">
          <div class="progress" :style="{ width: progress + '%' }"></div>
        </div>
        <v-btn @click="togglePlayPause">{{ playPauseButtonLabel }}</v-btn>
        <input type="range" min="0" max="100" v-model="volume" @input="updateVolume">
        <div class="jump-buttons">
          <button v-for="n in 6" :key="n" @click="playForSeconds(n)">{{ n }}</button>
          <button @click="playRandomAudio">Zufälliges Audio</button>
        </div>
        <div>
          <input type="text" v-model="inputText" placeholder="Enter MP3 file name">
          <button @click="submitInput">Submit</button>
          <img v-if="submitted && inputText.toLowerCase().replace(' ', '') === audioFile.replace('/audio/', '').replace('.mp3', '').toLowerCase().replace(' ', '')" src="https://upload.wikimedia.org/wikipedia/commons/0/05/Check_Mark_CSS_Green.svg" alt="Valid image">
          <img v-else-if="submitted" src="https://upload.wikimedia.org/wikipedia/commons/9/92/RedX_Transparent.svg" alt="Invalid image">
        </div>
      </div>
    </v-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        audioFiles: ['/audio/in the end.mp3', '/audio/numb.mp3', '/audio/crawling.mp3'], // Liste aller Audiodateien
        audioFile: '/audio/in the end.mp3',
        progress: 0,
        playPauseButtonLabel: 'Play',
        volume: 50,
        isPlaying: false,
        lastPlayedIndex: -1,
        inputText: '',
        submitted: false
      }
    },
    watch: {
        inputText() {
            this.submitted = false;
        },
        
    },
    methods: {
      togglePlayPause() {
        if (this.isPlaying) {
          this.$refs.audio.pause()
          this.playPauseButtonLabel = 'Play'
        } else {
          this.$refs.audio.play()
          this.playPauseButtonLabel = 'Pause'
        }
        this.isPlaying =!this.isPlaying
      },
      updateProgress() {
        this.progress = (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100
      },
      updateVolume() {
        this.$refs.audio.volume = this.volume / 100
      },
      playForSeconds(n) {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        setTimeout(() => {
          this.$refs.audio.pause()
        }, n * 1000)
      },
      playRandomAudio() {
        let randomIndex
        do {
          randomIndex = Math.floor(Math.random() * this.audioFiles.length)
        } while (randomIndex === this.lastPlayedIndex)
        this.lastPlayedIndex = randomIndex
        this.audioFile = this.audioFiles[randomIndex]
        this.$refs.audio.src = this.audioFile
        this.$refs.audio.play()
        this.submitted = false;
      },
      submitInput() {
        this.submitted = true
      }
    }
  }
  </script>
  
  <style>
  .soundbar {
    width: 100%;
    height: 20px;
    background-color: #ccc;
    border-radius: 10px;
    overflow: hidden;
  }
  
  .progress {
    height: 100%;
    background-color: #666;
    transition: width 0.2s;
  }
  
  .jump-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  
  .jump-buttons button {
    margin: 0 5px;
  }
  </style>