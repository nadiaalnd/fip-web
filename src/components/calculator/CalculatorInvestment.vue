<template>
  <q-card id="invest-calculator" class="q-px-lg q-py-sm full-width q-mb-lg">
    <div class="content-header">
      <h1 class="text-primary q-mt-none q-mb-md text-bold">
        Kalkulator Investasi
      </h1>
    </div>
    <!-- Recommendation -->
    <div v-if="isShowRecommendation">
      <div>
        <div class="q-mb-md f-text-highlighted">Strategi Investasi Anda</div>
        <div class="q-my-sm">
          <div class="f-text">NOMINAL UANG RENCANA ANDA</div>
          <div class="f-text-highlighted">
            {{ formatCurrency(calculatorBody.input[0]) }}
          </div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">UANG ANDA SAAT INI</div>
          <div class="f-text-highlighted">
            Rp {{ formatCurrency(calculatorBody.input[2]) }}
          </div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">JUMLAH INVESTASI / BULAN</div>
          <div class="f-text-highlighted">
            Rp {{ formatCurrency(calculatorBody.input[3]) }}
          </div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">RETURN PRODUK INVESTASI / TAHUN</div>
          <div class="f-text-highlighted">{{ calculatorBody.input[5] }} %</div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">JANGKA WAKTU INVESTASI</div>
          <div class="row">
            <div
              class="f-text-highlighted"
              style="color: red; text-decoration: line-through"
            >
              {{ calculatorBody.input[1] }} Tahun
            </div>
            <i class="material-icons arrow-right-ic">arrow_right</i>
            <div class="f-text-highlighted" style="color: green">
              {{ calculatorBody.input[1] }} Tahun
            </div>
          </div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">HASIL INVESTASI</div>
          <div class="row q-gutter-sm justify-start">
            <i class="material-icons arrow-drop-ic">arrow_drop_down_circle</i>
            <div class="f-text-highlighted">Rp {{ result.invest_total }}</div>
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
              {{
                ((result.invest_primary / result.invest_total) * 100).toFixed(
                  2
                )
              }}%
            </q-chip>
          </div>
          <div class="f-text">BUNGA INVESTASI</div>
          <div class="row justify-start">
            <div class="point-circle f-text-highlighted">
              Rp {{ result.invest_interest }}
            </div>
            <q-chip
              class="text-bold"
              square
              size="sm"
              color="green"
              text-color="white"
            >
              {{
                ((result.invest_interest / result.invest_total) * 100).toFixed(
                  2
                )
              }}%
            </q-chip>
          </div>
        </div>
        <img
          src="/images/illustration/ill-invest-failed.png"
          alt="Invest Failed"
          style="max-width: 540px"
        />
      </div>
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
    <div v-if="isShowResult">
      <div>
        <div class="q-mb-md f-text-highlighted">Strategi Investasi Anda</div>
        <div class="q-my-sm">
          <div class="f-text">NOMINAL UANG RENCANA ANDA</div>
          <div class="f-text-highlighted">
            {{ formatCurrency(calculatorBody.input[0]) }}
          </div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">UANG ANDA SAAT INI</div>
          <div class="f-text-highlighted">
            Rp {{ formatCurrency(calculatorBody.input[2]) }}
          </div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">JUMLAH INVESTASI / BULAN</div>
          <div class="f-text-highlighted">
            Rp {{ formatCurrency(calculatorBody.input[3]) }}
          </div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">RETURN PRODUK INVESTASI / TAHUN</div>
          <div class="f-text-highlighted">{{ calculatorBody.input[5] }} %</div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">JANGKA WAKTU INVESTASI</div>
          <div class="f-text-highlighted">
            {{ calculatorBody.input[1] }} Tahun
          </div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">HASIL INVESTASI</div>
          <div class="row q-gutter-sm justify-start">
            <i class="material-icons arrow-drop-ic">arrow_drop_down_circle</i>
            <div class="f-text-highlighted">Rp {{ result.invest_total }}</div>
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
              {{
                ((result.invest_primary / result.invest_total) * 100).toFixed(
                  2
                )
              }}%
            </q-chip>
          </div>
          <div class="f-text">BUNGA INVESTASI</div>
          <div class="row justify-start">
            <div class="point-circle f-text-highlighted">
              Rp {{ result.invest_interest }}
            </div>
            <q-chip
              class="text-bold"
              square
              size="sm"
              color="green"
              text-color="white"
            >
              {{
                ((result.invest_interest / result.invest_total) * 100).toFixed(
                  2
                )
              }}%
            </q-chip>
          </div>
        </div>
        <img
          src="/images/illustration/ill-invest-success.png"
          alt="Invest Success"
          style="max-width: 540px"
        />
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
    <div v-if="!isShowResult && !isShowRecommendation">
      <div
        class="q-mb-md"
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
            @input="formatInputValue"
            ><template v-slot:prepend> Rp </template>
          </q-input>
        </div>
        <div
          class="q-mt-md text-bold q-gutter-sm q-py-xs"
          v-else-if="index == 4"
        >
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
      <div v-if="showButton">
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
    </div>
    <hr />
    <section class="q-py-md">
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
    </section>
  </q-card>
</template>

<script>
import { debounce } from "quasar";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      showButton: false,
      isShowResult: false,
      isShowRecommendation: false,
      result: {},
      calculatorBody: {
        input: [],
        output: "",
        type: "calculator_investment",
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
      this.isShowResult = false;
      this.isShowRecommendation = true;
    },

    resetQuestion() {
      this.input.forEach((data, idx) => {
        data.inputValue = "";
      });
      this.numberQuestion = 0;
      this.isShowResult = false;
      this.isShowRecommendation = false;
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

    formatCurrency(value) {
      return value.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    },

    formatInputValue() {
      const value = this.question.inputValue.replace(/[^\d]/g, "");
      const formattedValue = parseInt(value, 10).toLocaleString("id-ID");
      this.question.inputValue = formattedValue;
    },

    calculateAndSaveResult: function () {
      this.showResult = true;
      this.calculatorBody.input = JSON.stringify(this.form);
      this.calculatorBody.output = JSON.stringify(this.result);
      this.$services.calculator.add(
        this.calculatorBody,
        (data) => {},
        () => {},
        () => {}
      );
    },

    calculateResult() {
      const target_money = parseFloat(this.calculatorBody.input[0]);
      const target_year = parseInt(this.calculatorBody.input[1]);
      const initial_money = parseFloat(this.calculatorBody.input[2]);
      const investment = parseFloat(this.calculatorBody.input[3]);
      const investment_periode = this.calculatorBody.input[4];
      const interest = parseFloat(this.calculatorBody.input[5]);

      let temp_money = initial_money;
      let isSuccess = false;
      let invest_total = 0;

      for (
        let i = 0;
        i < (investment_periode === "monthly" ? target_year * 12 : target_year);
        i++
      ) {
        temp_money =
          investment_periode === "annually"
            ? this.calculateMoneyByYear(temp_money, investment)
            : this.calculateMoneyByMonth(temp_money, investment);

        let tmp = this.getReturnOnInvestment(temp_money, interest);
        temp_money += tmp;
        invest_total += tmp;
      }

      isSuccess = temp_money >= target_money ?? false;
      let results = {
        invest_total: temp_money,
        invest_primary: temp_money - invest_total,
        invest_interest: invest_total,
        success: isSuccess,
      };

      if (!isSuccess) {
        const recommendation = this.gettingRecommendationYearInvestment(
          target_money,
          initial_money,
          investment_periode,
          investment,
          interest
        );
        results = {
          ...results,
          reccomendation_year: recommendation.recommendation_year,
          recommendation_total: Math.round(recommendation.invest_total),
          recommendation_primary: Math.round(recommendation.invest_primary),
          recommendation_interest: Math.round(recommendation.invest_interest),
        };
      }
      results.invest_total = Math.round(results.invest_total);
      results.invest_interest = Math.round(results.invest_interest);
      results.invest_primary = Math.round(results.invest_primary);
      this.result = results;
      this.isShowResult = true;
    },

    gettingRecommendationYearInvestment(
      target_money,
      initial_money,
      investment_periode,
      investment,
      interest
    ) {
      let temp_money = initial_money;
      let isSuccess = false;
      let invest_total = 0;
      let year = 0;

      while (!isSuccess) {
        temp_money =
          investment_periode === "annually"
            ? this.calculateMoneyByYear(temp_money, investment)
            : this.calculateMoneyByMonth(temp_money, investment);

        let tmp = this.getReturnOnInvestment(temp_money, interest);
        temp_money += tmp;
        invest_total += tmp;
        year++;
        isSuccess = temp_money >= target_money ?? false;
      }

      return {
        recommendation_year: this.monthToYear(year, investment_periode),
        invest_total: temp_money,
        invest_interest: invest_total,
        invest_primary: temp_money - invest_total,
      };
    },

    fillMoney(amount) {
      this.input[0].inputValue = amount;
      this.handleInput(0);
    },
    monthToYear(month, type = "annually") {
      return type === "monthly" ? month / 12 : month;
    },
    calculateMoneyByYear(init_money, investment) {
      return investment * 12 + init_money;
    },
    calculateMoneyByMonth(init_money, investment) {
      return investment + init_money;
    },
    getReturnOnInvestment(init_money, interest) {
      return init_money * (interest / 100);
    },
  },

  computed: {
    visibleQuestions() {
      return this.input.slice(0, this.numberQuestion + 1);
    },
  },
});
</script>
