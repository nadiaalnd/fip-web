<template>
  <q-page>
    <section class="container q-pa-md">
      <h1 class="text-center q-mb-md">
        Selamat! Kamu telah mendapatkan Paket GRATIS 1 Minggu dari Finplan.
      </h1>
      <p>
        Terima kasih telah mengambil Paket Gratis 1 Minggu, kami senang memberikan gratis untuk Kamu.<br/>
        Berikut adalah video rekomendasi khusus untuk Kamu. Video berikut otomatis tersimpan dibookmark pada halaman <a href="/profile#Bookmark" target="_blank">profile</a>. Harap lihat <a href="/package/detail/langganan-1-minggu" target="_blank">keterangan dan ketentuan Video</a>.
      </p>
      <e-learning-player :slug="slug"/>
    </section>
    <section v-if="$q.platform.is.desktop"
      class="container item-package q-px-md q-py-md">
      <div class="row q-mb-md">
        <ItemProductLP
          class="col-12 col-sm-4 col-md-3"
          v-for="(product, idx) in products"
          :key="idx"
          :product="product"/>
      </div>
      <div class="text-center q-mt-md">
        <q-btn
          dense outline no-caps
          color="primary"
          class="q-px-md gtm-track"
          href="/e-learning"
          icon-right="chevron_right"
          label="Lihat Selengkapnya"
          gtm-action="btn_recommendation_see_more"/>
      </div>
    </section>
    <section 
      v-else
      class="item-product-list">
      <div
        ref="section-product"
        class="section-product">
        <div 
          style="display: inline-flex">
          <ItemProductLP
            v-for="(product, idx) in products"
            :key="'product-'+idx"
            :product="product"
            @bookmarked="(value) => {
              product.is_bookmarked = value
            }"
            ref="item-product"
            style="width: 320px"/>
        </div>
      </div>
      <div class="text-center q-mt-md">
        <q-btn
        dense outline no-caps
        color="primary"
        class="q-px-md"
        href="/e-learning"
        icon-right="chevron_right"
        label="Lihat Selengkapnya"
        gtm-action="btn_recommendation_see_more"/>
      </div>
    </section>
  </q-page>
</template>
<script>
import ItemProductLP from "src/components/items/ItemProductVideo.vue";
import ELearningPlayer from "src/components/videos/ELearningPlayer.vue";
import { defineComponent } from "vue";

export default defineComponent ({
  components: { ELearningPlayer, ItemProductLP },
  data () {
    return {
      setting: null,
      userProfile: null,
      products: [],
      slug: null
    }
  },

  created () {
    this.setupSetting(this.$utils.getSetting())
    this.$global.$on('setting', (setting) => {
      this.setupSetting(setting)
    })
  },

  mounted () {
    this.getAdditionalUserProfile()
  },

  methods: {
    setupSetting (setting) {
      this.setting = setting
      this.getSettingRecommendation()
    },
    getAdditionalUserProfile () {
      this.$services.user.getAdditionalUserProfile((data) => {
        if (data) {
          this.userProfile = data
          this.getSettingRecommendation()
        } else {
          this.$router.replace({
            name: 'e-learning-free-package'
          })
        }
      }, (msg, errors) => {
        this.$q.notify({
          message: "Maaf Anda tidak memiliki rekomendasi video",
          color: "negative"
        })
        this.$router.replace({
          name: 'e-learning-free-package'
        })
      }, () => {
      })
    },

    getSettingRecommendation () {
      if (this.setting && this.userProfile) {
        let freeClasses = JSON.parse(this.setting["Free Classes"])
        console.log(freeClasses)
        console.log(this.userProfile.recommendation)
        this.getRecommendationProducts(freeClasses[this.userProfile.recommendation])
      }
    },

    getRecommendationProducts (tag) {
      this.$services.product.get({
        tag: tag,
      }, (data) => {
        if (data.length > 8) {
          this.products = data.slice(0, 8)
        } else {
          this.products = data
        }
        this.slug = data[0].slug
      }, (msg, errors) => {
      }, () => {
      })
    }
  }
})
</script>