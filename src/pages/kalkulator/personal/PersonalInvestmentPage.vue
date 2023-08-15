<template>
  <div>
    <section class="container row no-wrap q-pt-lg relative-position">
      <div
        class="absolute-top"
        style="
          background-image: url(/images/bg-achiev.svg);
          transform: rotate(-20deg) translate(30%, 10%);
          right: 50%;
          background-repeat: no-repeat;
          background-size: cover;
          width: 369px;
          height: 366.15px;
          z-index: -1;
        "
      ></div>

      <div
        class="absolute-bottom-right"
        style="
          background-image: url(/images/bg-keunggulan.svg);
          background-repeat: no-repeat;
          background-size: cover;
          width: 487px;
          height: 458px;
          bottom: -10%;
          z-index: -1;
        "
      ></div>

      <div class="q-px-md q-mb-lg content-article col-12 col-md-6">
        <h1 class="f-text-title">Capai Tujuan Investasi Anda</h1>
        <p class="f-text-body text-justify">
          Investasi merupakan aktivitas dimana kita menaruhkan sejumlah uang
          atau modal yang kita miliki dalam jangka waktu tertentu untuk mencapai
          tujuan keuangan dan mendapatkan return dalam jumlah tertentu. Namun,
          dalam menentukan dan mencapai tujuan investasi, seringkali muncul
          beberapa permasalahan yang perlu diatasi oleh investor, seperti belum
          jelasnya dari tujuan investasi, berapa imbal return yang dihasilkan
          dari investasi, sampai dalam jangka waktu berapa mau investasipun
          masih belum jelas. Kalkulator investasi sebagai jawaban yang tepat
          bagi investor yang terkendala dalam mencapai tujuan investasinya.
        </p>
        <h2 class="f-text-highlighted">Jadi apa itu kalkulator Investasi?</h2>
        <p class="f-text-body text-justify">
          Kalkulator investasi merupakan alat bantu yang digunakan untuk
          menghitung berbagai aspek investasi, seperti perkiraan nilai investasi
          di masa depan, pengembalian investasi, serta diikuti dengan
          rekomendasi. Dari hasil pengisian beberapa pertanyaan yang disediakan,
          investor dapat kemudian mengetahui hasil rencana investasinya apakah
          sudah tercapai atau belum, dan jika belum tercapai investor akan
          mendapat rekomendasi agar tetap bisa mencapai tujuan investasinya.
        </p>
        <CalculatorInvestment
          @calculated="
            () => {
              showNPS = true;
            }
          "
          class="q-pa-md full-width q-my-lg card-aturan-mobile"
        />
      </div>

      <div class="q-px-md q-mb-lg content-card col-0 col-md-6">
        <CalculatorInvestment
          @calculated="
            () => {
              showNPS = true;
            }
          "
          class="q-pa-md full-width"
        />
      </div>
    </section>
    <section class="relative-position belajar-bersama-kami">
      <div class="absolute-left keunggulan" style=""></div>

      <div class="container-article text-center">
        <div class="q-px-md q-py-sm q-mb-md">
          <h1 class="q-mb-md" style="font-weight: normal">
            Belajar Bersama Kami
          </h1>
          <p class="q-mb-md">
            Kamu bisa pelajari berbagai hal tentang finansial, mulai dari
            perencanaan keuangan sampai investasi dengan detail mendasar oleh
            para pemateri terbaik secara asyik dan menarik.
          </p>
          <q-btn
            outline
            color="primary"
            href="/e-learning"
            class="f-text-5 center"
            label="Lihat Selengkapnya"
            no-caps
            style="font-weight: bold; border-radius: 8px"
          >
            <q-icon name="arrow_forward_ios" class="float-right" size="14px" />
          </q-btn>
        </div>
        <div class="q-px-md q-py-md">
          <div class="row justify-between items-stretch">
            <ItemProductLP
              class="col-12 col-sm-6 col-md-4 q-px-md q-py-md"
              v-for="(product, idx) in products"
              :key="idx"
              :product="product"
            />
          </div>
        </div>
      </div>
    </section>
    <dialog-nps v-if="showNPS" :showNPS="showNPS" :section="`calculator`" />
  </div>
</template>

<script>
import ItemProductLP from "src/components/items/ItemProductVideo.vue";
import CalculatorInvestment from "src/components/calculator/CalculatorInvestment.vue";
import DialogNPS from "src/components/dialogs/DialogNPS.vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    ItemProductLP,
    "dialog-nps": DialogNPS,
    CalculatorInvestment
  },

  data() {
    return {
      products: [],
      showNPS: false,
    };
  },
  mounted() {
    this.getProducts();
  },

  methods: {
    getProducts() {
      this.$services.product.get(
        {
          tag: "Kalkulator 503020",
        },
        (data) => {
          this.products = data;
        },
        (msg, errors) => {},
        () => {}
      );
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
          this.setIDuser();
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
