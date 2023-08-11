<template>
  <div>
    <section class="container row no-wrap q-pt-lg relative-position">
      <div
        class="absolute-top"
        style="
          background-image: url(/images/bg-achiev.svg);
          transform: rotate(180deg) translate(-50%, 10%);
          right: 50%;
          background-repeat: no-repeat;
          background-size: cover;
          width: 369px;
          height: 366.15px;
          z-index: -1;
        ">
      </div>

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
        <h2 class="f-text-title">
          Apa itu aturan 50/30/20?
        </h2>
        <p class="f-text-body">
          Metode 50/30/20 menjadi salah satu cara ampuh untuk mengatur keuangan
          bulanan agar tidak boros. Seringkali, orang-orang mengeluarkan banyak
          uang hingga lupa memenuhi kebutuhan pokok. Alokasi gaji yang belum
          tepat dapat membuat orang kesulitan dana mengatur keuangan. Untuk itu,
          kamu harus memilih cara mengatur keuangan yang cocok
        </p>
        <p class="f-text-body">
          Metode 50-30-20 ini akan mengalokasikan pendapatan anda. sebesar 50
          persen untuk kebutuhan pokok, 30 persen untuk memenuhi keinginan
          pribadi, dan 20 persen lainnya disisihkan untuk tabungan.
        </p>
        <Calculator503020
          @calculated="
            () => {
              showNPS = true;
            }
          "
          class="q-pa-md full-width q-my-lg card-aturan-mobile"
        />
        <p class="f-text-body">
          <strong>50% dari penghasilan Anda: kebutuhan</strong>. Kebutuhan
          adalah pengeluaran yang tidak bisa Anda hindari. Porsi anggaran Anda
          ini harus mencakup biaya yang diperlukan seperti:
        </p>
        <ul class="f-text-body">
          <li>Iuran bulanan.</li>
          <li>Makanan.</li>
          <li>Transportasi.</li>
          <li>Utilitas dasar atau tagihan rumah tangga.</li>
          <li>Asuransi.</li>
          <li>Pengeluaran lain yang ditanggung.</li>
        </ul>
        <p class="f-text-body">
          <strong>30% dari penghasilan Anda: keinginan</strong>. Membedakan
          antara kebutuhan dan keinginan tidak selalu mudah dan dapat bervariasi
          dari satu anggaran ke anggaran lainnya. Namun, secara umum, keinginan
          adalah tambahan yang tidak penting untuk hidup dan bekerja. Mereka
          sering untuk bersenang-senang dan mungkin termasuk:
        </p>
        <ul class="f-text-body">
          <li>Langganan bulanan.</li>
          <li>Travelling.</li>
          <li>Hiburan.</li>
          <li>Makan di luar.</li>
        </ul>
        <p class="f-text-body">
          <strong>20% dari penghasilan Anda: tabungan dan utang</strong>.
          Tabungan adalah jumlah yang Anda keluarkan untuk mempersiapkan masa
          depan. Luangkan sebagian penghasilan Anda ini untuk membayar utang
          yang ada dan menciptakan bantalan keuangan.
          <br />
          Menggunakan bagian anggaran Anda ini bergantung pada situasi Anda,
          tetapi kemungkinan akan mencakup:
        </p>
        <ul class="f-text-body">
          <li>Menyiapkan dana darurat.</li>
          <li>Tabungan pension.</li>
          <li>Membayar utang (tagihan kartu kredit).</li>
        </ul>
      </div>

      <div class="q-px-md q-mb-lg content-card col-0 col-md-6">
        <Calculator503020
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

      <div class="container-article">
        <div class="q-px-md q-py-sm q-mb-md">
          <h1 class="q-mb-md">Belajar Bersama Kami</h1>
          <p class="q-mb-md">
            Kamu bisa pelajari berbagai hal tentang finansial, mulai dari
            perencanaan keuangan sampai investasi dengan detail mendasar oleh
            para pemateri terbaik secara asyik dan menarik.
          </p>
          <q-icon
            name="arrow_forward_ios"
            class="float-right q-ml-sm q-mr-md q-mt-sm"
            size="14px"
          />
          <a
            href="/e-learning"
            class="f-text-body1 float-right"
            style="color: #000000"
            >Lihat lainnya</a
          >
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
import Calculator503020 from "src/components/calculator/Calculator503020.vue";
import DialogNPS from "src/components/dialogs/DialogNPS.vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    ItemProductLP,
    "dialog-nps": DialogNPS,
    Calculator503020,
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
