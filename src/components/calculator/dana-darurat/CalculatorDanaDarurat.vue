<template>
  <q-card id="danaDarurat">
    <div class="content-header">
      <h1 class="q-mt-none q-mb-md calculator-title">
        Kalkulator Dana Darurat
      </h1>
    </div>
    <div>
      <div class="q-mb-lg calculator-input-label justify-start">
          Jumlah pengeluaran per bulan Anda
          <q-input
            outlined
            dense
            class="col-4 calculator-input"
            v-model="pengeluaran"
          >
            <template v-slot:prepend> Rp </template>
          </q-input>
          <div class="q-gutter-sm q-my-xs">
            <q-btn
              class="text-bold q-pa-xs btn-normal-b-radius"
              :class="intPengeluaran == 1000000 ? 'primary-active-button' : 'primary-inactive-button'"
              padding="4px 8px"
              unelevated
              no-caps
              label="1 Juta"
              size="md"
              @click="fillMoney('1000000')"
            />
            <q-btn
              class="text-bold q-pa-xs btn-normal-b-radius"
              :class="intPengeluaran == 5000000 ? 'primary-active-button' : 'primary-inactive-button'"
              padding="4px 8px"
              unelevated
              no-caps
              label="5 Juta"
              size="md"
              @click="fillMoney('5000000')"
            />
            <q-btn
              class="text-bold q-pa-xs btn-normal-b-radius"
              :class="intPengeluaran == 10000000 ? 'primary-active-button' : 'primary-inactive-button'"
              padding="4px 8px"
              unelevated
              no-caps
              label="10 Juta"
              size="md"
              @click="fillMoney('10000000')"
            />
            <q-btn
              class="text-bold q-pa-xs btn-normal-b-radius"
              :class="intPengeluaran == 20000000 ? 'primary-active-button' : 'primary-inactive-button'"
              padding="4px 8px"
              unelevated
              no-caps
              label="20 Juta"
              size="md"
              @click="fillMoney('20000000')"
            />
          </div>
      </div>
    </div>
    <div v-if="intPengeluaran > 0">
      <div class="q-mb-lg calculator-input-label justify-start">
          Apakah Anda Sudah Menikah?
          <div class="q-my-xs flex text-weight-regular" style="gap: 35px;">
            <q-radio dense size="xs" v-model="marrigeStatus" val="belum" label="Belum" @click="calculateDanaDarurat"/>
            <q-radio dense size="xs" v-model="marrigeStatus" val="sudah" label="Sudah" @click="calculateDanaDarurat"/>
          </div>
        </div>
    </div>
    <div v-if="marrigeStatus == 'sudah'">
      <div class="q-mb-lg calculator-input-label justify-start">
          Jumlah Tanggungan
          <div class="q-my-xs flex" style="gap: 16px;">
            <q-btn
              class="text-bold q-px-sm btn-normal-b-radius"
              :class="childrens == '0' ? 'primary-active-button' : 'primary-inactive-button'"
              padding="4px 8px"
              unelevated
              no-caps
              label="0"
              size="md"
              @click="haveChildren('0')"
            />
            <q-btn
              class="text-bold q-px-sm btn-normal-b-radius"
              :class="childrens == '1' ? 'primary-active-button' : 'primary-inactive-button'"
              padding="4px 8px"
              unelevated
              no-caps
              label="1"
              size="md"
              @click="haveChildren('1')"
            />
            <q-btn
              class="text-bold q-px-sm btn-normal-b-radius"
              :class="childrens == '2' ? 'primary-active-button' : 'primary-inactive-button'"
              padding="4px 8px"
              unelevated
              no-caps
              label="2"
              size="md"
              @click="haveChildren('2')"
            />
            <q-btn
              class="text-bold q-px-sm btn-normal-b-radius"
              :class="childrens == '3' ? 'primary-active-button' : 'primary-inactive-button'"
              padding="4px 8px"
              unelevated
              no-caps
              label="3"
              size="md"
              @click="haveChildren('3')"
            />
            <q-btn
              class="text-bold q-pa-xs btn-normal-b-radius"
              :class="childrens == 'Lebih dari 3' ? 'primary-active-button' : 'primary-inactive-button'"
              padding="4px 8px"
              unelevated
              no-caps
              label="Lebih dari 3"
              size="md"
              @click="haveChildren('Lebih dari 3')"
            />
          </div>
        </div>
    </div>
    <div v-if="danaDarurat != 0">
      <p class="calculator-result-label">HASIL DANA DARURAT ANDA</p>
      <div class="calculator-result calculator-currency-result"><div>RP</div><div>{{ danaDarurat.toLocaleString() }}</div></div>
      <q-btn
        class="text-bold q-pa-xs primary-active-button btn-normal-b-radius q-mt-md"
        padding="8px 16px"
        no-caps
        label="Yuk! Capai Dana Darurat Anda >"
        size="md"
        @click="calculatorCapaiDanaDarurat"
      />
    </div>
  </q-card>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      pengeluaran: 0,
      intPengeluaran: 0,
      marrigeStatus: "",
      childrens: "",
      danaDarurat: 0,
      intDanaDarurat:0,
      goToCapaiDanaDarurat: false,
    };
  },

  methods: {
    fillMoney(amount) {
      this.pengeluaran = amount;
      this.intPengeluaran = parseInt(amount)
      this.calculateDanaDarurat();
      console.log(this.danaDarurat)
    },

    haveChildren(childrens){
      this.childrens = childrens
      this.calculateDanaDarurat()
    },

    calculateDanaDarurat(){
      if(this.marrigeStatus == 'belum'){
        this.danaDarurat = `${this.intPengeluaran*6}`
      }else if(this.marrigeStatus == 'sudah'){
        let marrige = this.intPengeluaran * 9;
        let children = 0;
        switch(this.childrens){
          case"0":
            children = this.intPengeluaran * 0;
            break;
          case"1":
            children = this.intPengeluaran * 3;
            break;
          case"2":
            children = this.intPengeluaran * 6;
            break;
          case"3":
            children = this.intPengeluaran * 9;
            break;
          case"Lebih dari 3":
            children = this.intPengeluaran * 12;
            break;
          default:
            marrige = 0;
            break;
        }
        this.danaDarurat = `${marrige + children}`
      }else{
        this.danaDarurat = 0
      }
    },

    calculatorCapaiDanaDarurat(){
      this.$emit("updateCapaiDanaDarurat", this.intDanaDarurat, this.danaDarurat);
    }
  },

  watch: {
    "pengeluaran": function (newVal) {
      if (newVal) {
        const money = parseInt(newVal.replaceAll(/[,.]/g, ""));
        const value = money.toLocaleString();
        if (money > 0) {
          this.pengeluaran = value;
          this.intPengeluaran = money;
          return;
        }
      }

      this.pengeluaran = 0;
      this.intPengeluaran = 0;
    },

    "danaDarurat": function (newVal) {
      if (newVal) {
        const money = parseInt(newVal.replaceAll(/[,.]/g, ""));
        const value = money.toLocaleString();
        if (money > 0) {
          this.intDanaDarurat = money;
          this.danaDarurat = value;
          return;
        }
      }
      this.intDanaDarurat = 0;
      this.danaDarurat = 0;
    },
  },
});
</script>
