<template>
    <v-app-bar 
        color="teal-darken-4" image="https://picsum.photos/1920/1080?random">
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>
      <v-app-bar-nav-icon @click="$router.push('/')"></v-app-bar-nav-icon>
      <v-app-bar-title style="cursor: pointer" @click="$router.push('/')" text="SpieleHub">
        </v-app-bar-title
      >
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
</template>