<template>
  <q-page id="landing-brand">
    <div class="bg-package">
      <div class="q-pb-xl">
        <div class="container">
          <div class="row flex-center">
            <div class="col-12 col-sm-6 q-px-md q-py-xl">
              <div class="f-text-header text-left q-mb-xl">
                <div class="q-mb-md">Yang Muda</div>
                <div>Yang Kaya</div>
              </div>
              <div class="text-body1 q-mb-xl">
                Sekarang zamannya anak muda melek <br />
                informasi keuangan dan investasi! <br />
                Ayo siapkan masa depanmu sekarang!
              </div>
              <div
                class="q-pa-md q-mb-xl q-px-lg bg-secondary"
                style="width: fit-content; border-radius: 10px; color: #555555"
              >
                <div class="text-bold q-mb-sm" style="font-size: 1rem">
                  1st Indonesian learn investment Community
                </div>
                <div>Bahas saham, Reksadana, emas, properti, NFT</div>
              </div>
              <div class="row q-mb-lg">
                <div class="col-6 col-sm-6 col-md-auto">
                  <div
                    class="blob yellow q-mr-md"
                    style="display: inline-block"
                  ></div>
                  <a href="/e-learning" class="f-tag q-mr-lg">E-Learning </a>
                </div>
                <div class="col-6 col-sm-6 col-md-auto">
                  <div
                    class="blob yellow q-mr-md"
                    style="display: inline-block"
                  ></div>
                  <a href="academy" class="f-tag q-mr-lg">Akademi </a>
                </div>
                <div class="col-6 col-sm-6 col-md-auto">
                  <div
                    class="blob yellow q-mr-md"
                    style="display: inline-block"
                  ></div>
                  <a href="kamus" class="f-tag q-mr-lg">Kamus</a>
                </div>
                <div class="col-6 col-sm-6 col-md-auto">
                  <div
                    class="blob yellow q-mr-md"
                    style="display: inline-block"
                  ></div>
                  <a href="kalkulator/personal/budget" class="f-tag"
                    >Kalkulator</a
                  >
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 q-px-md text-right">
              <img
                src="/images/hero-image-brand.png"
                style="max-width: calc(100% - 32px)"
              />
            </div>
          </div>
        </div>
      </div>
      <section class="q-pt-lg">
        <div class="container">
          <div class="text-center q-px-md q-py-sm q-mb-md">
            <div class="f-text-title q-px-md q-mb-lg">Belajar Bersama Kami</div>
            <div class="text-body1 q-mb-md q-mx-auto" style="max-width: 800px">
              Kamu bisa pelajari berbagai hal tentang finansial, mulai dari
              perencanaan keuangan sampai investasi dengan detail mendasar oleh
              para pemateri terbaik secara asyik dan menarik.
            </div>
          </div>
        </div>
      </section>
      <dialog-nps v-if="sNPS" :showNPS="sNPS" :section="`landingpage`" />
    </div>
    <section
      v-if="$q.platform.is.desktop"
      class="container item-package q-px-md q-py-md"
    >
      <div class="row q-mb-md">
        <ItemProductLP
          class="col-12 col-sm-4 col-md-3"
          v-for="(product, idx) in products"
          :key="idx"
          :product="product"
        />
      </div>
      <div class="text-center q-mt-md gtm-track">
        <q-btn
          dense outline no-caps
          color="primary"
          class="q-px-md gtm-track"
          href="/e-learning"
          icon-right="chevron_right"
          label="Lihat Lainnya"
          gtm-action="btn_landing_product_see_more"/>
      </div>
    </section>
    <section v-else class="item-product-list">
      <div ref="section-product" class="section-product">
        <div style="display: inline-flex">
          <ItemProductLP
            v-for="(product, idx) in products"
            :key="'product-' + idx"
            :product="product"
            @bookmarked="
              (value) => {
                product.is_bookmarked = value;
              }
            "
            ref="item-product"
            style="width: 320px"
          />
        </div>
      </div>
      <div class="text-center q-mt-md">
        <q-btn
          dense outline no-caps
          color="primary"
          class="q-px-md"
          href="/e-learning"
          icon-right="chevron_right"
          label="Lihat Lainnya"
          gtm-action="btn_landing_product_see_more"/>
      </div>
    </section>
    <section class="q-py-lg">
      <div class="container">
        <div
          v-for="(item, idx) in advantage"
          :key="idx"
          class="how-to-item row q-py-lg q-px-md q-py-xl"
          style="min-height: 570px"
        >
          <div class="col-12 col-md-4 col-sm-12 q-my-auto">
            <div class="q-px-md how-to-text">
              <div
                class="text-bold q-mb-lg"
                style="color: #555555; font-size: 40px"
              >
                {{ item.title }}<span class="text-secondary">.</span>
              </div>
              <div class="q-mb-lg text-body1 f-tag" style="font-weight: 400">
                {{ item.description }}
              </div>
              <div
                class="bg-secondary"
                style="width: 100px; height: 10px; border-radius: 10px"
              ></div>
            </div>
          </div>
          <div class="col-12 col-md-8 col-sm-12 bg-vector">
            <div
              class="row justify-center q-px-md text-center image-advantage"
              style="min-height: 270px"
            >
              <div class="col-12 col-xs-12 col-sm-6 col-md-6">
                <q-card
                  class="my-card bg-secondary q-px-lg q-py-xl q-mt-md"
                  style="
                    max-width: 350px;
                    border-radius: 20px;
                    border: 8px solid #f7f7f7;
                    box-shadow: -40px 40px 50px 0px #55555524;
                  "
                >
                  <div
                    class="q-mx-auto q-mb-lg"
                    style="max-width: 268px; height: 148px"
                  >
                    <img :src="item.img_content1" />
                  </div>
                  <div class="q-mt-lg text-body2 text-weight-regular text-left">
                    {{ item.content1 }}
                    <span
                      ><a href="/e-learning" style="color: #3469a7"
                        >cek di sini</a
                      ></span
                    >
                  </div>
                </q-card>
              </div>
              <div class="col-12 col-xs-12 col-sm-6 col-md-6">
                <q-card
                  class="my-card bg-secondary q-px-lg q-py-xl q-mt-md"
                  style="
                    max-width: 350px;
                    border-radius: 20px;
                    border: 8px solid #f7f7f7;
                    box-shadow: -40px 40px 50px 0px #55555524;
                  "
                >
                  <div
                    class="q-mx-auto q-mb-lg"
                    style="max-width: 268px; height: 148px"
                  >
                    <img :src="item.img_content2" />
                  </div>
                  <div class="q-mt-lg text-body2 text-weight-regular text-left">
                    {{ item.content2 }}
                    <span
                      ><a href="/e-learning" style="color: #3469a7"
                        >cek di sini</a
                      ></span
                    >
                  </div>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="q-py-lg q-my-xl">
      <div class="container q-px-md bg-ellipse-pattern">
        <div class="bg-vector-half">
          <div
            class="text-bold q-px-lg q-mb-md text-grey"
            style="font-size: 40px"
          >
            Terima Kasih Telah <span class="text-blue">Mempercayai</span>
          </div>
          <div
            class="text-h3 text-bold text-grey q-px-lg q-pb-xl"
            style="font-size: 40px"
          >
            <span class="text-blue">Kami</span>.
          </div>
        </div>
        <div class="row justify-between">
          <div
            v-for="(item, idx) in achievement"
            :key="idx"
            class="col-12 col-xs-12 col-sm-6 col-md-3 q-px-lg q-py-md text-center"
          >
            <q-card
              class="my-card q-px-lg q-py-lg"
              style="
                height: 200px;
                background-color: #fffbfb;
                border-radius: 16px;
                box-shadow: 50px 50px 60px 0px #55555514;
              "
            >
              <div class="q-mx-auto q-mb-md q-mt-md">
                <img :src="item.img" />
              </div>
              <div class="text-h4 q-mt-md q-pa-sm" style="color: #424242">
                {{ item.numbers }}
              </div>
            </q-card>
            <div class="text-h6 text-center q-my-lg" style="color: #424242">
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <section id="section-promo" class="q-py-lg q-my-xl" style="background-color: #FEF8F8">
      <div class="container">
        <div class="row --promo-container q-px-xl">
          <div class="row --content-container q-py-sm">
            <div
              class="--rating q-px-md q-py-sm bg-secondary text-bold">
              4.4
            </div>
            <div class="--content q-px-lg">
              <div class="q-mb-md --title">
                Banner Promosi
              </div>
              <div class="row --description">
                <div class="col-sm-12 col-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <div class="col-sm-12 col-md-auto">
                  <q-btn
                  unelevated no-caps dense
                  class="btn-secondary text-bold q-px-md q-mt-sm"
                  label="Lihat Promo"
                  style="height: 40px; border-radius: 0px; box-shadow: none;"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <section class="q-py-xl q-mb-lg">
      <div class="container">
        <div
          class="bg-ellipse-pattern-testi q-px-md q-mb-lg q-mt-xl text-grey text-bold text-center"
          style="font-size: 40px"
        >
          Apa Kata Pengguna <span class="text-secondary">Finplan</span> ?
          <div
            class="text-body1 text-center text-weight-medium text-grey q-mb-lg q-px-md"
          >
            Kita akan berlari ditemani para pengguna lain di Finplan.id. Akan
            banyak ilmu baru dan inspiratif.
          </div>
        </div>
        <div class="row q-pa-lg q-mb-xl">
          <div
            v-for="(item, idx) in testimonies"
            :key="idx"
            class="col-6 col-md-3 q-px-md q-py-lg text-center"
          >
            <div
              class="q-mb-lg"
              style="border-radius: 16px; background-color: #fff0b3"
            >
              <img
                :src="item.img"
                class="q-my-auto q-py-lg"
                style="max-width: 270px; border-radius: 16px"
              />
            </div>
            <div
              class="text-subtitle1 text-bold Text-grey text-left q-mb-sm text-bold"
            >
              {{ item.name }}
            </div>
            <!-- <div class="text-left text-bold q-mb-sm" style="color:#FF5555">
              {{ item.job }}
            </div> -->
            <div class="text-left" style="color: #424242">
              {{ item.comment }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="q-py-lg" id="section-partner">
      <div class="container text-center">
        <div
          class="q-mb-sm q-mt-xl text-grey text-bold"
          style="font-size: 40px"
        >
          Collaborated Partners
        </div>
        <div
          class="bg-secondary q-mb-xl"
          style="
            width: 150px;
            height: 10px;
            border-radius: 10px;
            display: inline-block;
          "
        ></div>
        <div
          class="bg-secondary q-ml-md q-mb-xl"
          style="
            width: 55px;
            height: 10px;
            border-radius: 10px;
            display: inline-block;
          "
        ></div>

        <div class="block-item-text">
        <div class="row items-center justify-center see-more-wrap q-mb-lg">
          <div class="col-auto q-py-sm q-px-lg">
            <img src="images/media-partners/mp_1.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg">
            <img src="images/media-partners/mp_2.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg">
            <img src="images/media-partners/mp_3.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg">
            <img src="images/media-partners/mp_4.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg">
            <img src="images/media-partners/mp_5.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg">
            <img src="images/media-partners/mp_6.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg">
            <img src="images/media-partners/mp_7.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg">
            <img src="images/media-partners/mp_8.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg">
            <img src="images/media-partners/mp_9.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg">
            <img src="images/media-partners/mp_10.png"/>
          </div>
          <template v-if="seeMore">
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_11.png"/>
            </div>
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_12.png"/>
            </div>
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_13.png"/>
            </div>
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_14.png"/>
            </div>
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_15.png"/>
            </div>
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_16.png"/>
            </div>
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_17.png"/>
            </div>
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_18.png"/>
            </div>
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_19.png"/>
            </div>
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_20.png"/>
            </div>
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_21.png"/>
            </div>
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_22.png"/>
            </div>
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_23.png"/>
            </div>
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_24.png"/>
            </div>
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_25.png"/>
            </div>
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_26.png"/>
            </div>
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_27.png" style="max-width: 298px"/>
            </div>
            <div class="col-auto q-py-sm q-px-lg">
              <img src="images/media-partners/mp_28.png"/>
            </div>
          </template>
        </div>
        <label v-if="!seeMore" class="text-blue text-bold text-h6 cursor-pointer" @click="seeMore = true">+ See More</label>
        <label v-if="seeMore" class="text-blue text-bold text-h6 cursor-pointer" @click="seeMore = false">- See Less</label>
      </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import ItemProductLP from "src/components/items/ItemProductLP.vue";
import { defineComponent } from "vue";
// import ItemProduct from 'components/items/ItemProduct';
import DialogNPS from "src/components/dialogs/DialogNPS.vue";

export default defineComponent({
  name: "LandingPageBrand",
  components: {
    ItemProductLP,
    "dialog-nps": DialogNPS,
  },

  data() {
    return {
      seeMore: false,

      carousel_creator: 1,
      carousel_comment: 1,

      products: [],

      advantage: [
        {
          title: "Harga yang Relatif Terjangkau",
          description:
            "Hanya modal mulai Rp 40.000 saja, kamu sudah bisa mengakses  beragam video edukatif dan eksklusif seputar investasi yang bersertifikat. Cocok  dengan kantong mahasiswa pastinya!",
          img_content1: "images/illustration/illus-brand-keunggulan1a.svg",
          content1:
            "Kami juga punya diskon untuk kamu, biar makin  semangat belajar!",
          img_content2: "images/illustration/illus-brand-keunggulan1b.svg",
          content2: "Metode pembayaran yang anti ribet dan cepat. ",
        },
        {
          title: "Belajar Fleksibel Sesuai Jadwalmu",
          description:
            "Belajar kapan pun, di mana pun, secara mandiri dengan pemateri terbaik. Bebas memilih kelas sesuai minat belajar. Akses tanpa batas ke kelas dan forum diskusi bersama expert keuangan.",
          img_content1: "images/illustration/illus-brand-keunggulan2a.svg",
          content1: "Pelajari perencanaan keuangan kapan saja dan dimana saja",
          img_content2: "images/illustration/illus-brand-keunggulan2b.svg",
          content2:
            "Mulai investasi pertamamu di saham, reksadana, emas, dan lainnya!",
        },
      ],

      top_products: [
        {
          img: "images/example-package-brand.svg",
          category: "Saham",
          modul: "Modul 1.1",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing ...",
        },
        {
          img: "images/example-package-brand.svg",
          category: "Saham",
          modul: "Modul 1.1",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing ...",
        },
        {
          img: "images/example-package-brand.svg",
          category: "Saham",
          modul: "Modul 1.1",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing ...",
        },
      ],

      achievement: [
        {
          img: "images/icons/ic_pengikut.svg",
          numbers: "140 Rb +",
          title: "Pengikut di social media",
        },
        {
          img: "images/icons/ic_konten.svg",
          numbers: "3000 +",
          title: "Konten edukatif dengan berbagai topik",
        },
        {
          img: "images/icons/ic_subscriber.svg",
          numbers: "6 jt +",
          title: "Orang tercerdaskan oleh konten Finplan.id",
        },
        {
          img: "images/icons/ic_orang.svg",
          numbers: "30 +",
          title: "Brand yang sudah bekerja sama",
        },
      ],

      testimonies: [
        {
          img: "images/avatar/chasanah.svg",
          name: "S. Chasanah",
          // job: "Pekerjaan Pelanggan",
          comment:
            "Cara penyampaian dari beliau bisa dengan mudah untuk dimengerti oleh saya sendiri",
        },
        {
          img: "images/avatar/fikri.svg",
          name: "Fikri M. A.",
          // job: "Pekerjaan Pelanggan",
          comment: "Materinya mudah dipahami",
        },
        {
          img: "images/avatar/bagus.svg",
          name: "Bagus Aji",
          // job: "Pekerjaan Pelanggan",
          comment:
            "Dalam berinvestasi itu harus benar-benar tahu apa tujuan yang akan dicapai",
        },
        {
          img: "images/avatar/arianto.svg",
          name: "D. Arianto Putra",
          // job: "Pekerjaan Pelanggan",
          comment:
            "Mantap sekali penjelasan jadi paham tentang tipe tipe orang menggunakan uangnya	",
        },
      ],

      //Scroll
      totalHeight: 0,
      scrollPosition: 0,
      scrollPercentage: 0,

      //NPS
      sNPS: false,
    };
  },

  computed: {
    creatorSlides() {
      const total = this.$q.platform.is.mobile
        ? this.creators.length
        : Math.ceil(this.creators.length / 3);
      if (total > 9) {
        return 9;
      }
      return total;
    },
  },

  mounted() {
    try {
      document.getElementById("first-spinner").style.display = "none";
    } catch (e) {}
    this.getProducts();

    var body = document.body,
      html = document.documentElement;

    var height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    //Scroll Event
    this.totalHeight = height;
    window.addEventListener("scroll", this.updateScrollPercentage);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.updateScrollPercentage);
  },

  methods: {
    creatorItems(idx) {
      const i = idx - 1;
      if (this.$q.platform.is.mobile) {
        return [this.creators[i]];
      }
      const j = i * 3;
      const slices = this.creators.slice(j, j + 3);
      return slices;
    },

    // get products / products
    getProducts() {
      this.$services.product.get(
        {
          tag: "Modul 1",
        },
        (data) => {
          if (data.length > 8) {
            this.products = data.slice(0, 8);
          } else {
            this.products = data;
          }
        },
        (msg, errors) => {},
        () => {}
      );
    },

    updateScrollPercentage() {
      this.scrollPosition = document.documentElement.scrollTop;
      this.scrollPercentage = (this.scrollPosition / this.totalHeight) * 100;
    },
  },

  watch: {
    scrollPercentage: function (newValue) {
      if (newValue >= 60) {
        this.sNPS = true;
      }
    },
  },
});
</script>
