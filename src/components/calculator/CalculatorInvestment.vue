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
        <h2 class="q-mb-md f-text-highlighted">Strategi Investasi Anda</h2>
        <div class="q-my-sm">
          <div class="f-text">NOMINAL UANG RENCANA ANDA</div>
          <div class="f-text-highlighted">
            {{ calculatorBody.input[0] }}
          </div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">UANG ANDA SAAT INI</div>
          <div class="f-text-highlighted">
            {{ formatCurrency(calculatorBody.input[2]) }}
          </div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">JUMLAH INVESTASI / {{ investmentUnit }}</div>
          <div class="f-text-highlighted">
            {{ formatCurrency(calculatorBody.input[3]) }}
          </div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">RETURN PRODUK INVESTASI / TAHUN</div>
          <div class="f-text-highlighted">{{ calculatorBody.input[5] }} %</div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">JANGKA WAKTU INVESTASI</div>
          <div class="row">
            <div class="f-text-highlighted" style="color: red; text-decoration: line-through">
              {{ calculatorBody.input[1] }} Tahun
            </div>
            <i class="material-icons arrow-right-ic">arrow_right</i>
            <div class="f-text-highlighted" style="color: #00a167">
              {{ result.recommendation_year }} Tahun
            </div>
          </div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">HASIL INVESTASI</div>
          <div class="row q-gutter-sm justify-start">
            <i class="material-icons arrow-drop-ic">arrow_drop_down_circle</i>
            <div class="f-text-highlighted">
              {{ formatCurrency(result.recommendation_total) }}
            </div>
          </div>
        </div>
        <div class="q-my-sm invest-result">
          <div class="f-text point-circle">POKOK INVESTASI</div>
          <div class="row justify-start">
            <div class="f-text-highlighted">
              {{ formatCurrency(result.recommendation_primary) }}
            </div>
            <q-chip class="text-bold" square size="sm" color="primary" text-color="white">
              {{
                (
                  (result.recommendation_primary /
                    result.recommendation_total) *
                  100
                ).toFixed(2)
              }}%
            </q-chip>
          </div>
          <div class="f-text">BUNGA INVESTASI</div>
          <div class="row justify-start">
            <div class="point-circle f-text-highlighted">
              {{ formatCurrency(result.recommendation_interest) }}
            </div>
            <q-chip class="text-bold" square size="sm" color="green" text-color="white">
              {{
                (
                  (result.recommendation_interest /
                    result.recommendation_total) *
                  100
                ).toFixed(2)
              }}%
            </q-chip>
          </div>
        </div>
        <div class="ill-failed q-my-lg">
          <div class="content-wrapper">
            <div class="text-content">
              <h2 class="text-title" style="color: white">
                Bedah Hasil Rencana Kamu
              </h2>
              <p class="f-text-body" style="color: white">
                Yahh, hasil rencana kamu belum cocok untuk mencapai tujuanmu.
                Silakan lihat rekomendasi dari kami.
              </p>
            </div>
            <div class="image-content">
              <img src="/images/illustration/ill-invest-failed.png" alt="Invest Failed" />
            </div>
          </div>
        </div>
      </div>
      <q-btn class="text-bold q-py-sm full-width q-mb-md" outline rounded no-caps @click="resetQuestion"
        text-color="dark">
        Hitung Ulang
      </q-btn>
    </div>
    <div v-if="isShowResult">
      <div>
        <div class="q-mb-md f-text-title">Strategi Investasi Anda</div>
        <div class="q-my-sm">
          <div class="f-text">NOMINAL UANG RENCANA ANDA</div>
          <div class="f-text-highlighted">
            {{ formatCurrency(calculatorBody.input[0]) }}
          </div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">UANG ANDA SAAT INI</div>
          <div class="f-text-highlighted">
            {{ formatCurrency(calculatorBody.input[2]) }}
          </div>
        </div>
        <div class="q-my-sm">
          <div class="f-text">JUMLAH INVESTASI / {{ investmentUnit }}</div>
          <div class="f-text-highlighted">
            {{ formatCurrency(calculatorBody.input[3]) }}
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
            <div class="f-text-highlighted">
              {{ formatCurrency(result.invest_total) }}
            </div>
          </div>
        </div>
        <div class="q-my-sm invest-result">
          <div class="f-text point-circle">POKOK INVESTASI</div>
          <div class="row justify-start">
            <div class="f-text-highlighted">
              {{ formatCurrency(result.invest_primary) }}
            </div>
            <q-chip class="text-bold" square size="md" color="primary" text-color="white">
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
              {{ formatCurrency(result.invest_interest) }}
            </div>
            <q-chip class="text-bold" square size="md" color="green" text-color="white">
              {{
                ((result.invest_interest / result.invest_total) * 100).toFixed(
                  2
                )
              }}%
            </q-chip>
          </div>
        </div>
        <div v-if="result.success" class="ill-success q-my-lg">
          <div class="content-wrapper">
            <div class="text-content">
              <h2 class="text-title">
                Bedah Hasil Rencana Kamu
              </h2>
              <p class="text-detail">
                Yeayy, hasil rencana kamu cocok untuk mencapai tujuanmu
              </p>
            </div>
            <div class="image-content">
              <img src="/images/illustration/ill-invest-success.png" alt="Invest Success" />
            </div>
          </div>
        </div>
        <div v-else class="ill-failed q-my-lg">
          <div class="content-wrapper">
            <div class="text-content">
              <h2 class="text-title" style="color: white">
                Bedah Hasil Rencana Kamu
              </h2>
              <p class="text-detail" style="color: white">
                Yahh, hasil rencana kamu belum cocok untuk mencapai tujuanmu.
                Silakan lihat rekomendasi dari kami.
              </p>
            </div>
            <div class="image-content">
              <img src="/images/illustration/ill-invest-failed.png" alt="Invest Failed" />
            </div>
          </div>
        </div>
      </div>
      <q-btn v-if="!result.success" class="recom-btn text-bold q-py-sm full-width q-my-sm"
        outline rounded no-caps text-color="dark" @click="showRecommendation">
        Lihat Rekomendasi
      </q-btn>
      <q-btn class="text-bold q-py-sm full-width q-mb-md" outline rounded no-caps @click="resetQuestion"
        text-color="dark">
        Hitung Ulang
      </q-btn>
    </div>
    <div v-if="!isShowResult && !isShowRecommendation">
      <div class="q-mb-md" v-for="(question, index) in visibleQuestions" :key="index">
        <div class="q-mb-lg text-bold justify-start" v-if="index == 0">
          Jumlah uang yang ingin Anda capai
          <q-input outlined dense class="q-my-sm col-4" style="max-width: 200px; font-size: 16px; min-width: 170px"
            v-model="input[0].inputValue" @update:modelValue="handleInput(index), commasSeparator(index)">
            <template v-slot:prepend> Rp</template>
          </q-input>
          <div class="q-gutter-sm q-my-xs">
            <q-btn unelevated no-caps label="10 Juta" size="sm"
              style="border-radius: 4px; background: #f2f6f8; color: #3469a7" @click="fillMoney(10000000)"
              class="text-bold q-pa-xs btn-normal-b-radius"
            />
            <q-btn unelevated no-caps label="50 Juta" size="sm"
              style="border-radius: 4px; background: #f2f6f8; color: #3469a7" @click="fillMoney(50000000)"
              :style="{ background: buttonColor }"
              class="text-bold q-pa-xs btn-normal-b-radius"
            />
            <q-btn unelevated no-caps label="100 Juta" size="sm"
              style="border-radius: 4px; background: #f2f6f8; color: #3469a7" @click="fillMoney(100000000)"
              class="text-bold q-pa-xs btn-normal-b-radius"
            />
            <q-btn unelevated no-caps label="1 Milyar" size="sm"
              style="border-radius: 4px; background: #f2f6f8; color: #3469a7" @click="fillMoney(1000000000)"
              class="text-bold q-pa-xs btn-normal-b-radius"
            />
          </div>
        </div>
        <div class="q-mt-md" v-if="index == 1">
          <span class="text-bold">Berapa lama uang yang ingin Anda capai terkumpul</span>
          <div class="row justify-start">
            <q-input class="col-4 text-center" style="font-size: 20px; max-width: 60px; min-width: 30px"
              v-model="input[1].inputValue" @update:modelValue="handleInput(index)">
            </q-input>
            <span class="self-end q-mb-md q-ml-sm"
              style="font-size: 20px; margin-top: 30px; font-weight: normal;">Tahun</span>
          </div>
        </div>
        <div class="q-mt-md text-bold" v-if="index == 2">
          Uang yang Anda miliki sekarang
          <q-input outlined dense class="q-my-sm col-4" style="max-width: 200px; font-size: 16px; min-width: 170px"
            v-model="input[2].inputValue" @update:modelValue="handleInput(index), commasSeparator(index)">
            <template v-slot:prepend> Rp</template>
          </q-input>
        </div>
        <div class="q-mt-md text-bold" v-if="index == 3">
          Jumlah investasi Anda setiap bulan
          <q-input outlined dense class="q-my-sm col-4" style="max-width: 200px; font-size: 16px; min-width: 170px"
            v-model="input[3].inputValue" @update:modelValue="handleInput(index), commasSeparator(index)">
            <template v-slot:prepend> Rp</template>
          </q-input>
        </div>
        <div class="q-mt-md text-bold q-gutter-sm q-py-xs" v-else-if="index == 4">
          Tempo waktu Anda dalam investasi
          <div class="row justify-start">
            <q-radio size="xs" v-model="input[4].inputValue" val="monthly" label="Perbulan" style="margin-left: -15px"
              @update:modelValue="handleInput(index)" />
            <q-radio size="xs" v-model="input[4].inputValue" val="annually" label="Pertahun"
              @update:modelValue="handleInput(index)" />
          </div>
        </div>
        <div class="q-mt-md" v-else-if="index == 5">
          <span class="text-bold">Imbal hasil yang diharapkan / tahun?</span>
          <div class="row justify-start">
            <q-input class="q-mb-md col-4 text-bold text-center"
              style="max-width: 60px; font-size: 20px; font-weight:bold; min-width: 30px" v-model="input[5].inputValue"
              @update:modelValue="handleInput(index)">
            </q-input>
            <span class="q-ml-sm" style="font-size: 25px; margin-top: 30px">%</span>
          </div>
        </div>
      </div>
      <div v-if="showButton">
        <q-btn push no-caps class="btn-sm gtm-track q-mb-md" label="Lihat hasil rencana Anda" color="primary"
          gtm-action="btn_calculator_investment" @click="calculateAndSaveResult" />
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
      <q-btn no-caps push color="secondary" class="text-black q-px-md gtm-track btn-medium" label="Mulai Sekarang"
        @click="getFreePackage" gtm-action="btn_free_get_calculator_investment" />
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
      buttonColor: "#f2f6f8",
      calculatorBody: {
        input: [],
        output: "",
        type: "calculator_investment",
      },
      result: {
        invest_total: "",
        invest_primary: "",
        invest_interest: "",
        success: false,
        recommendation_year: 1,
        recommendation_total: "",
        recommendation_primary: "",
        recommendation_interest: "",
      },
      input: [
        {
          no: 1,
          inputValue: "",
          addClass: "add-effect-fade",
        },
        {
          no: 2,
          inputValue: "",
          addClass: "add-effect-fade",
        },
        {
          no: 3,
          inputValue: "0",
          addClass: "add-effect-fade",
        },
        {
          no: 4,
          inputValue: "0",
          addClass: "add-effect-fade",
        },
        {
          no: 5,
          inputValue: "",
          addClass: "add-effect-fade",
        },
        {
          no: 6,
          inputValue: "",
          addClass: "add-effect-fade",
        },
      ],
      numberQuestion: 0,
    };
  },

  methods: {
    getFreePackage() {
      this.$router.push({
        path: "/free/package/e-learning",
      });
    },
    commasSeparator(index) {
      const inputValue = parseInt(this.input[index].inputValue.replaceAll('.', '').replaceAll(',', ''));
      if (typeof inputValue === 'number' && !isNaN(inputValue)) {
        this.input[index].inputValue = Intl.NumberFormat('en-US').format(inputValue);
      } else {
        console.error('Nilai yang diberikan bukan merupakan nilai numerik yang valid.');
      }
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
    returningResult(result) {
      const commonData = {
        targetMoney: result.targetMoney,
        time: result.time,
        initialMoney: result.initialMoney,
        moneyInvestPerPeriod: result.moneyInvestPerPeriod,
        typeInvestment: result.typeInvestment,
        returnInvestment: result.returnInvestment,
        investmentProfit: result.result.investInterest,
      };

      if (result.isSuccess) {
        return {
          ...commonData,
          investmentResult: {
            isSuccess: result.isSuccess,
            totalMoney: result.result.totalMoney,
            majorInvestment: result.result.majorInvestment,
            investInterest: result.result.investInterest,
          },
        };
      }

      return {
        ...commonData,
        investmentResult: {
          isSuccess: result.isSuccess,
          totalMoney: result.result.totalMoney,
          majorInvestment: result.result.majorInvestment,
          investInterest: result.result.investInterest,
        },
        recommendation: {
          time: result.recommendation.time,
          totalMoney: result.recommendation.totalMoney,
          majorInvestment: result.recommendation.majorInvestment,
          investInterest: result.recommendation.investInterest,
        },
      };
    },
    handleInput: debounce(function (index) {
      console.log(`index: ${index}`);
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
      return "Rp " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    calculateAndSaveResult() {
      try{
        const mapData = {
          targetMoney: typeof this.calculatorBody.input[0] === 'string' ? parseFloat(this.calculatorBody.input[0].replaceAll('.', '').replaceAll(',', '')) : this.calculatorBody.input[0],
          time: this.calculatorBody.input[1],
          initialMoney: typeof this.calculatorBody.input[2] === 'string' ? parseFloat(this.calculatorBody.input[2].replaceAll('.', '').replaceAll(',', '')) : this.calculatorBody.input[2],
          moneyInvestPerPeriod: typeof this.calculatorBody.input[3] === 'string' ? parseFloat(this.calculatorBody.input[3].replaceAll('.', '').replaceAll(',', '')) : this.calculatorBody.input[3],
          typeInvestment: this.calculatorBody.input[4],
          returnInvestment: typeof this.calculatorBody.input[5] === 'string' ? parseFloat(this.calculatorBody.input[5]) : this.calculatorBody.input[5],
        };
        console.log("data map : ", mapData);
        const result = this.doCalculation(mapData);
        this.result.invest_total = result.investmentResult.totalMoney;
        this.result.invest_primary = result.investmentResult.majorInvestment;
        this.result.invest_interest = result.investmentResult.investInterest;
        this.result.success = result.investmentResult.isSuccess;
        if(!result.investmentResult.isSuccess || result.recommendation) {
          this.result.recommendation_year = parseInt(result.recommendation.time);
          console.log("recom time", this.result.recommendation_year)
          console.log("recom time : ", result.recommendation.time)
          this.result.recommendation_total = result.recommendation.totalMoney;
          this.result.recommendation_primary = result.recommendation.majorInvestment;
          this.result.recommendation_interest = result.recommendation.investInterest;
        }
        this.isShowResult = true;
        this.sendToAPI();
        console.log("result of calculation : ", result);
      }catch(e) {
        console.log("error : ", e);
        alert("something wrong, please try again");
      }
    },

    doCalculation(data) {
      const {
        targetMoney,
        time,
        initialMoney,
        moneyInvestPerPeriod,
        typeInvestment,
        returnInvestment
      } = data;

      const iteration = this.findTimeInvestment(typeInvestment, time);
      const returnInvestmentPerPeriod = this.findReturnInvestmentPerPeriod(typeInvestment, returnInvestment);
      const result = Math.floor(this.calculateInvestment(iteration, returnInvestmentPerPeriod, moneyInvestPerPeriod, initialMoney));

      const isSuccess = result >= targetMoney;
      console.log("isSuccess : ", isSuccess)
      const recommendation = isSuccess ? {} : this.findRecommendation(data);
      console.log("recommendation : ", recommendation)

      const majorInvestment = initialMoney + (moneyInvestPerPeriod * iteration);
      const investInterest = result - majorInvestment;
      const investmentProfit = result - initialMoney;

      return this.returningResult({
        targetMoney,
        time,
        initialMoney,
        moneyInvestPerPeriod,
        typeInvestment,
        returnInvestment,
        isSuccess,
        result: {
          totalMoney: result,
          majorInvestment,
          investInterest,
          investmentProfit,
        },
        recommendation,
      });
    },
    sendToAPI() {
      var dataSendAPI = {
        input: JSON.stringify(this.input),
        output: JSON.stringify(this.result),
        type: this.calculatorBody.type,
      };
      console.log("toJson : ", dataSendAPI);
      this.$services.calculator.add(
        dataSendAPI,
        (data) => {
        },
        () => {
        },
        () => {
        }
      );
      this.isShowResult = true;
    },
    fillMoney(amount) {
      this.input[0].inputValue = Intl.NumberFormat('en-US').format(amount);
      this.handleInput(0);
      this.buttonColor = "#3469a7";
    },
    findTimeInvestment(type, time) {
      return type === 'monthly' ? time * 12 : time;
    },
    findReturnInvestmentPerPeriod(type, returnInvestment) {
      return type === 'monthly' ? returnInvestment / 12 : returnInvestment;
    },
    findReturnPerPeriod(returnPeriod, moneyInvestment) {
      return moneyInvestment * (returnPeriod / 100);
    },
    calculateInvestment(iteration, returnInvestmentPerPeriod, moneyInvestPerPeriod, initialMoney) {
      if (iteration === 0) return initialMoney;
      let temp = 0;
      for (let i = 0; i < iteration; i++) {
        if (i === 0) {
          temp = initialMoney + moneyInvestPerPeriod + this.findReturnPerPeriod(returnInvestmentPerPeriod, initialMoney + moneyInvestPerPeriod);
        } else {
          temp = temp + moneyInvestPerPeriod + this.findReturnPerPeriod(returnInvestmentPerPeriod, temp + moneyInvestPerPeriod);
        }
      }
      return temp;
    },
    findRecommendation(data) {
      const {
        targetMoney,
        initialMoney,
        moneyInvestPerPeriod,
        typeInvestment,
        returnInvestment
      } = data;

      let year = 0;
      let temp = 0;
      let totalMoney = 0;
      let majorInvestment = 0;
      let investInterest = 0;
      let isSuccess = false;

      while (!isSuccess) {
        year++;
        temp = this.calculateInvestment(this.findTimeInvestment(typeInvestment, year), this.findReturnInvestmentPerPeriod(typeInvestment, returnInvestment), moneyInvestPerPeriod, initialMoney);
        isSuccess = temp >= targetMoney;
        totalMoney = temp;
        majorInvestment = initialMoney + (moneyInvestPerPeriod * this.findTimeInvestment(typeInvestment, year));
        investInterest = totalMoney - majorInvestment;
        console.log("year : ", year);
      }

      return {
        time: year,
        totalMoney: Math.floor(totalMoney),
        majorInvestment: Math.floor(majorInvestment),
        investInterest: Math.floor(investInterest),
      };
    },
  },

  computed: {
    visibleQuestions() {
      return this.input.slice(0, this.numberQuestion + 1);
    },
    investmentUnit() {
      return this.input[4].inputValue === "monthly" ? "BULAN" : "TAHUN";
    },
    autoCommaseparator(input) {
      return input.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    },
  },
});
</script>
