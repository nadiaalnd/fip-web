<template>
  <div>
    <div v-if="isShowResult">NANTI DISINI HASILNYA</div>
    <div
      v-else
      class="row justify-between"
      v-for="(question, index) in visibleQuestions"
      :key="index"
    >
      <div class="row justify-between" v-if="index == 0">
        {{ question.question }}
        <q-input
          outlined
          dense
          class="q-mb-md col-4"
          style="max-width: 200px; font-size: 16px; min-width: 170px"
          v-model="question.inputValue"
          @update:modelValue="handleInput(index)"
          ><template v-slot:prepend> Rp </template>
        </q-input>
        <div class="q-mb-lg q-gutter-sm">
          <q-btn
            unelevated
            no-caps
            label="10 Juta"
            size="sm"
            style="border-radius: 4px; background: #f2f6f8; color: #3469a7"
            @click="fillMoney(10000000)"
          />
          <q-btn
            unelevated
            no-caps
            label="50 Juta"
            size="sm"
            style="border-radius: 4px; background: #f2f6f8; color: #3469a7"
            @click="fillMoney(50000000)"
          />
          <q-btn
            unelevated
            no-caps
            label="100 Juta"
            size="sm"
            style="border-radius: 4px; background: #f2f6f8; color: #3469a7"
            @click="fillMoney(100000000)"
          />
          <q-btn
            unelevated
            no-caps
            label="1 Milyar"
            size="sm"
            style="border-radius: 4px; background: #f2f6f8; color: #3469a7"
            @click="fillTargetMoney(1000000000)"
          />
        </div>
      </div>
      <div class="row justify-start" v-if="index == 1">
        {{ question.question }}
        <q-input
          class="q-mb-md col-4 text-center"
          style="max-width: 60px; font-size: 20px; min-width: 30px"
          v-model="question.inputValue"
          @update:modelValue="handleInput(index)"
        >
        </q-input>
        <span
          class="self-end q-mb-md q-ml-sm"
          style="font-size: 20px; font-weight: normal"
          >Tahun</span
        >
      </div>
      <div class="row justify-start" v-if="index == 2 || index == 3">
        {{ question.question }}
        <q-input
          outlined
          dense
          class="q-mb-md col-4"
          style="max-width: 200px; font-size: 16px; min-width: 170px"
          v-model="question.inputValue"
          @update:modelValue="handleInput(index)"
          ><template v-slot:prepend> Rp </template>
        </q-input>
        <span
          class="self-end q-mb-md q-ml-sm"
          style="font-size: 20px; font-weight: normal"
          >Juta</span
        >
      </div>
      <div class="q-gutter-sm q-py-xs text-weight-bold" v-else-if="index == 4">
        {{ question.question }}
        <q-radio
          size="xs"
          v-model="question.inputValue"
          val="monthly"
          label="Perbulan"
          style="margin-left: 0px"
          @update:modelValue="handleInput(index)"
        />
        <q-radio
          size="xs"
          v-model="question.inputValue"
          val="annually"
          label="Pertahun"
          @update:modelValue="handleInput(index)"
        />
      </div>
      <div class="row justify-start" v-else-if="index == 5">
        {{ question.question }}
        <q-input
          class="q-mb-md col-4 text-center"
          style="max-width: 60px; font-size: 20px; min-width: 30px"
          v-model="question.inputValue"
          @update:modelValue="handleInput(index)"
        >
        </q-input>
        <span
          class="self-end q-ml-sm"
          style="font-size: 30px; font-weight: normal"
          >%</span
        >
      </div>
    </div>
    <div class="row justify-center" v-if="showButton">
      <q-btn
        unelevated
        no-caps
        label="Hitung"
        size="sm"
        style="border-radius: 4px; background: #3469a7; color: #fff"
        @click="calculateResult"
      />
    </div>
  </div>
</template>

<script>
import { debounce } from "quasar";

export default {
  created() {
    console.log(this.numberQuestion);
  },
  methods: {
    handleInput: debounce(function (index) {
      console.log("index : ", index);
      console.log("calculation", this.calculatorBody.input);
      if (index === this.numberQuestion) {
        this.calculatorBody.input.push(this.input[index].inputValue);
        this.numberQuestion++;
      } else {
        this.calculatorBody.input[index] = this.input[index].inputValue;
      }
      if (index === this.input.length - 1) {
        console.log("data", this.calculatorBody);
        this.showButton = true;
      }
    }, 1000),
    calculateResult() {
      // RUMUSNYA NANTI DISINI
      this.isShowResult = true;
    },
    fillMoney(money) {
      this.calculatorBody.input[0] = money;
    },
  },
  computed: {
    visibleQuestions() {
      return this.input.slice(0, this.numberQuestion + 1);
    },
  },
  data() {
    return {
      showButton: false,
      isShowResult: false,
      calculatorBody: {
        input: [],
        output: "",
        type: "calculator_investment",
        id_user: 1,
      },
      input: [
        {
          no: 1,
          inputValue: "",
          target_money: 0,
          addClass: "add-effect-fade",
          question: "Jumlah uang yang ingin Anda capai",
        },
        {
          no: 2,
          inputValue: "",
          target_year: null,
          addClass: "add-effect-fade",
          question: "Berapa lama uang yang ingin Anda capai terkumpul",
        },
        {
          no: 3,
          inputValue: "",
          intial_money: 0,
          addClass: "add-effect-fade",
          question: "Uang yang Anda miliki sekarang",
        },
        {
          no: 4,
          inputValue: "",
          investment: 0,
          addClass: "add-effect-fade",
          question: "Jumlah investasi Anda setiap bulan",
        },
        {
          no: 5,
          inputValue: "",
          investment_periode: "monthly",
          addClass: "add-effect-fade",
          question: "Tempo waktu Anda dalam investasi",
        },
        {
          no: 6,
          inputValue: "",
          interest: null,
          addClass: "add-effect-fade",
          question: "Imbal hasil yang diharapkan / tahun?",
        },
      ],
      numberQuestion: 0,
    };
  },
};
</script>

<style>
/* Your styles here */
</style>
