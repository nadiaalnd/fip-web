<template>
  <div class="q-px-md q-mb-lg col-12 col-md-6">
    <q-card class="q-pa-md full-width">
      <div class="content-header">
        <h1 class="text-primary q-mt-none q-mb-md text-bold">
          Kalkulator Investasi
        </h1>
      </div>
      <div>
        <div>
          <div class="q-mb-sm text-weight-bold">
            Jumlah uang yang ingin Anda capai
            <div class="row justify-start">
              <q-input
                outlined
                dense
                class="q-mb-md col-4 target_money"
                style="max-width: 200px; font-size: 16px; min-width: 170px"
                v-model="form.target_money"
              >
                <template v-slot:prepend> Rp </template>
              </q-input>
            </div>
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

          <div class="q-mb-sm text-weight-bold">
            Berapa lama uang yang ingin Anda capai terkumpul
            <div class="row justify-start">
              <q-input
                class="q-mb-lg col-4 target_year text-center"
                style="max-width: 60px; font-size: 20px; min-width: 30px"
                v-model="form.target_year"
              >
              </q-input>
              <span
                class="self-end q-mb-md q-ml-sm"
                style="font-size: 20px; font-weight: normal"
                >Tahun</span
              >
            </div>
          </div>

          <div class="q-mb-sm text-weight-bold">
            Uang yang Anda miliki sekarang
            <div class="row justify-start">
              <q-input
                outlined
                dense
                class="q-mb-lg col-4"
                style="max-width: 200px; font-size: 16px; min-width: 170px"
                v-model="form.initial_money"
              >
                <template v-slot:prepend> Rp </template>
              </q-input>
            </div>
          </div>

          <div class="q-mb-sm text-weight-bold">
            Jumlah investasi Anda setiap bulan
            <div class="row justify-start">
              <q-input
                outlined
                dense
                class="q-mb-lg col-4"
                style="max-width: 200px; font-size: 16px; min-width: 170px"
                v-model="form.investment"
              >
                <template v-slot:prepend> Rp </template>
              </q-input>
            </div>
          </div>
          <div class="q-mb-lg text-weight-bold">
            Tempo waktu Anda dalam investasi
            <div class="q-gutter-sm q-py-xs text-weight-bold">
              <q-radio
                size="xs"
                v-model="formInvestmentPeriode"
                val="monthly"
                label="perbulan"
                style="margin-left: 0px"
              />
              <q-radio
                size="xs"
                v-model="formInvestmentPeriode"
                val="annually"
                label="pertahun"
              />
            </div>
          </div>

          <div class="q-mb-lg text-weight-bold">
            Imbal hasil yang diharapkan / tahun
            <div class="row justify-start">
              <q-input
                class="col-4 interest text-center"
                style="max-width: 60px; font-size: 20px; min-width: 30px"
                v-model="form.interest"
              >
              </q-input>
              <span
                class="self-end q-ml-sm"
                style="font-size: 30px; font-weight: normal"
                >%</span
              >
            </div>
          </div>

          <div v-if="!showResult">
            <q-btn
              push
              no-caps
              class="btn-sm gtm-track q-mb-md"
              color="primary"
              label="Lihat hasil rencana Anda"
              :disable="form.target_money == 0 || form.interest == 0"
              @click="calculateAndSaveResult"
              gtm-action="btn_calculator_investment_calculate"
            />
          </div>
          <hr />
          <section v-if="showResult">
            <!-- Display Input Summary -->
            <div>
              <h5 class="f-text-title">Strategi Investasi Anda</h5>
              <div class="q-my-sm">
                <div class="f-text">NOMINAL UANG RENCANA ANDA</div>
                <div class="f-text-highlighted">Rp {{ form.target_money }}</div>
              </div>
              <div class="q-my-sm">
                <div class="f-text">UANG ANDA SAAT INI</div>
                <div class="f-text-highlighted">
                  Rp {{ form.initial_money }}
                </div>
              </div>
              <div class="q-my-sm">
                <div class="f-text">JUMLAH INVESTASI /BULAN</div>
                <div class="f-text-highlighted">Rp {{ form.investment }}</div>
              </div>
              <div class="q-my-sm">
                <div class="f-text">RETURN PRODUK INVESTASI / TAHUN</div>
                <div class="f-text-highlighted">{{ form.interest }} %</div>
              </div>
              <div class="q-my-sm">
                <div class="f-text">JANGKA WAKTU INVESTASI / TAHUN</div>
                <div class="f-text-highlighted">
                  {{ form.target_year }} Tahun
                </div>
              </div>
            </div>
            <div>
              <!-- ... Display Additional Calculated Results ... -->
              <div class="q-mb-md">
                <div class="f-text">HASIL INVESTASI POKOK</div>
                <div class="f-text-highlighted">
                  {{ calculatedResults.invest_primary }}
                </div>
              </div>
              <!-- Display Total Hasil Investasi -->
              <div class="q-mb-md">
                <div class="f-text">POKOK INVESTASI</div>
                <div class="f-text-highlighted">
                  {{ calculatedResults.invest_total }}
                </div>
              </div>
              <!-- Display Laba Investasi -->
              <div class="q-mb-md">
                <div class="f-text">BUNGA INVESTASI</div>
                <div class="f-text-highlighted">
                  {{ calculatedResults.invest_interest }}
                </div>
              </div>
              <!-- Display Rekomendasi -->
              <div class="q-mb-md">
                <div class="f-text">REKOMENDASI</div>
                <div class="f-text-highlighted">
                  {{ calculatedResults.recomendation_total }}
                </div>
              </div>
            </div>
            <div>
              <q-btn
                push
                no-caps
                class="btn-sm gtm-track q-mb-md"
                color="primary"
                label="Hitung Ulang"
                @click="resetFormAndResults"
                gtm-action="btn_reset_and_calculate_again"
              />
            </div>
          </section>
        </div>
      </div>
      <div class="q-pt-md">
        <h1 class="--title text-primary q-mt-none q-mb-md text-bold">
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
          gtm-action="btn_free_get_calculator_503020"
        />
      </div>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {
      formInvestmentPeriode: ref("monthly"),
    };
  },
  data() {
    return {
      showResult: false,
      showRecommendation: false,
      setting: null,
      formType: {
        type: "Bulan",
        month: 0,
        year: 0,
      },
      products: [],
      form: {
        target_money: 0,
        target_year: null,
        initial_money: 0,
        investment: 0,
        investment_periode: "monthly",
        interest: null,
      },
      calculatorBody: {
        input: "",
        output: "",
        type: "calculator_investment",
      },
      calculatedResults: {
        invest_total: "",
        invest_interest: "",
        recomendation_total: "",
        invest_primary: "",
        success: 0,
        reccomendation_year: "",
        recommendation_primary: "",
        recommendation_interest: "",
      },
    };
  },

  computed: {
    result() {
      const investmentAmount = parseFloat(
        this.form.investment.replaceAll(/[^\d.]/g, "")
      );
      const annualInterest = parseFloat(this.form.interest);
      const targetYear = parseInt(this.form.target_year);
      let labaInvestasi = 0;
      let totalHasilInvestasi = investmentAmount;

      for (let year = 1; year <= targetYear; year++) {
        labaInvestasi += investmentAmount * (annualInterest / 100);
        totalHasilInvestasi += investmentAmount + labaInvestasi;
      }

      let rekomendasi = this.form.target_money - totalHasilInvestasi;
      let success = 0;
      let reccomendation_year = "";

      if (this.form.investment_periode === "annually") {
        for (let year = targetYear + 6; year <= targetYear + 10; year++) {
          rekomendasi += targetYear;
        }
        success = rekomendasi >= 0 ? 1 : 0;
        reccomendation_year = targetYear + 6;
      }

      return {
        invest_interest: `Rp. ${labaInvestasi.toLocaleString("id-ID")}`,
        invest_total: `Rp. ${totalHasilInvestasi.toLocaleString("id-ID")}`,
        recomendation_total: `Rp. ${rekomendasi.toLocaleString("id-ID")}`,
        invest_primary: `Rp. ${totalHasilInvestasi.toLocaleString("id-ID")}`,
        success,
        reccomendation_year,
        recommendation_primary: `Rp. ${rekomendasi.toLocaleString("id-ID")}`,
        recommendation_interest: `${reccomendation_year}`,
      };
    },
  },

  mounted() {
    this.getProducts();
  },

  methods: {
    fillTargetMoney(amount) {
      this.form.target_money = amount;
    },
    // get products / products
    getProducts() {
      this.$services.product.get(
        {
          tag: "Kalkulator Investasi",
        },
        (data) => {
          this.products = data;
        },
        (msg, errors) => {},
        () => {}
      );
    },

    getFreePackage: function () {
      this.$router.push({
        path: "/free/package/e-learning",
      });
    },

    formatRupiah: (money) => {
      return new Intl.NumberFormat("id-ID", {
        currency: "IDR",
        minimumFractionDigits: 0,
      })
        .format(money)
        .toString();
    },

    getPercentage: function (percentage) {
      return Math.round(
        (this.form.interest * percentage) / 100
      ).toLocaleString();
    },

    calculateAndSaveResult: function () {
      this.calculateResults();
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

    calculateAndShowResult: function () {
      this.calculateResults();
      this.showResult = true;
    },

    resetFormAndResults: function () {
      this.showResult = false;
      this.resetForm();
    },

    calculateResults() {
      if (
        this.form.target_money &&
        this.form.target_year &&
        this.form.initial_money &&
        this.form.investment &&
        this.form.interest
      ) {
        const investmentAmount = parseFloat(
          this.form.investment.replaceAll(/[^\d.]/g, "")
        );
        const annualInterest = parseFloat(this.form.interest) / 100;
        const targetYear = parseInt(this.form.target_year);

        // Calculate invest_primary and invest_interest based on target_year
        const invest_primary = investmentAmount * targetYear;
        const invest_interest = invest_primary * annualInterest * targetYear;

        // Calculate futureValue
        const futureValue = invest_primary + invest_interest;

        // Calculate recommendation_total
        const recommendation_total = this.form.target_money - futureValue;

        this.calculatedResults.invest_total = futureValue;
        this.calculatedResults.invest_primary = invest_primary;
        this.calculatedResults.invest_interest = invest_interest;
        this.calculatedResults.success = recommendation_total >= 0 ? 1 : 0;
        this.calculatedResults.reccomendation_year = targetYear;
        this.calculatedResults.recommendation_total = recommendation_total;
        this.calculatedResults.recommendation_primary =
          recommendation_total + invest_primary;
        this.calculatedResults.recommendation_interest = invest_interest;

        this.showResult = true;
      }
    },
  },

  watch: {
    formInvestmentPeriode: function (newVal) {
      this.showResult = false;
    },
    "form.target_money": function (newVal, oldVal) {
      this.calculateResults();
    },
    "form.target_year": function (newVal, oldVal) {
      this.calculateResults();
    },
    "form.initial_money": function (newVal) {
      this.calculateResults();
    },
    "form.investment": function (newVal) {
      this.calculateResults();
    },
    "form.interest": function (newVal) {
      this.calculateResults();
    },
  },
});
</script>
