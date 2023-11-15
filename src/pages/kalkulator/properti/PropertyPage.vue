<template>
  <q-page id="calculatorProperty">
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

      <div class="q-px-md q-mb-lg content-article col-12 col-md-6">
        <h2 class="f-text-title">
          Capai Properti Keinginan Anda
        </h2>
        <div class="f-text-body text-justify">
          Properti adalah aset fisik yang dimiliki oleh individu,
          perusahaan, atau entitas lain yang memiliki nilai ekonomi.
          Properti mencakup berbagai jenis aset seperti tanah, bangunan,
          perhiasan, kendaraan, dan banyak lagi. Properti dapat
          digunakan untuk berbagai tujuan, seperti tempat tinggal, investasi, atau bisnis.
        </div>

        <div class="q-mt-lg q-mb-md article-text">
          <span class="text-bold">Apa itu Kalkulator Properti?</span>
          <br>
          Kalkulator Properti adalah alat yang dirancang
          untuk membantu Anda menghitung jumlah dana yang
          diperlukan untuk memiliki properti impian, seperti
          rumah, apartemen, atau tanah. Kalkulator ini
          memungkinkan Anda untuk menghitung pembayaran
          Down Payment (DP) secara cicilan, sehingga Anda
          dapat merencanakan kepemilikan properti sesuai
          dengan kemampuan finansial Anda.
          <br>
          Dengan menggunakan
          kalkulator ini, Anda dapat memperoleh informasi
          tentang berapa besar DP yang perlu Anda siapkan dan
          berapa lama waktu yang dibutuhkan untuk mencapai tujuan
          Anda dalam memiliki properti tersebut.
          Kalkulator Properti ini dapat membantu
          Anda merencanakan langkah-langkah finansial
          Anda dengan lebih baik untuk mencapai impian
          memiliki properti yang Anda inginkan.
        </div>
      </div>

      <div class="q-px-md q-mb-lg content-article col-12 col-md-6">
        <q-card class="q-px-lg q-py-sm full-width q-mb-lg">
          <div class="content-header">
            <h1 class="q-mt-none q-mb-md calculator-title">
              Kalkulator Properti
            </h1>
          </div>

          <div class="q-mb-lg calculator-input-label justify-start">
            <div>
              <div>Berapa lama lagi ingin membeli properti impian Anda?</div>
              <div class="flex items-baseline" style="gap: 8px;">
                <q-input
                  dense
                  class="calculator-mini-input text-center"
                  v-model="timeNeeded"
                  type="tel"
                  @update:model-value="validateTimeNeededInput"
                />
                <span class="calculator-mini-append q-mt-auto">Tahun</span>
              </div>
            </div>

            <div v-if="timeNeeded != null" class="q-mt-lg">
              Harga Properti impian Anda saat ini?
              <q-input
                outlined
                dense
                class="col-4 calculator-input q-mt-sm"
                v-model="propertyPrice"
              >
                <template v-slot:prepend> Rp </template>
              </q-input>
            </div>

            <div v-if="intPropertyPrice > 0" class="q-mt-lg">
              <div>Down Payment (DP) yang ingin kamu bayarkan saat ini?</div>
              <div class="flex items-baseline q-mb-lg" style="gap: 8px;">
                <q-input
                  dense
                  class="calculator-mini-input text-center"
                  v-model="downPayment"
                  type="tel"
                  @update:model-value="validateDownPaymentInput"
                />
                <span class="calculator-mini-append q-mt-auto">%</span>
              </div>
            </div>

            <div v-if="downPayment != null" class="q-mt-lg timeline">
              <div class="outer">
                <div class="timeline-card">
                  <div class="info">
                    <h3 class="title-info">DOWN PAYMENT ANDA SETARA DENGAN</h3>
                    <div class=" describe-info calculator-result calculator-currency-result">
                      <div>RP</div><div>{{ timeLineItem.downPayment.toLocaleString() }} </div>
                    </div>
                  </div>
                </div>
                <div class="timeline-card">
                  <div class="info">
                    <h3 class="title-info">PERSENTASE KPR ANDA</h3>
                    <div class="describe-info describe-info calculator-result calculator-currency-result">
                      <div>{{ timeLineItem.persentaseKPR }} </div><div>%</div>
                    </div>
                  </div>
                </div>
                <div class="timeline-card">
                  <div class="info">
                    <h3 class="title-info">KPR ATAU UTANG POKOK ANDA</h3>
                    <div class=" describe-info calculator-result calculator-currency-result">
                      <div>RP</div><div>{{ timeLineItem.kprPokok.toLocaleString() }} </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="downPayment != null" class="q-mt-lg">
              <div>Asumsi inflasi properti Anda per Tahun</div>
              <div class="flex items-baseline q-mb-lg" style="gap: 8px;">
                <q-input
                  dense
                  class="calculator-mini-input text-center"
                  v-model="inflation"
                  type="tel"
                  @update:model-value="validateInflationInput"
                />
                <span class="calculator-mini-append q-mt-auto">%</span>
              </div>
            </div>

            <div v-if="inflation != null" class="q-mt-lg">
              <div class="label-result">
                TOTAL UANG YANG ANDA PERLUKAN DALAM <strong>{{ timeNeeded }} TAHUN </strong>LAGI
                <br>
                UNTUK MEMBAYAR DOWN PAYMENT (DP) SEBESAR
              </div>

              <div class="calculator-result calculator-currency-result result-property"><div>RP</div><div>{{ calculatorResult.toLocaleString() }} </div></div>
            </div>

            <q-btn v-if="inflation != null" class="text-bold q-py-sm full-width q-mb-md q-mt-lg" outline rounded @click="resetState"
              text-color="dark">
              Hitung Ulang Kalkulator Properti
            </q-btn>
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
              no-caps push
              color="secondary"
              class="text-black q-px-md gtm-track btn-medium"
              label="Mulai Sekarang"
              @click="getFreePackage"
              gtm-action="btn_free_get_calculator_503020"
            />
          </div>
        </q-card>
      </div>
    </div>

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
  </q-page>
</template>

<script>
import DialogNPS from "src/components/dialogs/DialogNPS.vue";

export default {
  components: {
    "dialog-nps": DialogNPS,
  },
  data() {
    return {
      timeNeeded: null,
      propertyPrice: 0,
      intPropertyPrice: 0,
      downPayment: null,
      inflation: null,
      showNPS: false,
      calculatorResult: null,

      timeLineItem:{
        downPayment: null,
        persentaseKPR: null,
        kprPokok: null,
      }
    };
  },

  methods: {
    getFreePackage: function () {
      this.$router.push({
        path: "/free/package/e-learning",
      });
    },

    resetState: function(){
      this.timeNeeded = null
      this.propertyPrice = 0
      this.intPropertyPrice = 0
      this.downPayment = null
      this.inflation = null
      this.showNPS = false
      this.calculatorResult = null

      this.timeLineItem.downPayment = null
      this.timeLineItem.kprPokok = null
      this.timeLineItem.persentaseKPR = null
    },

    validateTimeNeededInput(){
      if(this.timeNeeded == ''){
        this.timeNeeded = null
      }

      if(isNaN(this.timeNeeded)){
        this.timeNeeded = null
      }
    },

    validateDownPaymentInput(){
      if(this.downPayment == ''){
        this.downPayment = null
      }

      if(isNaN(this.downPayment)){
        this.downPayment = null
      }

      if(this.downPayment < 1 || this.downPayment > 100 ){
        this.downPayment = null
      }
    },

    validateInflationInput(){
      if(this.inflation == ''){
        this.inflation = null
        console.log("MASUK ''")
      }

      if(isNaN(this.inflation)){
        this.inflation = null
        console.log("isNaN")
      }

      if(this.inflation < 1 || this.inflation > 100 ){
        this.inflation = null
        console.log("Perbandingan")
      }
    },


    calculateItemInTimeline: function(){
      if(this.intPropertyPrice && this.downPayment){
        this.timeLineItem.downPayment = this.intPropertyPrice * parseFloat(this.downPayment)/100
        this.timeLineItem.persentaseKPR = 100 - parseFloat(this.downPayment)
        this.timeLineItem.kprPokok = (this.timeLineItem.persentaseKPR/100) * this.intPropertyPrice
      }
    },

    calculateCalulatorPropertyResult: function(){
      if(this.inflation && this.timeLineItem.downPayment && this.timeNeeded){
        let totalValue = this.timeLineItem.downPayment


        const intTimeNeeded = parseInt(this.timeNeeded)
        const floatInflation = parseFloat(this.inflation)/100

        for (var i = 0; i < intTimeNeeded; i++){
          totalValue += (totalValue * floatInflation)
        }

        this.calculatorResult = totalValue
      }else{
        this.calculatorResult == null
      }
    },

  },

  watch: {
    "propertyPrice": function (newVal) {
      if (newVal) {
        const money = parseInt(newVal.replaceAll(/[,.]/g, ""));
        const value = money.toLocaleString();
        if (money > 0) {
          this.propertyPrice = value;
          this.intPropertyPrice = money;
          return;
        }
      }

      this.propertyPrice = 0;
      this.intPropertyPrice = 0;
    },

    "downPayment": function (){
      this.calculateItemInTimeline()
      this.calculateCalulatorPropertyResult()
    },
    "intPropertyPrice": function (){
      this.calculateItemInTimeline()
      this.calculateCalulatorPropertyResult()
    },
    "timeNeeded": function(){
      this.calculateCalulatorPropertyResult()
    },
    "inflation": function(){
      this.calculateCalulatorPropertyResult()
    },

    "calculatorResult": function(newVal){
      if(newVal){
        this.showNPS = true
      }
    }
  }

};
</script>
