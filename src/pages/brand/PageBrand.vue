<template>
  <q-page id="page-brand">
    <div class="row flex">
      <div class="col-3 q-py-md q-mb-md" style="height: 700px">
        <div class="bg-black" style="width:100%;height:400px">
          test
        </div>
        <div class="bg-grey-5" style="height:95vh">
          <div class="q-pa-md text-bold">
            Special Feature
          </div>
          <div class="q-pa-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div>
            <q-btn
              flat no-caps dense
              class="q-ml-md"
              label="See More"/>
          </div>
        </div>
      </div>
      <div class="col-9 q-mb-md">
        <div class="container q-pa-md">
          <div class="row flex">
            <div class="col-4 q-py-md">
              <div class="bg-grey" style="width:100%; height:230px">.</div>
            </div>
            <div class="col-8 q-py-md">
              <div class="bg-black text-white">
                <div class="q-px-xl q-pt-xl">
                  Brand 1
                </div>
                <div class="q-px-xl text-h4">
                  The best way to wireframe a website
                </div>
                <div class="q-px-xl q-pb-xl">
                  <q-btn
                    flat no-caps dense
                    label="Read More"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row flex-center">
            <div class="col-12 col-sm-6 q-pa-md">
              <div class="bg-grey-4">
                <div class="text-bold q-pa-md">
                  Deskrip
                </div>
                <div class="q-px-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
                </div>
                <div class="q-px-md q-pb-md">
                  <q-btn
                    flat no-caps dense
                    color="primary"
                    label="Read More"/>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 q-pr-md">
              <div class="bg-grey-4">
                <div class="text-bold q-pa-md">
                  Keys to writing copy that actually converts and sells users
                </div>
                <div class="q-px-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
                </div>
                <div class="q-px-md q-pb-md">
                  <q-btn
                    flat no-caps dense
                    color="primary"
                    label="Read More"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section class="q-pa-md">
          <div class="container q-pa-lg bg-grey-4">
            <div class="f-text-title q-px-md q-mb-lg">
              Your Best Value Proposition
            </div>
            <div class="text-center text-weight-medium q-mb-lg">
              "If you don't try this app, you won't become the superhero you were meant to be"
            </div>
            <div class="row">
              <div
                v-for="(item, idx) in products"
                :key="idx"
                class="col-12 col-sm q-mr-md text-center">
                <!-- <img :src="item.img" class="full-width q-mb-md" style="max-width: 200px"/>
                <div class="text-left q-mb-sm text-bold">
                  {{item.title}}
                </div>
                <div class="text-left">
                  {{item.description}}
                </div>
                <div class="text-left q-pb-md">
                  <q-btn
                    flat no-caps dense
                    color="primary"
                    icon-right="arrow_right"
                    label="See More"/>
                </div> -->
                <q-card class="card-product row flex full-width full-height">
                  <div class="q-mt-md" style="margin-left:-7px">
                    <div class="text-bold --tag-sell-1">
                      Hot Sell
                      <!-- {{ item.type }} -->
                    </div>
                    <div class="--tag-sell-2"></div>
                  </div>
                  <div class="col-12" style="height:50px"></div>
                  <div class="col-12 text-right q-pa-md text-bold" style="font-size:20px">
                    Nama Produk
                    <!-- {{ item.product }} -->
                  </div>
                  <div class="col-12 text-center bg-white text-bold --price-tag-product">
                    Rp. 100.000
                    <!-- {{ item.price }} -->
                  </div>
                  <div class="text-center text-white q-pa-md --description-product">
                    <div class="q-mb-md">
                    Lorem ipsum dolor sit amet, consectetur adipiscing ... 
                    <!-- {{ item.description }} -->
                    </div>
                    <div class="text-center">
                      <q-btn
                        flat dense
                        color="white"
                        class="--btn-product"
                        label="Pilih"
                        @click="(e) => {
                            openItem(e, item)
                          }"
                        target="_blank"/>
                    </div>
                  </div>
                </q-card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageBrand',

  data () {
    return {

      products: [
        {
          img: "https://trakteer.id/images/mix/donation.png",
          title: "Product",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore..."
        },
        {
          img: "https://trakteer.id/images/mix/donation.png",
          title: "Product",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore..."
        },
        {
          img: "https://trakteer.id/images/mix/donation.png",
          title: "Product",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore..."
        },
        {
          img: "https://trakteer.id/images/mix/donation.png",
          title: "Product",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore..."
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
    console.log('secondary', process.env.API_URL)
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
    carouselItem (idx) {
      const i = idx - 1
      if (this.$q.platform.is.mobile) {
        return [this.creators[i]]
      }
      const j = i * 1
      const slices = this.creators.slice(j, j + 1)
      return slices
    }
  }
})
</script>
