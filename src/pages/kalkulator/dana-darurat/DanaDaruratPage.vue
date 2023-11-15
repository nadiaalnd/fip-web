<template>
  <q-page id="profil-resiko">
    <div class="container row wrap q-pt-lg relative-position">
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

      <div class="q-px-md q-mb-lg col-12 col-md-6">
        <h2 class="article-title">
          Siapkan Dana Darurat Anda
        </h2>
        <div class="article-text">
          Mempersiapkan dana darurat sangat penting dalam mengelola keuangan
          pribadi dengan bijak. Dana darurat membantu meringankan tekanan
          finansial yang mungkin timbul akibat kejadian tak terduga, sehingga
          anda tidak perlu mengandalkan kartu kredit atau pinjaman yang
          berpotensi mengakibatkan hutang yang lebih besar.
          <br>
          <br>
          Dana darurat mengacu pada dana atau tabungan yang disediakan khusus
          untuk mengatasi keadaan darurat atau situasi tak terduga yang mungkin
          muncul dalam kehidupan sehari-hari. Tujuannya adalah untuk memberikan
          perlindungan finansial dalam situasi-situasi yang tidak terduga, seperti
          kehilangan pekerjaan, biaya medis mendesak, perbaikan mendadak, atau
          kejadian tak terduga lainnya.
        </div>

        <div class="q-mt-lg q-mb-md article-text">
          <span class="text-bold">Jadi apa itu Kalkulator Dana Darurat?</span>
          <br>
          Kalkulator dana darurat merupakan alat bantu yang digunakan
          untuk menghitung besaran dana darurat berdasarkan pengeluaran
          bulanan anda. Dalam kalkulator dana darurat selain anda akan
          mendapat hasil atau kesimpulan besaran dana darurat, anda juga
          akan mendapat jangka waktu untuk mencapai besaran dana darurat
          anda tersebut.
        </div>
      </div>

      <div class="q-px-md q-mb-lg content-article col-12 col-md-6">
        <q-card class="q-px-lg q-py-sm full-width q-mb-lg">
          <CalculatorCapaiDanaDarurat v-if="capaiDanaDarurat" :danaDarurat="danaDarurat" :intDanaDarurat="intDanaDarurat" @backToCalculatorDanaDarurat="backToCalculatorDanaDarurat"/>
          <CalculatorDanaDaruratVue @updateCapaiDanaDarurat="updateCapaiDanaDarurat" v-else/>
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
                no-caps push
                color="secondary"
                class="text-black q-px-md gtm-track btn-medium"
                label="Mulai Sekarang"
                @click="getFreePackage"
                gtm-action="btn_free_get_calculator_503020"
              />
            </div>
          <!--  -->
        </q-card>
      </div>
    </div>

    <section class="relative-position belajar-bersama-kami">
      <div class="absolute-left keunggulan"></div>

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
  </q-page>
</template>

<script>
import DialogNPS from "src/components/dialogs/DialogNPS.vue";
import CalculatorDanaDaruratVue from 'src/components/calculator/dana-darurat/CalculatorDanaDarurat.vue';
import CalculatorCapaiDanaDarurat from "src/components/calculator/dana-darurat/CalculatorCapaiDanaDarurat.vue";

export default {
  components: {
    "dialog-nps": DialogNPS,
    CalculatorDanaDaruratVue,
    CalculatorCapaiDanaDarurat
},
  methods: {

    setIDuser: function () {
      const user = this.$utils.getUser();
      if (user) {
        this.calculatorBodyProfilResiko.id_user = user.id;
      } else this.calculatorBodyProfilResiko.id_user = 1;
    },

    getFreePackage: function () {
      this.$router.push({
        path: "/free/package/e-learning",
      });
    },

    updateCapaiDanaDarurat(intDanaDarurat, danaDarurat){
      this.capaiDanaDarurat = true;
      this.danaDarurat = danaDarurat
      this.intDanaDarurat = intDanaDarurat
      this.showNPS = true;
    },

    backToCalculatorDanaDarurat(){
      this.capaiDanaDarurat = false;
    }

  },
  data() {
    return {
      capaiDanaDarurat: false,
      danaDarurat:"",
      intDanaDarurat:0,
      showNPS: false,
    };
  },
};
</script>
