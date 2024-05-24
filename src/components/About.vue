<template>
  <v-app>
    <v-main>
      <v-container>
        <v-btn color="primary" @click="$router.push('/about')">Go to About</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
/* Vuetify styles werden automatisch importiert */
</style>
