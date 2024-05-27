<!-- src/App.vue -->
<template>
  <v-layout>
    <v-app-bar 
        color="teal-darken-4" image="https://picsum.photos/1920/1080?random">
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title style="cursor: pointer" @click="$router.push('/')" text="SpieleHub">
        </v-app-bar-title
      >
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
        
        <router-view />
    </v-main>
  </v-layout>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>

html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
