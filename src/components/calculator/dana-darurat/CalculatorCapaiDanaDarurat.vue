<template>
  <q-card id="capaiDanaDarurat">
    <div class="content-header">
      <h1 class="--title q-mt-none q-mb-md calculator-title">
        Capai Kalkulator Dana Darurat
      </h1>
    </div>
    <div>
      <div class="q-mb-lg calculator-input-label justify-start">
          Jumlah uang menabung anda tiap bulan
          <q-input
            outlined
            dense
            class="col-4 calculator-input"
            v-model="savedMoney"
          >
            <template v-slot:prepend> Rp </template>
          </q-input>
          <div class="q-gutter-sm q-my-xs">
            <q-btn
              class="text-bold q-pa-xs btn-normal-b-radius"
              :class="intSavedMoney == 100_000 ? 'primary-active-button' : 'primary-inactive-button'"
              padding="4px 8px"
              unelevated
              no-caps
              label="100 Ribu"
              size="md"
              @click="fillMoney('100000')"
            />
            <q-btn
              class="text-bold q-pa-xs btn-normal-b-radius"
              :class="intSavedMoney == 500_000 ? 'primary-active-button' : 'primary-inactive-button'"
              padding="4px 8px"
              unelevated
              no-caps
              label="500 Ribu"
              size="md"
              @click="fillMoney('500000')"
            />
            <q-btn
              class="text-bold q-pa-xs btn-normal-b-radius"
              :class="intSavedMoney == 1_000_000 ? 'primary-active-button' : 'primary-inactive-button'"
              padding="4px 8px"
              unelevated
              no-caps
              label="1 Juta"
              size="md"
              @click="fillMoney('1000000')"
            />
            <q-btn
              class="text-bold q-pa-xs btn-normal-b-radius"
              :class="intSavedMoney == 5_000_000 ? 'primary-active-button' : 'primary-inactive-button'"
              padding="4px 8px"
              unelevated
              no-caps
              label="5 Juta"
              size="md"
              @click="fillMoney('5000000')"
            />
          </div>
      </div>
    </div>
    <div v-if="intSavedMoney != 0">
      <div class="q-mb-md">
        <p class="calculator-result-label">JIKA ANDA MENABUNG</p>
        <div class="calculator-result calculator-currency-result"><div>RP</div><div>{{ savedMoney }} / bulan</div></div>
        <div class="calculator-assumption">*Dengan asumsi uang menabung Anda tanpa bunga</div>
      </div>
      <div class="q-mb-md">
        <p class="calculator-result-label">ANDA BISA MENCAPAI DANA DARURAT ANDA</p>
        <div class="calculator-result calculator-currency-result"><div>RP</div><div>{{ danaDarurat }} </div></div>
      </div>
      <div class="q-mb-md">
        <p class="calculator-result-label">ANDA AKAN MENCAPAI DANA DARURAT DALAM WAKTU </p>
        <div class="calculator-duration-result">
          <div class="calculator-result">{{ intDanaDarurat % intSavedMoney == 0 ? (intDanaDarurat/intSavedMoney).toFixed(0) : (intDanaDarurat/intSavedMoney).toFixed(1) }} bulan </div>
          <div>ATAU</div>
          <div class="calculator-result"> {{ intDanaDarurat % (intSavedMoney*12) == 0 ? (intDanaDarurat/(intSavedMoney*12)).toFixed(0) : (intDanaDarurat/(intSavedMoney*12)).toFixed(1)}} tahun </div>
        </div>
      </div>
      <q-btn class="text-bold q-py-sm full-width q-mb-md" outline rounded @click="backtToCalculatorDanaDarurat"
        text-color="dark">
        Hitung Ulang Dana Darurat
      </q-btn>
    </div>
  </q-card>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    danaDarurat: String,
    intDanaDarurat: Number
  },

  data() {
    return {
      savedMoney: 0,
      intSavedMoney: 0,
    };
  },

  methods: {
    fillMoney(amount) {
      this.savedMoney = amount;
      this.intSavedMoney = parseInt(amount)
    },

    backtToCalculatorDanaDarurat(){
      this.$emit("backToCalculatorDanaDarurat")
    }
  },

  watch: {
    "savedMoney": function (newVal) {
      if (newVal) {
        const money = parseInt(newVal.replaceAll(/[,.]/g, ""));
        const value = money.toLocaleString();
        if (money > 0) {
          this.savedMoney = value;
          this.intSavedMoney = money;
          return;
        }
      }

      this.savedMoney = 0;
      this.intSavedMoney = 0;
    },
  },
});
</script>
