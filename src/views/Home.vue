<template>
  <div>
    <v-row justify="center">
      <v-date-picker
        v-model="date"
        class="mt-4"
        min="2016-06-15"
        :max="maxdate"
        locale="es"
        :readonly="readonly"
        @change="getDolar(date)"
      ></v-date-picker>
    </v-row>
    <v-row justify="center">
      <v-card>
        <v-card-text>{{ value }} - {{ date }}</v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "Home",
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    value: null,
    maxdate: new Date().toISOString().substr(0, 10),
    readonly: false
  }),
  methods: {
    ...mapMutations(["showLoading", "hideLoading"]),
    async getDolar(date) {
      this.readonly = true
      date = this.formatDate(date);
      try {
        this.showLoading({
          title: "Un momento por favor",
        });

        let datos = await axios.get(`https://mindicador.cl/api/dolar/${date}`);
        let serie = await datos.data.serie;

        if (serie.length > 0) {
          this.value = serie[0].valor;
          return;
        }
        this.value = "No existe valor para la fecha ";
      } catch (error) {
        console.log(error);
      } finally {
        this.hideLoading();
        this.readonly = false
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
  },
  /*watch: {
    date(val) {
      this.getDolar(this.formatDate(val));
    },
  },*/
};
</script>
