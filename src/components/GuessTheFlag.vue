// src/components/FlagQuiz.vue

<template>
    <v-card color="grey-lighten-1" >
        <img :src="flagUrl" alt="Country Flag" height="250" />
        <div v-for="country in options" :key="country.id">
            <v-row justify="center">
                <v-btn @click="checkAnswer(country)" ><v-text color="black">{{ country.name }}</v-text></v-btn>
            </v-row>
        </div>
        <div v-if="result !== null">
            <img :src="result" height="250"/>
            <p v-if="last !== null">{{ last }}</p>
        </div>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            countries: [
                { name: "Albanien", id: 0, flag: "https://flagcdn.com/al.svg" },
                { name: "Andorra", id: 1, flag: "https://flagcdn.com/ad.svg" },
                { name: "Belgien", id: 2, flag: "https://flagcdn.com/be.svg" },
                { name: "Bosnien und Herzegowina", id: 3, flag: "https://flagcdn.com/ba.svg" },
                { name: "Bulgarien", id: 4, flag: "https://flagcdn.com/bg.svg" },
                { name: "Dänemark", id: 5, flag: "https://flagcdn.com/dk.svg" },
                { name: "Deutschland", id: 6, flag: "https://flagcdn.com/de.svg" },
                { name: "Estland", id: 7, flag: "https://flagcdn.com/ee.svg" },
                { name: "Finnland", id: 8, flag: "https://flagcdn.com/fi.svg" },
                { name: "Frankreich", id: 9, flag: "https://flagcdn.com/fr.svg" },
                { name: "Griechenland", id: 10, flag: "https://flagcdn.com/gr.svg" },
                { name: "Irland", id: 11, flag: "https://flagcdn.com/ie.svg" },
                { name: "Island", id: 12, flag: "https://flagcdn.com/is.svg" },
                { name: "Italien", id: 13, flag: "https://flagcdn.com/it.svg" },
                { name: "Kosovo", id: 14, flag: "https://flagcdn.com/xk.svg" },
                { name: "Kroatien", id: 15, flag: "https://flagcdn.com/hr.svg" },
                { name: "Lettland", id: 16, flag: "https://flagcdn.com/lv.svg" },
                { name: "Liechtenstein", id: 17, flag: "https://flagcdn.com/li.svg" },
                { name: "Litauen", id: 18, flag: "https://flagcdn.com/lt.svg" },
                { name: "Luxemburg", id: 19, flag: "https://flagcdn.com/lu.svg" },
                { name: "Malta", id: 20, flag: "https://flagcdn.com/mt.svg" },
                { name: "Moldawien", id: 21, flag: "https://flagcdn.com/md.svg" },
                { name: "Monaco", id: 22, flag: "https://flagcdn.com/mc.svg" },
                { name: "Montenegro", id: 23, flag: "https://flagcdn.com/me.svg" },
                { name: "Niederlande", id: 24, flag: "https://flagcdn.com/nl.svg" },
                { name: "Nordmazedonien", id: 25, flag: "https://flagcdn.com/mk.svg" },
                { name: "Norwegen", id: 26, flag: "https://flagcdn.com/no.svg" },
                { name: "Österreich", id: 27, flag: "https://flagcdn.com/at.svg" },
                { name: "Polen", id: 28, flag: "https://flagcdn.com/pl.svg" },
                { name: "Portugal", id: 29, flag: "https://flagcdn.com/pt.svg" },
                { name: "Rumänien", id: 30, flag: "https://flagcdn.com/ro.svg" },
                { name: "Russland", id: 31, flag: "https://flagcdn.com/ru.svg" },
                { name: "San Marino", id: 32, flag: "https://flagcdn.com/sm.svg" },
                { name: "Schweden", id: 33, flag: "https://flagcdn.com/se.svg" },
                { name: "Schweiz", id: 34, flag: "https://flagcdn.com/ch.svg" },
                { name: "Serbien", id: 35, flag: "https://flagcdn.com/rs.svg" },
                { name: "Slowakei", id: 36, flag: "https://flagcdn.com/sk.svg" },
                { name: "Slowenien", id: 37, flag: "https://flagcdn.com/si.svg" },
                { name: "Spanien", id: 38, flag: "https://flagcdn.com/es.svg" },
                { name: "Tschechien", id: 39, flag: "https://flagcdn.com/cz.svg" },
                { name: "Ukraine", id: 40, flag: "https://flagcdn.com/ua.svg" },
                { name: "Ungarn", id: 41, flag: "https://flagcdn.com/hu.svg" },
                { name: "Vatikanstadt", id: 42, flag: "https://flagcdn.com/va.svg" },
                { name: "Vereinigtes Königreich", id: 43, flag: "https://flagcdn.com/gb.svg" },
                { name: "Belarus", id: 44, flag: "https://flagcdn.com/by.svg" }
            ],
            options: [],
            correctCountry: null,
            flagUrl: '',
            result: null,
            last: null
        };
    },
    created() {
        this.generateQuiz();
    },
    methods: {
        generateQuiz() {
            this.options = [];
            const shuffled = this.countries.sort(() => 0.5 - Math.random());
            this.options = shuffled.slice(0, 4);
            this.correctCountry = this.options[Math.floor(Math.random() * 4)];
            this.flagUrl = this.correctCountry.flag;
        },
        checkAnswer(country) {
            if (country === this.correctCountry) {
                this.result = 'https://upload.wikimedia.org/wikipedia/commons/0/05/Check_Mark_CSS_Green.svg';
                this.last = "Korrekt! Die letzte Flagge war " + this.correctCountry.name;
            } else {
                this.result = 'https://upload.wikimedia.org/wikipedia/commons/9/92/RedX_Transparent.svg';
                this.last = "Falsch! Die letzte Flagge war " + this.correctCountry.name;
            }
            this.generateQuiz();
        }
    }
};
</script>

<style scoped>
button {
    display: block;
    margin: 10px 0;
}
</style>
