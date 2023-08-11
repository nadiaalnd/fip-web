<template>
  <section class="container row wrap q-pt-lg relative-position">
    <div class="absolute-bottom-right" style="background-image: url(/images/bg-keunggulan.svg); 
      background-repeat: no-repeat; background-size: cover; width: 487px; height: 458px; bottom: -10%;"></div>
    <div class="q-px-md  col-12 col-md-6 ">
      <div class="absolute-top" style="background-image: url(/images/bg-achiev.svg); 
      transform: rotate(180deg) translate(-50%, 10%); right: 50%; background-repeat: no-repeat; background-size: cover; width: 369px; height: 366.15px;"></div>
      <h2 class="f-text-title">
        Ketentuan Zakat Mal
      </h2>
      <p class="f-text-body">
        Zakat mal merupakan zakat yang dikenakan atas harta yang dimiliki seseorang dimana proses perolehannya sesuai dengan syariat agama Islam. Adapun zakat mal terdiri dari
        <strong>harta, aset dan simpanan kekayaan</strong> (UU No. 23 Tahun 2011) yang meliputi:
      </p>
      <ol>
        <li>Emas, perak, dan logam mulia lainnya;</li>
        <li>Uang dan surat berharga lainnya;</li>
        <li>Perniagaan;</li>
        <li>Pertanian, perkebunan, dan kehutanan;</li>
        <li>Peternakan dan perikanan</li>
        <li>Pertambangan;</li>
        <li>Perindustrian;</li>
        <li>Pendapatan dan jasa; dan</li>
        <li>Rikaz.</li>
      </ol>

      <p class="f-text-body">
        Apabila harta atau simpanan kekayaan mu ada pada daftar di atas dan kamu ingin berzakat, pastikan kamu memenuhi <strong>syarat berzakat</strong>, yaitu:
      </p>
      <ol>
        <li>Islam;</li>
        <li>Merdeka;</li>
        <li>Berakal dan baligh; dan</li>
        <li>Memiliki nishab (batas terendah yang dijadikan pedoman untuk menentukan kewajiban zakat mal)</li>
      </ol>
    </div>
    <div class="q-px-md q-mb-lg col-12 col-md-6">
      <q-card class="q-pa-md full-width">
        <div class="content-header">
          <h1 class="text-primary q-mt-none q-mb-md text-bold">
            Kalkulator Zakat Mal
          </h1>
          <p class="f-text-body">
            Kalau syarat berzakat di atas sudah kamu penuhi, yuk hitung berapa besar zakat mal yang perlu kamu keluarkan
          </p>
          <hr>
        </div>
        <div>
          <div class="q-gutter-sm q-py-md text-weight-bold">
            <q-radio size="xs" v-model="formRadio" val="perbulan" label="Perbulan" style="margin-left: 0px;" />
            <q-radio size="xs" v-model="formRadio" val="pertahun" label="Pertahun" />
          </div>

          <div>
            <div class="q-mb-sm text-weight-bold">
              Pendapatan
            </div>
            <div
              class="row justify-start"
            >
              <q-input
                outlined dense
                class="q-mb-md col-4 income"
                style="max-width: 200px; font-size: 16px; min-width: 170px;"
                v-model="form.income">
                <template v-slot:prepend>
                  Rp
                </template>
              </q-input>
            </div>

            <div class="q-mb-sm text-weight-bold">
              Penghasilan lain
            </div>
            <div
              class="row justify-start"
            >
              <q-input
                outlined dense
                class="q-mb-md col-4"
                style="max-width: 200px; font-size: 16px; min-width: 170px;"
                v-model="form.incomeBonus">
                  <template v-slot:prepend>
                    Rp
                  </template>
              </q-input>
            </div>

            <div class="q-mb-sm text-weight-bold">
              Pengeluaran kebutuhan pokok bulanan (termasuk utang)
            </div>
            <div
              class="row justify-start"
            >
              <q-input
                outlined dense
                class="q-mb-md col-4"
                style="max-width: 200px; font-size: 16px; min-width: 170px;"
                v-model="form.expenditure">
                <template v-slot:prepend>
                  Rp
                </template>
              </q-input>
            </div>
            <div v-if="!showResult">
              <q-btn
                push no-caps
                class="btn-sm gtm-track"
                color="primary"
                label="Lihat Perhitungan"
                :disable="form.income == 0 || form.expenditure == 0"
                @click="calculateAndSaveResult"
                gtm-action="btn_calculator_zakat-mal_calculate"/>
            </div>
            <section v-if="showResult">
              <div class="input-zakat" style="position: relative;">
                <label for="zakat" style="width: 100%;">
                  <input :value="result.countValue ? 'Wajib Membayar Zakat' : 'Tidak Wajib Membayar Zakat, Tapi Bisa Berinfak'" :disabled="true" type="text" id="zakat" class="q-mt-lg q-mx-sm q-mb-sm text-weight-bold" style="border: none; width: 100%;"
                    :style="result.countValue ? 'color: black;' : 'color: red;'">
                </label>
                <div class="text-weight-bold" style="position:  absolute; top: 5px; font-size: smaller;">
                  Wajib Bayar 
                </div>
              </div>


              <div class="q-mt-md" :style="($q.platform.is.mobile ? 'font-size: 11px;' : 'font-size: small;')">
                <span>Note</span>
                <br>
                - Perhitungan zakat diupdate otomatis berdasarkan update harga emas
                <br>
                - Harga emas per gram saat ini Rp{{  formatRupiah(formType.gold_per_gram) }} (www.harga-emas.org)
                <br>
                - Nishab 85 gram per {{ formType.type === "Bulan" ? `${formType.type} Rp${formatRupiah(Math.round((formType.gold_per_gram * formType.gold_nishab) / 12))}` : formType.type === "Tahun" && `${formType.type} Rp${formatRupiah(formType.gold_per_gram * formType.gold_nishab)}` }}
                <br>
                - Dianjurkan dipotong dari gaji bruto
              </div>

              <div class="q-my-lg" :class="($q.platform.is.mobile ? 'text-center' : 'text-left')">
                <h5 class="text-weight-bold">
                  Total Zakat Mal dalam 1 {{formType.type }}
                </h5>
                <h2 class="q-mb-md">
                  {{ result.calculate ? result.calculate : "Rp. - " }}
                </h2>
              </div>
            </section>
          </div>
        </div>
      </q-card>
    </div>
  </section>

  <section class="relative-position belajar-bersama-kami">
    <div class="absolute-left keunggulan" style=""></div>

    <div class="container-article">
      <div class="q-px-md q-py-sm q-mb-md">
        <h1 class="q-mb-md">
          Belajar Bersama Kami
        </h1>
        <p class="q-mb-md">
          Kamu bisa pelajari berbagai hal tentang finansial, mulai dari perencanaan keuangan sampai investasi dengan detail mendasar oleh para pemateri terbaik secara asyik dan menarik.
        </p>
        <q-icon name="arrow_forward_ios" class="float-right q-ml-sm q-mr-md q-mt-sm" size="14px" />
        <a href="/e-learning" class="text-body1 float-right" style="color:#000000">Lihat lainnya</a>
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
</template>

<script>
import { defineComponent, ref } from 'vue'
import ItemProductLP from 'src/components/items/ItemProductVideo.vue';

  export default defineComponent({
    components: {
      ItemProductLP
    },

    setup(){
      return {
        formRadio: ref("perbulan")
      }
    },
    data () {
      return {
        showResult: false,
        setting: null,
        formType: {
          type: "Bulan",
          month: 0,
          year: 0,
          "gold_per_gram": 0,
          "gold_nishab": 0,
        },
          products: [],
          form: {
            income: 0,
            incomeBonus: 0,
            expenditure: 0,
            salaryInt: 0
          },
          calculatorBody:{
            input : "",
            output : "",
            type : "calculator_zakat-mal"
          },
          result: {
            income: 0,
            incomeBonus: 0,
            expenditure: 0,
            calculate: "",
            countValue: false,
          },
        }
    },

    computed: {
        resultAll() {
            return {
                resultIncome: this.result.income,
                resultBonusIncome: this.result.incomeBonus,
                resultExpenditure: this.result.expenditure,
                resultFormRadio: this.formRadio,
            }
        }
    },

    created () {
      this.setupSetting(this.$utils.getSetting())
      this.$global.$on('setting', (setting) => {
        this.setupSetting(setting)
      })
      this.getPricing()
    },

    mounted () {
      this.getProducts()
    },

    methods: {
      // get products / products
      getProducts () {
        this.$services.product.get({
          tag: 'Kalkulator 503020',
        }, (data) => {
          this.products = data
        }, (msg, errors) => {
        }, () => {
        })
      },
      getPricing () {
        this.$axios.create({
          baseURL: 'https://pluang.com',
          crossDomain: true
        }).get('/api/asset/gold/pricing', {
          params: {
            daysLimit: 1
          }
        }).then((data) => {
          this.formType.gold_per_gram = data.data.data.current.sell
        })
        .catch((e) => {
          console.log(e)
        })
      },
      setupSetting (setting) {
        const kalkulatorZakatMal = JSON.parse(setting?.["Kalkulator Zakat Mal"]);
        this.formType.gold_nishab = kalkulatorZakatMal.gold_nishab;
      },

      formatRupiah : (money) => {
        return new Intl.NumberFormat("id-ID", {
          currency: "IDR",
          minimumFractionDigits: 0,
        })
          .format(money)
          .toString();
      },

      
      getPercentage: function (percentage) {
          return Math.round(this.form.salaryInt * percentage / 100).toLocaleString()
      },

      calculateAndSaveResult: function () {
        this.showResult = true
        this.calculatorBody.input = JSON.stringify(this.form)
        this.calculatorBody.output = JSON.stringify(this.result)
        this.$services.calculator.add(
          this.calculatorBody,
          (data) => {},
          () => {},
          () => {}
        );
      },
    },

    watch: {
      formRadio: function (newVal) {
        this.showResult = false
      },
      'form.income': function (newVal, oldVal) {
        if (newVal) {
          const money = parseInt(newVal.replaceAll(/[,.]/g, ''))
          const value = money.toLocaleString()

          if (money > 0) {
              this.result.income = (money / 40);
              this.form.income = value;
              this.form.salaryInt = money;
              return

          }else{
            this.form.income = 0;
            this.form.salaryInt = 0;
          }

        }else{
          this.result.income = 0;
          this.form.income = 0;
          this.form.salaryInt = 0;
        }
      },

      'form.incomeBonus': function (newVal){
        if(newVal){
          const money = parseInt(newVal.replaceAll(/[,.]/g, ''))
          const value = money.toLocaleString()

          if (money > 0) {
            this.result.incomeBonus = (money / 40);
            this.form.incomeBonus = value            
            return
          
          }else{
            this.form.incomeBonus = 0
          }

        }else{
          this.result.incomeBonus = 0
          this.form.incomeBonus = 0
        }

          
      },

      'form.expenditure': function (newVal){
        if(newVal){
          const money = parseInt(newVal.replaceAll(/[,.]/g, ''))
          const value = money.toLocaleString()

          if (money > 0) {
            this.result.expenditure = (money / 40);
            this.form.expenditure = value;
            return
          
          }else{
            this.form.expenditure = 0;
          }
        
        }else{
          this.result.expenditure = 0;
          this.form.expenditure = 0;
        }

      },

      resultAll: {
        handler: function(val){
          if(val){
            const {resultIncome, resultBonusIncome, resultExpenditure, resultFormRadio} = val;
            let count = Math.floor((resultIncome + resultBonusIncome) - resultExpenditure);
            let pureCount = (resultIncome * 40) + (resultBonusIncome * 40) - (resultExpenditure * 40);
            
            this.result.calculate = count <= 0 ? "" :  `Rp. ${this.formatRupiah(count).toString()}`;

            if(resultFormRadio === "perbulan"){
              this.formType.type = "Bulan";
              this.formType.month = this.formType.gold_nishab * this.formType.gold_per_gram / 12;
              this.result.countValue = this.formType.month >= pureCount ? false : true; 
            } else if(resultFormRadio === "pertahun"){
              this.formType.type = "Tahun";
              this.formType.year = this.formType.gold_nishab * this.formType.gold_per_gram;
              this.result.countValue = this.formType.year >= pureCount ? false : true; 
            }
          
          }
        },
        deep: true,
      }
    }
  })
</script>