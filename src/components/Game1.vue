<template>
    <div class="scrollable-container">
        <v-row>
            <v-col v-for="item in items" :key="item.id">
              <v-card>
                {{ item.text }}
              </v-card>
                <!-- Hier kannst du den Inhalt der Zellen definieren -->
                
            </v-col>
        </v-row>
      </div>

</template>

<script>
export default {
    data() {
        return {
            items: [
                { id: 1, text: 'Element 1' },
                { id: 2, text: 'Element 2' },
                { id: 3, text: 'Element 3' },
                { id: 1, text: 'Element 4' },
                { id: 2, text: 'Element 5' },
                { id: 3, text: 'Element 6' },
                { id: 2, text: 'Element 7' },
                { id: 3, text: 'Element 8' },
                // Hier weitere Elemente hinzufügen...
            ]
        };
    }
};
</script>

<style>
/* Hier die Breite der Spalten definieren */
.v-col {
    min-width: 200px;
    /* Beispielwert, anpassen nach Bedarf */
}

;

.scrollable-container {
    overflow-x: auto;
    white-space: nowrap;
    /* Verhindert Zeilenumbrüche innerhalb der Zellen */
}

;
</style>