<template>
  <q-card>
    <div class="content-header">
      <h1 class="--title text-primary q-mt-none q-mb-md text-bold">
        Aturan 50/30/20
      </h1>
      <p>
        Cari tahu bagaimana pendekatan penganggaran ini berlaku untuk uang Anda.
      </p>
      <hr/>
    </div>
    <div>
      <div class="q-mb-sm">Pemasukan bulanan setelah pajak</div>
      <div class="row justify-start">
        <q-input
          outlined
          dense
          class="col-4"
          style="max-width: 200px; font-size: 16px; min-width: 170px"
          v-model="form.salary"
          for="input-salary"
        >
          <template v-slot:prepend> Rp </template>
        </q-input>
        <q-btn
            v-if="form.salaryInt > 0"
            push no-caps
            class="btn-sm gtm-track"
            color="primary"
            label="Hitung"
            style="max-width: 100px; margin-left: 8px"
            @click="calculateAndSaveResult"
            gtm-action="btn_calculator_503020_calculate"/>
      </div>
      <div class="q-my-md" style="font-size: 18px; font-weight: 700">
        Berikut hitungan 50/30/20 milik kamu
      </div>
      <h5 class="text-uppercase q-mb-xs">Kebutuhan Pokok (50%)</h5>
      <h2 class="q-mb-md">Rp {{ result.fifty }}</h2>
      <h5 class="text-uppercase q-mb-xs">Keinginan (30%)</h5>
      <h2 class="q-mb-md">Rp {{ result.thirty }}</h2>
      <h5 class="text-uppercase q-mb-xs">
        Tabungan dan Pembayaran Utang (20%)
      </h5>
      <h2 class="q-mb-md">Rp {{ result.twenty }}</h2>
    </div>
    <hr />
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
        no-caps push
        color="secondary"
        class="text-black q-px-md gtm-track btn-medium"
        label="Mulai Sekarang"
        @click="getFreePackage"
        gtm-action="btn_free_get_calculator_503020"
      />
    </div>
  </q-card>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      form: {
        salary: 0,
        salaryInt: 0,
      },
      calculatorBody: {
        input: "",
        output: "",
        type: "calculator_503020"
      },
      result: {
        fifty: "-",
        thirty: "-",
        twenty: "-",
      },
    };
  },

  methods: {
    getPercentage: function (percentage) {
      return Math.round(
        (this.form.salaryInt * percentage) / 100
      ).toLocaleString();
    },

    calculateAndSaveResult: function () {
      this.$services.calculator.add(
        this.calculatorBody,
        (data) => {},
        () => {},
        () => {}
      );
      this.result.fifty = this.getPercentage(50);
      this.result.thirty = this.getPercentage(30);
      this.result.twenty = this.getPercentage(20);
      this.$emit("calculated");
    },

    getFreePackage: function () {
      this.$router.push({
        path: "/free/package/e-learning",
      });
    },
  },

  watch: {
    "form.salary": function (newVal) {
      if (newVal) {
        const money = parseInt(newVal.replaceAll(/[,.]/g, ""));
        const value = money.toLocaleString();
        if (money > 0) {
          this.form.salary = value;
          this.form.salaryInt = money;
          this.calculatorBody.input = JSON.stringify({ pemasukan: +money });
          this.calculatorBody.output = JSON.stringify({
            pokok: Math.round((money * 50) / 100),
            keinginan: Math.round((money * 30) / 100),
            utang: Math.round((money * 20) / 100),
          });
          return;
        }
      }

      this.form.salary = 0;
      this.form.salaryInt = 0;
    },
  },
});
</script>
