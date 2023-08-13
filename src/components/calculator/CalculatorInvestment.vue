<template>
  <q-card class="q-px-lg q-py-sm full-width q-mb-lg">
    <div class="content-header">
      <h1 class="text-primary q-mt-none q-mb-md text-bold">
        Kalkulator Investasi
      </h1>
    </div>

    <!-- SKOR / Result -->
    <div class="add-effect-fade" v-if="skor.length > 6">
      <div class="q-my-sm text-weight-regular">Strategi Investasi Anda</div>
      <div class="text-weight-medium q-mb-md">
        {{ calculateSkor }}
      </div>

      <q-btn
        class="text-bold q-py-sm full-width q-my-md"
        outline
        rounded
        @click="resetQuestion"
        text-color="dark"
      >
        Ulangi Pertanyaan
      </q-btn>
    </div>

    <!-- Question -->
    <div
      v-else
      ref="content_question"
      v-for="(data, idx) in inputQuestions"
      :class="data.addClass"
      class="q-mt-lg"
      :key="idx"
      v-show="data.no === numberQuestion || data.no === numberQuestion - 1"
    >
      <div class="--question-content">
        <div class="--question-title text-weight-bold">
          {{ data.question }}
        </div>
      </div>

      <div class="q-pa-xs --question-answers">
        <div class="row justify-between" v-if="data.no >= 1">
          <q-input
            outlined
            dense
            class="q-mb-md col-4"
            style="max-width: 200px; font-size: 16px; min-width: 170px"
            v-model="calculatorBody.input[0]"
            @update:modelValue="(val) => handleDebounce(val, data)"
            ><template v-slot:prepend> Rp </template>
          </q-input>
          <div class="q-mb-lg q-gutter-sm">
            <q-btn
              unelevated
              no-caps
              label="10 Juta"
              size="sm"
              style="border-radius: 4px; background: #f2f6f8; color: #3469a7"
              @click="fillTargetMoney(10000000)"
            />
            <q-btn
              unelevated
              no-caps
              label="50 Juta"
              size="sm"
              style="border-radius: 4px; background: #f2f6f8; color: #3469a7"
              @click="fillTargetMoney(50000000)"
            />
            <q-btn
              unelevated
              no-caps
              label="100 Juta"
              size="sm"
              style="border-radius: 4px; background: #f2f6f8; color: #3469a7"
              @click="fillTargetMoney(100000000)"
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
        <div class="row justify-start" v-if="data.no >= 2">
          <q-input
            class="q-mb-md col-4 text-center"
            style="max-width: 60px; font-size: 20px; min-width: 30px"
            v-model="calculatorBody.input[1]"
            @update:modelValue="(val) => handleDebounce(val, data)"
          >
          </q-input>
          <span
            class="self-end q-mb-md q-ml-sm"
            style="font-size: 20px; font-weight: normal"
            >Tahun</span
          >
        </div>
        <div class="row justify-start" v-if="data.no >= 3">
          <q-input
            outlined
            dense
            class="q-mb-md col-4"
            style="max-width: 200px; font-size: 16px; min-width: 170px"
            v-model="calculatorBody.input[3]"
            @update:modelValue="(val) => handleDebounce(val, data)"
            ><template v-slot:prepend> Rp </template>
          </q-input>
          <span
            class="self-end q-mb-md q-ml-sm"
            style="font-size: 20px; font-weight: normal"
            >Juta</span
          >
        </div>

        <div
          class="q-gutter-sm q-py-xs text-weight-bold"
          v-else-if="data.no === 5"
        >
          <q-radio
            size="xs"
            v-model="data.inputValue"
            val="monthly"
            label="Perbulan"
            style="margin-left: 0px"
            @input="(val) => handleInputDebounced(val, data)"
          />
          <q-radio
            size="xs"
            v-model="data.inputValue"
            val="annually"
            label="Pertahun"
            @input="(val) => handleInputDebounced(val, data)"
          />
        </div>
        <div class="row justify-start" v-else-if="data.no === 6">
          <q-input
            class="q-mb-md col-4 text-center"
            style="max-width: 60px; font-size: 20px; min-width: 30px"
            v-model="data.inputValue"
            @input="(val) => handleInputDebounced(val, data)"
          >
          </q-input>
          <span
            class="self-end q-ml-sm"
            style="font-size: 30px; font-weight: normal"
            >%</span
          >
        </div>
      </div>
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
import { defineComponent } from "vue";
import { debounce } from "quasar";

export default defineComponent({
  methods: {
    fillTargetMoney(amount) {
      this.calculatorBody.input[0] = amount;
    },

    handleDebounce: debounce(function (val, data) {
      this.numberQuestion++;
    }, 1000),

    resetQuestion() {
      this.skor = [];
      this.numberQuestion = 1;
      this.input.forEach((data, idx) => {
        data.inputValue = "";
      });
    },

    handleInput(value, data) {
      this.selectAnswer(value, data);
      if (data.no < this.input.length) {
        this.nextQuestion();
      } else {
        this.calculateAndSaveResult();
      }
    },

    nextQuestion() {
      const nextIndex = this.input.findIndex(
        (item) => item.no === this.numberQuestion
      );
      if (nextIndex !== -1) {
        this.numberQuestion = this.input[nextIndex].no;
      }
    },

    selectAnswer(value, data) {
      this.skor.push({ value, no: data.no });
      if (data.no < 5) {
        this.numberQuestion = data.no + 1;
      } else {
        this.calculateAndSaveResult();
      }
    },

    previous() {
      this.skor.pop();
      let numberCurrent = this.numberQuestion - 1;
      const indexQustionCurrent = this.input.findIndex(
        (data) => data.no === numberCurrent
      );
      this.input[indexQustionCurrent].inputValue = "";
      return this.numberQuestion--;
    },

    nextPrevious(select, no) {
      this.skor.push({ value: select, no });
      return this.numberQuestion++;
    },

    findQuestion(datas, id) {
      const result = datas.filter((data) => data.no === id);
      return result;
    },

    calculateAndSaveResult: function () {
      const targetMoney = parseFloat(this.input[0].inputValue);
      const targetYear = parseFloat(this.input[1].inputValue);
      const initialMoney = parseFloat(this.input[2].inputValue);
      const investment = parseFloat(this.input[3].inputValue);
      const interest = parseFloat(this.input[4].inputValue);
      const investmentPeriod = this.input[5].investment_periode;

      const investInterest = investment * interest;
      const investTotal = initialMoney + investInterest;
      const recommendationTotal = targetMoney - investTotal;

      const output = {
        invest_total: investTotal,
        invest_primary: initialMoney,
        invest_interest: investInterest,
        success: recommendationTotal >= 0 ? 1 : 0,
        recommendation_year: targetYear,
        recommendation_total: recommendationTotal,
        recommendation_primary: recommendationTotal,
        recommendation_interest: 0,
        investment_period: investmentPeriod,
      };

      this.calculatorBody.output = JSON.stringify(output);
      this.calculateAndSaveResultToAPI();
    },

    setIDuser: function () {
      const user = this.$utils.getUser();
      if (user) {
        this.calculatorBody.id_user = user.id;
      } else this.calculatorBody.id_user = 1;
    },

    getFreePackage: function () {
      this.$router.push({
        path: "/free/package/e-learning",
      });
    },
  },

  created() {},

  computed: {
    inputQuestions() {
      const filterQuestion = this.findQuestion(this.input, this.numberQuestion);
      return filterQuestion;
    },

    calculateSkor() {
      const targetMoney = parseFloat(this.input[0].inputValue);
      const recommendationTotal = parseFloat(
        this.calculateAndSaveResult().recommendation_total
      );

      const investmentPeriod = this.input[5].investment_periode;

      if (targetMoney < recommendationTotal && recommendationTotal >= 0) {
        return `Hasil sesuai dengan rencana. Tempo investasi: ${investmentPeriod}.`;
      } else {
        return `Hasil rencana Anda tidak sesuai. Tempo investasi: ${investmentPeriod}.`;
      }
    },
  },

  data() {
    return {
      cobain: null,
      calculatorBody: {
        input: [],
        output: "",
        type: "calculator_investment",
        id_user: 1,
      },
      skor: [],
      invesment: {},
      numberQuestion: 1,
      showNPS: false,
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
          interest: null,
          addClass: "add-effect-fade",
          question: "Imbal hasil yang diharapkan / tahun?",
        },
        {
          no: 6,
          inputValue: "",
          investment_periode: "monthly",
          addClass: "add-effect-fade",
          question: "Tempo waktu Anda dalam investasi",
        },
      ],
    };
  },

  watch: {
    "skor.length"(newSkor, oldSkor) {
      if (this.skor.length <= 6) {
        if (this.$refs.content_question.length !== 0) {
          if (
            this.$refs.content_question[0].classList.contains("add-effect-fade")
          ) {
            this.$refs.content_question[0].classList.remove("add-effect-fade");
            setTimeout(() => {
              this.$refs.content_question[0].classList.add("add-effect-fade");
            }, 10);
          }
        }
      } else {
        this.calculateAndSaveResult();
      }
    },

    numberQuestion: function (newValue) {
      if (newValue > 6) {
        this.showNPS = true;
      }
    },
  },
});
</script>
