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

      <div class="q-px-md q-mb-lg content-article col-12 col-md-6">
        <h2 class="f-text-title">
          Kenali Profil Risiko Investasi Anda
        </h2>
        <div class="f-text-body">
          Kalkulator Profil Risiko menjadi salah satu pemecah masalah
          bahwa potensi imbal hasil suatu investasi selalu berbanding
          lurus dengan risikonya atau biasa disebut dengan
          <span class="text-italic">
            High Risk High Return.
          </span>
          Artinya, investor yang mempunyai profil risiko
          <span class="text-bold">
            Konservatif (Potensi imbal hasil yang rendah)
          </span>
          , biasanya juga mempunyai risiko yang relatif rendah. Begitupun sebaliknya,
          investor yang mempunyai profil risiko
          <span class="text-bold">
            Agresif (Potensi imbal hasil yang tinggi)
          </span>
          , biasanya juga mempunyai risiko yang relatif tinggi.
        </div>

        <div class="q-mt-lg q-mb-md f-text-body">
          <span class="text-bold">Jadi apa itu kalkulator profil risiko?</span>
          <br>
          Kalkulator Profil Resiko merupakan alat bantu bagi investor untuk
          mengetahui tingkat toleransi risiko investor dalam berinvestasi.
          Dari hasil pengisian beberapa pertanyaan yang disediakan, investor
          dapat kemudian menentukan profil resiko, mulai dari tingkat profil
          risiko
          <span class="text-bold">Konservatif, Moderat,</span>
          atau
          <span class="text-bold">Agresif</span>
          yang disertai dengan penjelasan, jangka waktu investasi dan
          instrumen investasi yang sesuai dengan profil risikonya.
          Mengetahui profil risiko investasi menjadi salah poin penting
          kunci kesuksesan dalam berinvestasi.
        </div>
      </div>

      <div class="q-px-md q-mb-lg content-article col-12 col-md-6">
        <q-card class="q-px-lg q-py-sm full-width q-mb-lg">
          <div class="content-header">
            <h1 class="text-primary q-mt-none q-mb-md text-bold">
              Profil Resiko
            </h1>
          </div>

          <!-- SKOR / Result -->
          <div class="add-effect-fade" v-if="skor.length > 6">
            <div class="q-my-sm text-weight-regular">
              <span class="text-bold">{{ calculateSkor.tipe }}</span><span> adalah profil resiko Anda</span>
            </div>

            <div
              class="text-weight-medium q-mb-md"
            >
              {{ calculateSkor.keterangan }}
            </div>

            <div>
              <div class="">
                <div class="q-my-sm">
                  <div class="">KAS / DEPOSITO</div>
                  <div class="f-text-highlighted">{{ profilRisiko.kas }}</div>
                </div>

                <div class="q-my-sm">
                  <div class="">PASAR UANG</div>
                  <div class="f-text-highlighted">{{ profilRisiko.pasarUang }}%</div>
                </div>

                <div class="q-my-sm">
                  <div class="">JANGKA WAKTU INSVESTASI</div>
                  <div class="f-text-highlighted">{{ calculateSkor.jangkaWaktu }}</div>
                </div>

                <div class="q-my-sm">
                  <div class="">INSTRUMEN INVESTASI</div>
                  <div class="f-text-highlighted">{{ calculateSkor.instrument }}</div>
                </div>
              </div>
            </div>
            <q-btn class="text-bold q-py-sm full-width q-my-md" outline rounded @click="resetQuestion"
              text-color="dark">
              Ulangi Pertanyaan
            </q-btn>
          </div>

          <!-- Question -->
          <div
            v-else
            ref="content_question"
            v-for="(data, idx) in selectedQuestion"
            :class="data.addClass"
            class="q-mt-lg"
            :key="idx"
          >

            <div
              v-if="skor.length !== 0"
              @click="previous"
              class="flex container-circle"
              style="margin-bottom: 16px;"
            >
              <div
                class="circle flex"
                style="
                  width: 33px;
                  height: 33px;
                  border-radius: 50%;
                  align-items: center;
                  justify-content: center;
                  background-color: #ffde59;
                "
              >
                <img src="icons/Arrow-Left.svg" alt="arrow left" style="width: 75%;"/>
              </div>
              <div class="text-weight-regular" style="font-size: 16px">
                Pertanyaan Sebelumnya
              </div>
            </div>

            <div class="--question-content">
              <div class="--question-status">
                <span>Pertanyaan {{ data.no }}/7 : </span>
                <span>
                  Tujuan Investasi
                </span>
              </div>
              <div class="--question-title">
                {{ data.question }}
              </div>
            </div>

            <div class="q-pa-xs --question-answers">
              <q-option-group
                v-model="data.selected"
                :options="data.choose"
                :model-value="data.selected"
                @update:model-value="(val) => selectAnswer(val, data)"
                color="primary"
                class="text-weight-regular"
              />
            </div>
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
          <!--  -->
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
  methods: {
    resetQuestion() {
      this.skor = [];
      this.numberQuestion = 1;
      this.input.forEach((data, idx) => {
        data.selected = null;
      });
    },

    selectAnswer(select, data) {
      this.nextPrevious(data.choose[select], data.no);
      return select;
    },

    previous() {
      this.skor.pop();
      let numberCurrent = this.numberQuestion - 1;
      const indexQustionCurrent = this.input.findIndex(
        (data) => data.no === numberCurrent
      );
      this.input[indexQustionCurrent].selected = null;
      return this.numberQuestion--;
    },

    nextPrevious(select, no) {
      this.skor.push({ ...select, no });
      return this.numberQuestion++;
    },

    findQuestion(datas, id) {
      const result = datas.filter((data) => data.no === id);
      return result;
    },

    calculateAndSaveResult: function () {
      this.$services.calculator.add(
        this.calculatorBodyProfilResiko,
        (data) => {},
        () => {},
        () => {}
      );
    },

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
  },

  computed: {
    selectedQuestion() {
      const filterQuestion = this.findQuestion(this.input, this.numberQuestion);
      return filterQuestion;
    },

    calculateSkor() {
      const total = this.skor.reduce((acc, { value }) => acc + value, 7);
      const finalScore = (total) / 28;
      console.log(finalScore);
      let result = {};
      if (finalScore > 0.75) {
        result = {
          keterangan:
            "Investor tipe Agresif. Meningkatakan peluang dengan memaksimalkan pertumbuhan modal. Investor tidak ragu untuk mengalokasikan uang dalam jumlah tertentu ke jenis investasi berisiko tinggi.",
          tipe: "Agresif",
          jangkaWaktu: "Lebih dari 5 tahun",
          instrument: "Saham, Reksadana Saham, Crypto, Forex"
        };
      } else if (finalScore > 0.3) {
        result = {
          keterangan:
            "Investor tipe Moderat. Menyeimbangkan antara risiko dengan imbal hasil agar mencapai keuntungan yang optimal secara berkala namun tetap berhati-hati saat menentukan instrumen investasinya.",
          tipe: "Moderat",
          jangkaWaktu: "3-5 Tahun",
          instrument: "Reksadana Pendapatan Tetap, Obligasi, Saham Bluechip"
        };
      } else if (finalScore >= 0) {
        result = {
          keterangan:
            "Investor tipe Konservatif. Mencari modal, menghondari risiko tinggi, dan menyukai produk demham nilai stabil dengan memberikan pengembalian yang lebih rendah.",
          tipe: "Konservatif",
          jangkaWaktu: "Kurang dari 1 Tahun",
          instrument: "Emas, Reksadana Pasar Uang, Deposito"
        };
      } else {
        result = { keterangan: "", tipe: "" };
      }
      return result;
    },
  },

  data() {
    return {
      calculatorBodyProfilResiko: {
        input: [],
        output: "",
        type: "calculator_profil-resiko",
        id_user: 1,
      },
      skor: [],
      profilRisiko: {},
      numberQuestion: 1,
      showNPS: false,
      input: [
        {
          no: 1,
          selected: null,
          addClass: "add-effect-fade",
          question: "Berapa lama kamu mau menginvestasikan uangmu?",
          choose: [
            { label: "kurang dari 1 tahun", value: 0 },
            { label: "1-3 tahun", value: 1 },
            { label: "3-5 tahun", value: 2 },
            { label: "lebih dari 5 tahun", value: 3 },
          ],
        },
        {
          no: 2,
          selected: null,
          addClass: "add-effect-fade",
          question:
            "Berapa besar Dana Darurat (Emergency Fund) yang sudah kamu miliki sampai saat ini?",
          choose: [
            { label: "lebih dari 6 bulan gaji", value: 0 },
            { label: "3-6 bulan gaji", value: 1 },
            { label: "1-3 bulan gaji", value: 2 },
            { label: "kurang dari 1 bulan gaji", value: 3 },
          ],
        },
        {
          no: 3,
          selected: null,
          addClass: "add-effect-fade",
          question:
            "Seberapa tinggi toleransi risiko yang bisa kamu tanggung saat investasi?",
          choose: [
            {
              label: "Tidak ambil risiko atas uang dan modal pokoknya",
              value: 0,
            },
            {
              label:
                "Sedikit ambil risiko, tapi tetap melindungi nilai uang dari penurunan",
              value: 1,
            },
            {
              label:
                "Berani ambil risiko, karena ingin investasi jangka panjang untuk dapat hasil yang lebih tinggi",
              value: 2,
            },
            {
              label:
                "Gw berani ambil resiko dengan investasi jangka panjang saya buat dapet hasil yang tinggi",
              value: 3,
            },
          ],
        },
        {
          no: 4,
          selected: null,
          addClass: "add-effect-fade",
          question: "Pilih salah satu skenario investasi yang kamu banget!",
          choose: [
            {
              label: "Nilai maksimal keuntungan 33% dan kerugian 12%",
              value: 0,
            },
            {
              label: "Nilai maksimal keuntungan 42% dan kerugian 15%",
              value: 1,
            },
            {
              label: "Nilai maksimal keuntungan 60% dan kerugian 30%",
              value: 2,
            },
            {
              label: "Nilai maksimal keuntungan 80% dan kerugian 50%",
              value: 3,
            },
          ],
        },
        {
          no: 5,
          selected: null,
          addClass: "add-effect-fade",
          question:
            "Apa saja portofolio investasi yang kamu miliki sampai saat ini?",
          choose: [
            {
              label: "kas atau setara kas (tabungan dan deposito berjangka)",
              value: 0,
            },
            {
              label:
                "kebanyakan di kas, beberapa investasi (property selain rumah tinggal, saham unggulan)",
              value: 1,
            },
            {
              label:
                "beberapa investasi, sebagian besar tidak di kas ( saham, obligasi, reksadana, property selain rumah tinggal)",
              value: 2,
            },
            {
              label:
                "campuran investasi termasuk yang spekulasi( opsi, reksadana beresiko tinggi, valuta asing, saham perusahaan kecil)",
              value: 3,
            },
          ],
        },
        {
          no: 6,
          selected: null,
          addClass: "add-effect-fade",
          question: "Berapa besar total investasi reksadana mu saat ini?",
          choose: [
            { label: "0-10%", value: 0 },
            { label: "11-15%", value: 1 },
            { label: "26-40%", value: 2 },
            { label: "lebih dari 40%", value: 3 },
          ],
        },
        {
          no: 7,
          selected: null,
          addClass: "add-effect-fade",
          question:
            "Apabila salah satu investasi mu mengalami kerugian sebesar 25% dari pokok, hal apa yang akan kamu lakukan?",
          choose: [
            {
              label:
                "jual secepatnya untuk mencegah kerugian lebih jauh “cut loss”",
              value: 0,
            },
            {
              label:
                "tahan dulu dan jual kalau harganya sudah naik lagi agar kembali “break even”",
              value: 1,
            },
            {
              label: "bertahan dengan investasi ini untuk jangka panjang",
              value: 2,
            },
            {
              label:
                "beli lebih banyak lagi, ini kesempatan untuk mendapatkan saham dengan harga lebih murah",
              value: 3,
            },
          ],
        },
      ],
    };
  },

  watch: {
    "skor.length"(newSkor, oldSkor) {
      if (this.skor.length <= 6) {
        if (this.$refs.content_question.length !== 0) {
          if (
            this.$refs.content_question[0].classList.contains("add-effect-fade")
          ) {
            this.$refs.content_question[0].classList.remove("add-effect-fade");
            setTimeout(() => {
              this.$refs.content_question[0].classList.add("add-effect-fade");
            }, 10);
          }
        }
      } else {
        const { label: kas } = this.findQuestion(this.skor, 6)[0];
        const txtLabel = this.findQuestion(this.skor, 4)[0].label;
        const pasarUang = txtLabel
          .split(" ")
          .filter((i) => i.match(/\d+/))
          .map((j) => parseInt(j.replace("%", "")))
          .reduce((acc, crv) => acc - crv);
        const { label: jangkaWaktu } = this.findQuestion(this.skor, 2)[0];
        this.profilRisiko = { kas, pasarUang, jangkaWaktu };
        const input = this.skor.map((data) => data.value);
        this.calculatorBodyProfilResiko.input = JSON.stringify(input);
        this.calculatorBodyProfilResiko.output = JSON.stringify(
          this.calculateSkor.tipe
        );

        this.calculateAndSaveResult();
      }
    },

    numberQuestion: function (newValue) {
      if (newValue > 7) {
        this.showNPS = true;
      }
    },
  },
};
</script>
