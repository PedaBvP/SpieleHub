<template>
    <v-item-group multiple>
      <v-container>
        <v-row>
          <v-col
            v-for="n in 30"
            :key="n"
            cols="12"
            md="2"
          >
            <v-item v-slot="{ isSelected, toggle }">
              <v-card
                :color="isSelected ? 'primary' : ''"
                class="d-flex align-center"
                height="100"
                dark
                @click="toggle"
              >
                <v-scroll-y-transition>
                  <div
                    class="text-h3 flex-grow-1 text-center"
                  >
                    {{ isSelected ? 'Selected' : '' }}
                  </div>
                </v-scroll-y-transition>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </template>