<template>
  <q-card class="q-px-lg q-py-sm full-width q-mb-lg">
    <div class="content-header">
      <h1 class="text-primary q-mt-none q-mb-md text-bold">
        Kalkulator Investasi
      </h1>
    </div>
    <div v-if="isShowResult">
      <div>
        <div class="q-mb-md f-text-highlighted">Strategi Investasi Anda</div>
        <div class="q-my-sm">
          <div class="f-text">NOMINAL UANG RENCANA ANDA</div>
          <div class="f-text-highlighted">Rp {{}}</div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">UANG ANDA SAAT INI</div>
          <div class="f-text-highlighted">Rp {{}}</div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">JUMLAH INVESTASI / BULAN</div>
          <div class="f-text-highlighted">Rp {{}}</div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">RETURN PRODUK INVESTASI / TAHUN</div>
          <div class="f-text-highlighted">{{}} %</div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">JANGKA WAKTU INVESTASI</div>
          <div class="f-text-highlighted">{{}} tahun</div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">HASIL INVESTASI</div>
          <div class="row q-gutter-sm justify-start">
            <i class="material-icons arrow-drop-ic">arrow_drop_down_circle</i>
            <div class="f-text-highlighted">Rp {{}}</div>
          </div>
        </div>
        <div class="q-my-sm invest-result">
          <div class="f-text point-circle">POKOK INVESTASI</div>
          <div class="row justify-start">
            <div class="f-text-highlighted">Rp {{ result.invest_primary }}</div>
            <q-chip
              class="text-bold"
              square
              size="sm"
              color="primary"
              text-color="white"
            >
              {{}} %
            </q-chip>
          </div>
          <div class="f-text">BUNGA INVESTASI</div>
          <div class="row justify-start">
            <div class="point-circle f-text-highlighted">Rp {{}}</div>
            <q-chip
              class="text-bold"
              square
              size="sm"
              color="green"
              text-color="white"
            >
              {{}} %
            </q-chip>
          </div>
        </div>
      </div>

      <!-- Recommendation -->
      <div v-if="isShowRecommendation">
        <div class="q-mb-md">
          <div class="f-text">INI REKOMENDASI -_- </div>
          <div class="row justify-start">
            <div class="f-text-highlighted">{{}}</div>
          </div>
        </div>
      </div>

      <q-btn
        class="recom-btn text-bold q-py-sm full-width q-my-sm"
        outline
        rounded
        no-caps
        text-color="dark"
        @click="showRecommendation"
      >
        Lihat Rekomendasi
      </q-btn>
      <q-btn
        class="text-bold q-py-sm full-width q-mb-md"
        outline
        rounded
        no-caps
        @click="resetQuestion"
        text-color="dark"
      >
        Hitung Ulang
      </q-btn>
    </div>
    <div
      class="q-mb-md"
      v-else
      v-for="(question, index) in visibleQuestions"
      :key="index"
    >
      <div class="q-mb-lg text-bold justify-start" v-if="index == 0">
        {{ question.question }}
        <q-input
          outlined
          dense
          class="q-my-sm col-4"
          style="max-width: 200px; font-size: 16px; min-width: 170px"
          v-model="question.inputValue"
          @update:modelValue="handleInput(index)"
          ><template v-slot:prepend> Rp </template>
        </q-input>
        <div class="q-gutter-sm">
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
            @click="fillMoney(1000000000)"
          />
        </div>
      </div>
      <div class="q-mt-md text-bold" v-if="index == 1">
        {{ question.question }}
        <div class="row justify-start">
          <q-input
            class="col-4 text-center"
            style="max-width: 60px; font-size: 20px; min-width: 30px"
            v-model="question.inputValue"
            @update:modelValue="handleInput(index)"
          >
          </q-input>
          <span
            class="self-end q-mb-md q-ml-sm"
            style="font-size: 20px; font-weight: bold; margin-top: 30px"
            >Tahun</span
          >
        </div>
      </div>
      <div class="q-mt-md text-bold" v-if="index == 2 || index == 3">
        {{ question.question }}
        <q-input
          outlined
          dense
          class="q-my-sm col-4"
          style="max-width: 200px; font-size: 16px; min-width: 170px"
          v-model="question.inputValue"
          @update:modelValue="handleInput(index)"
          ><template v-slot:prepend> Rp </template>
        </q-input>
      </div>
      <div class="q-mt-md text-bold q-gutter-sm q-py-xs" v-else-if="index == 4">
        {{ question.question }}
        <div class="row justify-start">
          <q-radio
            size="xs"
            v-model="question.inputValue"
            val="monthly"
            label="Perbulan"
            style="margin-left: -15px"
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
      </div>
      <div class="q-mt-md text-bold" v-else-if="index == 5">
        {{ question.question }}
        <div class="row justify-start">
          <q-input
            class="q-mb-md col-4 text-center"
            style="max-width: 60px; font-size: 20px; min-width: 30px"
            v-model="question.inputValue"
            @update:modelValue="handleInput(index)"
          >
          </q-input>
          <span
            class="q-ml-sm text-bold"
            style="font-size: 25px; margin-top: 30px"
            >%</span
          >
        </div>
      </div>
    </div>
    <div v-if="showButton && !isShowResult">
      <q-btn
        push
        no-caps
        class="btn-sm gtm-track q-mb-md"
        label="Lihat hasil rencana Anda"
        color="primary"
        gtm-action="btn_calculator_investment"
        @click="calculateResult"
      />
    </div>
    <hr />
    <div class="q-py-md">
      <h1 class="text-primary q-mt-none q-mb-md text-bold">
        Ayo Belajar Keuangan Gratis
      </h1>
      <p>
        Dengan memahami konsep dasar keuangan untuk meningkatkan kemampuan
        finansial Anda. Jadi, jangan ragu untuk memulai belajar keuangan
        sekarang!
      </p>
      <q-btn
        no-caps
        push
        color="secondary"
        class="text-black q-px-md gtm-track btn-medium"
        label="Mulai Sekarang"
        @click="getFreePackage"
        gtm-action="btn_free_get_calculator_investment"
      />
    </div>
  </q-card>
</template>

<script>
import { debounce } from "quasar";

export default {
  created() {
    console.log(this.numberQuestion);
  },

  methods: {
    getFreePackage: function () {
      this.$router.push({
        path: "/free/package/e-learning",
      });
    },

    showRecommendation() {
      this.isShowRecommendation = true;
    },

    resetQuestion() {
      this.input.forEach((data, idx) => {
        data.inputValue = "";
      });
      this.numberQuestion = 0;
      this.isShowResult = false;
      this.showRecommendation = false;
      this.showButton = false;
      this.calculatorBody.input = [];
    },

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
      const {
        target_money,
        target_year,
        interest,
        initial_money,
        investment_periode,
        investment,
      } = this.calculatorBody.input;

      const interestDecimal = interest / 100;
      let invest_total = 0;

      if (investment_periode === "annually") {
        for (let year = 1; year <= target_year; year++) {
          invest_total += (investment * 12 + initial_money) * interestDecimal;
        }
      } else if (investment_periode === "monthly") {
        invest_total =
          (investment * 12 + initial_money) * interestDecimal * target_year;
      }

      const invest_primary = initial_money + investment * target_year;
      const invest_interest = invest_total - invest_primary;

      this.result = {
        invest_total,
        invest_primary,
        invest_interest,
        success: invest_total >= 0 ? 1 : 0,
        reccomendation_year: target_year,
        recommendation_total: target_money,
        recommendation_primary: invest_primary,
        recommendation_interest: invest_interest,
      };

      this.isShowResult = true;
    },
    fillMoney(amount) {
      this.input[0].inputValue = amount;
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
      isShowRecommendation: false,
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
          initial_money: 0,
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
.arrow-drop-ic {
  transform: rotate(180deg);
  color: green;
  font-size: 24px;
}
.invest-result {
  margin-left: 75px;
  position: relative;
}
.point-circle {
  position: relative;
}
.point-circle::before {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  margin-left: -34px;
  border-radius: 50%;
  background-color: #999999;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.invest-result::before {
  content: "";
  position: absolute;
  top: 10px;
  margin-left: -29px;
  left: 0;
  transform: translateX(-50%);
  width: 2px;
  height: calc(73%);
  background-color: #ccc;
}

.recom-btn {
  background-color: #ffde59 !important;
}
</style>
