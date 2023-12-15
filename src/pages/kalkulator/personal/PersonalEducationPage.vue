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
        <h1 class="f-text-title">Pentingnya Punya Dana Pendidikan</h1>
        <p class="f-text-body text-justify">
          Mempersiapkan dan memiliki dana pendidikan sangat penting, dan ini melibatkan beberapa pertimbangan yang perlu dipahami:
        </p>
        <ol>
          <li class="f-text-body text-justify">
            <span class="f-text-highlighted"> Investasi dalam Masa Depan:</span>
            <ul>
              <li class="text-content">
                <span class="f-text-highlighted">Pendidikan adalah Investasi: </span>
                <span class="text-content">
                  Pendidikan dianggap sebagai investasi jangka panjang yang membawa manfaat besar.
                  Dengan memiliki dana pendidikan, Anda dapat memastikan bahwa Anda atau anak-anak
                  Anda memiliki akses ke pendidikan yang berkualitas.
                </span>
              </li>
            </ul>
          </li>
        </ol>
        <CalculatorEducation
          @calculated="
            () => {
              showNPS = true;
            }
          "
          class="q-pa-md full-width q-my-lg card-aturan-mobile"
        />
      </div>

      <div class="q-px-md q-mb-lg content-card col-0 col-md-6">
        <CalculatorEducation
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
          <h1 class="q-mb-md" style="font-weight: normal;">Belajar Bersama Kami</h1>
          <p class="q-mb-md">
            Kamu bisa pelajari berbagai hal tentang finansial, mulai dari
            perencanaan keuangan sampai investasi dengan detail mendasar oleh
            para pemateri terbaik secara asyik dan menarik.
          </p>
          <q-btn outline color="primary" href="/e-learning" class="f-text-5 center"
          label="Lihat Selengkapnya" no-caps
          style="font-weight: bold; border-radius: 8px;">
            <q-icon
              name="arrow_forward_ios"
              class="float-right"
              size="14px"
            />
          </q-btn>
          </div>
        <div class="q-px-md q-py-md">
          <div class="row justify-between items-stretch">
            <ItemProductLP
            class="col-12 col-sm-6 col-md-4 q-px-md q-py-md"
            v-for="(product, idx) in products"
            :key="idx"
            :product="product"/>
          </div>
        </div>
      </div>
    </section>
    <dialog-nps v-if="showNPS" :showNPS="showNPS" :section="`calculator`" />
  </div>
</template>

<script>
import ItemProductLP from "src/components/items/ItemProductVideo.vue";
import CalculatorEducation from "src/components/calculator/CalculatorEducation.vue";
import DialogNPS from "src/components/dialogs/DialogNPS.vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    ItemProductLP,
    "dialog-nps": DialogNPS,
    CalculatorEducation,
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

<style>
  ul {
    list-style-type: none;
    padding-left: 20px;
  }

  li {
    position: relative;
    margin-bottom: 10px;
  }

  ul li:before {
    content: "\2022";
    color: #000;
    font-size: 1.2em;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
    position: absolute;
  }
</style>
