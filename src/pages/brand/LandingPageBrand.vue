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
            <div class="text-body1 q-mb-xl f-tag">
              Sekarang zamannya anak muda melek <br/> informasi keuangan dan investasi! <br/>
              Ayo siapkan masa depanmu sekarang! 
            </div>
            <div class="q-pa-md q-mb-xl q-px-lg bg-secondary" style="width:fit-content;border-radius:10px;color: #555555">
              <div class="text-bold q-mb-sm" style="font-size:1rem;">
                1st Indonesian learn investment Community
              </div>
              <div>
                Bahas saham, Reksadana, emas, properti, NFT
              </div>
            </div>
            <div class="row q-mb-lg">
              <div class="col-6 col-sm-6 col-md-auto">
                <div class="blob yellow q-mr-md" style="display: inline-block;"></div>
                <a href="/e-learning" class="f-tag q-mr-lg">E-Learning </a>
              </div>
              <div class="col-6 col-sm-6 col-md-auto">
                <div class="blob yellow q-mr-md" style="display: inline-block;"></div>
                <a href="academy" class="f-tag q-mr-lg">Akademi </a>
              </div>
              <div class="col-6 col-sm-6 col-md-auto">
                <div class="blob yellow q-mr-md" style="display: inline-block;"></div>
                <a href="kamus" class="f-tag q-mr-lg">Kamus</a>
              </div>
              <div class="col-6 col-sm-6 col-md-auto">
                <div class="blob yellow q-mr-md" style="display: inline-block;"></div>
                <a href="kalkulator/personal/budget" class="f-tag">Kalkulator</a>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 q-px-md text-right">
            <img src="/images/hero-image-brand.png"
              style="max-width: calc(100% - 32px)"/>
          </div>
        </div>
      </div>
      </div>
      <section class="q-pt-lg">
        <div class="container">
            <div class="text-center q-px-md q-py-sm q-mb-md">
              <div class="f-text-title q-px-md q-mb-lg">
                Belajar Bersama Kami
              </div>
              <div class="text-body1 q-mb-md q-mx-auto" style="max-width:800px">
                Kamu bisa pelajari berbagai hal tentang finansial, mulai dari perencanaan keuangan sampai investasi dengan detail mendasar oleh para pemateri terbaik secara asyik dan menarik.
              </div>
              <a href="/e-learning" class="text-body1 float-right" style="color:#000000">Lihat lainnya <q-icon name="arrow_forward_ios" class="float-right q-ml-sm q-mr-md q-mt-sm" size="14px" /></a>
            </div>
          </div>
      </section>
    </div>
    <div class="container item-package q-px-md q-py-md">
      <div class="row justify-between">
        <ItemProductLP
          class="col-12 col-sm-6 col-md-4 q-px-md q-py-md text-center" style="background-color: transparent;"
          v-for="(product, idx) in products"
          :key="idx"
          :product="product"/>
      </div>
    </div>
    <section class="q-py-lg">
      <div class="container">
        <div
          v-for="(item, idx) in advantage"
          :key="idx"
          class="how-to-item row q-py-lg q-px-md q-py-xl" style="min-height: 570px">
          <div class="col-12 col-md-4 col-sm-12 q-my-auto">
            <div class="q-px-md how-to-text">
              <div class="text-bold q-mb-lg" style="color: #555555; font-size: 40px">
                {{item.title}}<span class="text-secondary">.</span>
              </div>
              <div class="q-mb-lg text-body1 f-tag" style="font-weight: 400;">
                {{item.description}}
              </div>
              <div class="bg-secondary" style="width:100px;height:10px;border-radius:10px">
              </div>
            </div>
          </div>
          <div class="col-12 col-md-8 col-sm-12 bg-vector">
            <div class="row justify-center q-px-md text-center image-advantage" style="min-height: 270px; ">
              <div class="col-12 col-xs-12 col-sm-6 col-md-6">
                <q-card class="my-card bg-secondary q-px-lg q-py-xl q-mt-md" style="max-width:350px; border-radius:20px; border: 8px solid #F7F7F7; box-shadow: -40px 40px 50px 0px #55555524;">
                  <div class="q-mx-auto q-mb-lg" style="max-width:268px; height:148px">
                    <img
                      :src="item.img_content1 "
                    />
                  </div>
                  <div class="q-mt-lg text-body2 text-weight-regular text-left">
                    {{ item.content1 }} <span><a href="/e-learning" style="color: #3469A7">cek di sini</a></span>
                  </div>
                </q-card>
              </div>
              <div class="col-12 col-xs-12 col-sm-6 col-md-6">
                <q-card class="my-card bg-secondary q-px-lg q-py-xl q-mt-md" style="max-width:350px; border-radius:20px; border: 8px solid #F7F7F7; box-shadow: -40px 40px 50px 0px #55555524;">
                  <div class="q-mx-auto q-mb-lg" style="max-width:268px; height:148px">
                    <img
                      :src="item.img_content2"
                    />
                  </div>
                  <div class="q-mt-lg text-body2 text-weight-regular text-left">
                    {{ item.content2 }} <span><a href="/e-learning" style="color: #3469A7">cek di sini</a></span>
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
          <div class="text-bold q-px-lg q-mb-md text-grey" style="font-size: 40px">
            Terima Kasih Telah <span class="text-blue">Mempercayai</span>
          </div>
          <div class="text-h3 text-bold text-grey q-px-lg q-pb-xl" style="font-size: 40px">
            <span class="text-blue">Kami</span>.
          </div>
        </div>
        <div class="row justify-between">
          <div 
          v-for="(item, idx) in achievement"
          :key="idx"
          class="col-12 col-xs-12 col-sm-6 col-md-3 q-px-lg q-py-md text-center">
            <q-card class="my-card q-px-lg q-py-lg" style="height: 200px; background-color: #FFFBFB; border-radius: 16px; box-shadow: 50px 50px 60px 0px #55555514;" >
              <div class="q-mx-auto q-mb-md q-mt-md" style="width:76px; height:70px">
                <img
                  :src="item.img"
                />
              </div>
              <div class="text-h4 q-mt-md q-pa-sm" style="color: #888888;">{{ item.numbers }}</div>
            </q-card>
            <div class="text-h6 text-center q-my-lg" style="color: #888888;">{{ item.title }}</div>
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
        <div class="bg-ellipse-pattern-testi q-px-md q-mb-lg q-mt-xl text-grey text-bold text-center" style="font-size: 40px">
          Apa Kata Pengguna <span class="text-secondary">Finplan</span> ?
          <div class="text-body1 text-center text-weight-medium text-grey q-mb-lg q-px-md">
            Kita akan berlari ditemani para pengguna lain di Finplan.id. Akan banyak ilmu baru dan inspiratif.
          </div>
        </div>
        <div class="row q-pa-lg q-mb-xl">
          <div
            v-for="(item, idx) in testimonies"
            :key="idx"
            class="col-12 col-xs-12 col-sm-6 col-md-3 q-px-md q-py-lg text-center">
            <div class="q-mb-lg" style="border-radius: 16px; background-color: #fff0b3;">
              <img :src="item.img" class="q-my-auto q-py-lg" style="max-width: 270px; border-radius: 16px;"/>
            </div>
            <div class="text-subtitle1 text-bold Text-grey text-left q-mb-sm text-bold">
              {{ item.name }}
            </div>
            <div class="text-left text-bold q-mb-sm" style="color:#FF5555">
              {{ item.job }}
            </div>
            <div class="text-left text-bold" style="color:#888888">
              {{ item.comment }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="q-py-lg" id="section-partner">
      <div class="container text-center">
        <div class="q-mb-sm q-mt-xl text-grey text-bold" style="font-size: 40px">
          Collaborated Partners
        </div>
        <div class="bg-secondary q-mb-xl" style="width:150px;height:10px;border-radius:10px; display:inline-block"></div>
        <div class="bg-secondary q-ml-md q-mb-xl" style="width:55px;height:10px;border-radius:10px; display:inline-block"></div>

        <div class="block-item-text">
        <input type="checkbox" hidden class="read-more-state" id="read-more">
        <div class="row items-center justify-center read-more-wrap q-mb-lg">
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
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_11.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_12.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_13.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_14.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_15.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_16.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_17.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_18.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_19.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_20.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_21.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_22.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_23.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_24.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_25.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_26.png"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_27.png" style="max-width: 298px"/>
          </div>
          <div class="col-auto q-py-sm q-px-lg read-more-target">
            <img src="images/media-partners/mp_28.png"/>
          </div>
        </div>
        <label for="read-more" class="read-more-trigger_closed text-blue text-bold text-h6">+ Read More</label>
        <label for="read-more" class="read-more-trigger_opened text-blue text-bold text-h6">- Read Less</label>
      </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import ItemProductLP from 'src/components/items/ItemProductLP.vue';
import { defineComponent } from 'vue';
// import ItemProduct from 'components/items/ItemProduct';

export default defineComponent({
  name: 'LandingPageBrand',
  components: {
    ItemProductLP
},

  data () {
    return {
      carousel_creator: 1,
      carousel_comment: 1,

      products: [],

      advantage: [
        {
          img: 'https://trakteer.id/images/mix/share-page-step-1.png',
          title: 'Harga yang Relatif Terjangkau',
          description: 'Hanya modal mulai Rp 40.000 saja, kamu sudah bisa mengakses  beragam video edukatif dan eksklusif seputar investasi yang bersertifikat. Cocok  dengan kantong mahasiswa pastinya!',
          img_content1: 'images/illustration/illus-brand-keunggulan1a.svg',
          content1: 'Kami juga punya diskon untuk kamu, biar makin  semangat belajar!',
          img_content2: 'images/illustration/illus-brand-keunggulan1b.svg',
          content2: 'Metode pembayaran yang anti ribet dan cepat. '
        },
        {
          img: 'https://trakteer.id/images/mix/how-it-work-step-2.png',
          title: 'Belajar Fleksibel Sesuai Jadwalmu',
          description: 'Belajar kapan pun, di mana pun, secara mandiri dengan pemateri terbaik. Bebas memilih kelas sesuai minat belajar. Akses tanpa batas ke kelas dan forum diskusi bersama expert keuangan.',
          img_content1: 'images/illustration/illus-brand-keunggulan2a.svg',
          content1: 'Pelajari perencanaan keuangan kapan saja dan dimana saja',
          img_content2: 'images/illustration/illus-brand-keunggulan2b.svg',
          content2: 'Mulai investasi pertamamu di saham, reksadana, emas, dan lainnya!'
        },
      ],

      top_products: [
        {
          img: 'images/example-package-brand.svg',
          category: 'Saham',
          modul: 'Modul 1.1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing ...'
        },
        {
          img: 'images/example-package-brand.svg',
          category: 'Saham',
          modul: 'Modul 1.1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing ...'
        },
        {
          img: 'images/example-package-brand.svg',
          category: 'Saham',
          modul: 'Modul 1.1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing ...'
        },
      ],

      achievement: [
        {
          img: 'images/icons/ic_pengikut.svg',
          numbers: '140 Rb +',
          title: 'Pengikut di social media',
        },
        {
          img: 'images/icons/ic_konten.svg',
          numbers: '3000 +',
          title: 'Konten edukatif dengan berbagai topik',
        },
        {
          img: 'images/icons/ic_subscriber.svg',
          numbers: '6 jt +',
          title: 'Orang tercerdaskan oleh konten Finplan.id',
        },
        {
          img: 'images/icons/ic_orang.svg',
          numbers: '30 +',
          title: 'Brand yang sudah bekerja sama',
        },
      ],

      testimonies: [
        {
          img: "images/pelanggan.png",
          name: "Nama Pelanggan",
          job: "Pekerjaan Pelanggan", 
          comment: "komentar pelanggan yang singkat dan padat"
        },
        {
          img: "images/pelanggan.png",
          name: "Nama Pelanggan",
          job: "Pekerjaan Pelanggan", 
          comment: "komentar pelanggan yang singkat dan padat"
        },
        {
          img: "images/pelanggan.png",
          name: "Nama Pelanggan",
          job: "Pekerjaan Pelanggan", 
          comment: "komentar pelanggan yang singkat dan padat"
        },
        {
          img: "images/pelanggan.png",
          name: "Nama Pelanggan",
          job: "Pekerjaan Pelanggan", 
          comment: "komentar pelanggan yang singkat dan padat"
        }
      ],

      categories: [
          { label: "Highlight", active: true },
          { label: "Gaming" },
          { label: "Art" },
          { label: "Writing" },
          { label: "Streaming" },
          { label: "Cosplay" },
          { label: "Other" }
      ],

      creators: [{
        bg: "https://trakteer.id/storage/images/cover/cvr-ZoWYZMVbH4cxgGD4ZO87xmhGSBRoAGbq1574154935.jpg",
        ava: "https://trakteer.id/storage/images/avatar/ava-dP0ecOrFUlQzWBjiTULUJfGUfHwoVDub1606810396.png",
        name: "Cerry Belle 1",
        username: "@cerrybelle",
        bio: "Yume Reality 🐹"
      }],

      comments: [{
        comment: 'Terima kasih trakteer dengan web ini bisa bantu temen temen yang mau dukung aku terus berkarya, karena bisa pake gopay bisa mempermudah temen temen buat trakteer kami',
        img: 'https://trakteer.id/storage/images/avatar/ava-hMlpYl8EkK1drEcuGLmRT6lFzv0sBXLK1569229726.jpeg',
        name: 'Amu',
        categories: 'fanart / design / makeup'
      }],

      faqs: [{
        q: '',
        a: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid.',
      }],

      activities: [{
        img: 'https://lh3.googleusercontent.com/a-/AOh14GhERyjd4wg1EhaOjWTfXWL2qF-_gYwheDYkuWG7SQ=s96-c',
        name: 'John Doe',
        activity: 'Baru saja ditraktir <span class="text-bold text-primary">1 kopi</span> oleh <span class="text-bold text-primary">Santi</span>',
        time: '1 Menit yang lalu'
      }]
    }
  },

  computed: {
    creatorSlides () {
      const total = this.$q.platform.is.mobile ? this.creators.length : Math.ceil(this.creators.length / 3)
      if (total > 9) {
        return 9
      }
      return total
    }
  },

  mounted () {
    try {
      document.getElementById('first-spinner').style.display = 'none'
    } catch (e) {
    }
    this.getProducts()
    for (let i = 1; i < 12; i++) {
      this.creators.push({
        bg: "https://trakteer.id/storage/images/cover/cvr-ZoWYZMVbH4cxgGD4ZO87xmhGSBRoAGbq1574154935.jpg",
        ava: "https://trakteer.id/storage/images/avatar/ava-dP0ecOrFUlQzWBjiTULUJfGUfHwoVDub1606810396.png",
        name: "Cerry Belle " + (i + 1),
        username: "@cerrybelle",
        bio: "Yume Reality 🐹"
      })
      this.activities.push({
        img: 'https://lh3.googleusercontent.com/a-/AOh14GhERyjd4wg1EhaOjWTfXWL2qF-_gYwheDYkuWG7SQ=s96-c',
        name: 'John Doe',
        activity: 'Baru secondary secondaryx secondary saja ditraktir <span class="text-bold text-primary">1 kopi</span> oleh <span class="text-bold text-primary">Santi</span>',
        time: '1 Menit yang lalu'
      })
      if (i < 7) {
        this.faqs.push({
          q: '',
          a: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid.',
        })
        if (i < 4) {
          this.comments.push({
            comment: 'Terima kasih trakteer dengan web ini bisa bantu temen temen yang mau dukung aku terus berkarya, karena bisa pake gopay bisa mempermudah temen temen buat trakteer kami',
            img: 'https://trakteer.id/storage/images/avatar/ava-hMlpYl8EkK1drEcuGLmRT6lFzv0sBXLK1569229726.jpeg',
            name: 'Amu',
            categories: 'fanart / design / makeup'
          })
        }
      }
    }
  },

  methods: {
    creatorItems (idx) {
      const i = idx - 1
      if (this.$q.platform.is.mobile) {
        return [this.creators[i]]
      }
      const j = i * 3
      const slices = this.creators.slice(j, j + 3)
      return slices
    },

    // get products / products
    getProducts () {
      this.$services.product.get({
        tag: 'Landing Page',
      }, (data) => {
        data.forEach((item, i) => {
          item.thumbnail = process.env.API_URL_IMG + item.thumbnail
        })

        this.products = data
      }, (msg, errors) => {
      }, () => {
      })
    }
  }
})
</script>
