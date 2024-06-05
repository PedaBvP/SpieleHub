<!-- src/App.vue -->
<template>
  <v-layout>
    <navbar></navbar>
    <v-main>
        
        <router-view />
    </v-main>
  </v-layout>
</template>

<script>
import Navbar from './components/Navbar.vue';
export default {
  components: { Navbar },
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
