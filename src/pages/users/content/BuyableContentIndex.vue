<template>
  <q-page class="q-py-md">
    <template
      v-if="otherDetails && otherDetails.iframe">
      <div class="container q-px-md">
        <div class="content-header q-mb-lg flex flex-center">
          <h1 class="content-title text-primary q-ma-none text-bold inline-block flex-1">
            {{content.name}}
          </h1>
          <!-- <q-icon color="amber-8" name="star" size="28px"/> -->
          <template
            v-if="false">
            <img height="28" width="28" src="/images/star-fill.svg"/>
            <span class="q-ml-sm text-primary vertical-middle text-bold" style="font-size: 20px;">{{$utils.getRating(content)}}</span>
            <span class="q-ml-sm text-light vertical-middle" style="font-size: 20px;">({{$utils.getRatingCnt(content)}})</span>
          </template>
          <q-btn
            size="sm"
            class="q-ml-sm"
            dense flat
            color="dark"
            icon="img:/images/share.svg"
            @click="$refs.dialogShare.show()"/>
          <q-btn
            size="sm"
            class="q-ml-sm"
            dense flat
            color="dark"
            :icon="content.is_bookmarked === 1 ? 'bookmark' : 'bookmark_border'"
            @click="bookmarkProduct"/>
        </div>
      </div>
      <div
        v-html="otherDetails.iframe" class="flex-1 container q-py-md"/>
        <!-- iframe pendaftaran -->
    </template>
    <div
      v-else
      class="container">
      <div class="row flex-reverse-responsive" style="justify-content: center">
        <div class="col-12 col-sm-5 col-md-4 q-px-md q-mb-md">
          <q-card>
            <img
              class="text-center"
              :src="content.thumbnail"
              style="width: 100%"/>
            <div
              v-if="content.is_paid == 0 && content.price_ori != 0"
              class="price row flex-center q-pa-md">
              <div v-if="content.price_ori != 0" class="text-right q-pr-md">
                <div v-if="content.price_sell != content.price_ori" class="--discount text-red" style="font-size: 12px">Rp {{content.price_ori}}</div>
                <div class="--ori">Rp {{content.price_sell}}</div>
              </div>
              <div class="flex-1">
                <q-btn
                  dense unelevated no-caps push
                  class="full-width q-px-sm btn-secondary"
                  color="primary"
                  :label="$route.meta.buy_label"
                  @click="buyClass"/>
              </div>
            </div>
          </q-card>
        </div>
        <div class="col-12 col-sm-7 col-md-8 q-px-md">
          <div class="content-header q-mb-lg flex flex-center">
            <h1 class="content-title text-primary q-ma-none text-bold inline-block flex-1">
              {{content.name}}
            </h1>
            <!-- <q-icon color="amber-8" name="star" size="28px"/> -->
            <template
              v-if="false">
              <img height="28" width="28" src="/images/star-fill.svg"/>
              <span class="q-ml-sm text-primary vertical-middle text-bold" style="font-size: 20px;">{{$utils.getRating(content)}}</span>
              <span class="q-ml-sm text-light vertical-middle" style="font-size: 20px;">({{$utils.getRatingCnt(content)}})</span>
            </template>
            <q-btn
              size="sm"
              class="q-ml-sm"
              dense flat
              color="dark"
              icon="img:/images/share.svg"
              @click="$refs.dialogShare.show()"/>
            <q-btn
              size="sm"
              class="q-ml-sm"
              dense flat
              color="dark"
              :icon="content.is_bookmarked === 1 ? 'bookmark' : 'bookmark_border'"
              @click="bookmarkProduct"/>
          </div>
          <!-- <div class="price text-right">
            <div v-if="content.price_ori != 0">
              <span class="--ori">Rp {{content.price_sell}}</span>
              <span v-if="content.price_sell != content.price_ori" class="--discount">Rp {{content.price_ori}}</span>
            </div>
            <div v-else>
              <span class="--ori">Gratis</span>
            </div>
          </div> -->
          <div
            v-if="content.is_paid"
            class="q-pa-md q-my-md border-primary">
            <div v-html="lockedContent"
              class="v-html-no-margin">
            </div>
          </div>
          <div class="text-dark text-bold q-mb-sm">
            Mengenai {{$route.meta.name}} Ini
          </div>
          <p v-html="content.description">
          </p>
          <template v-if="otherDetails">
            <div
              class="v-html-no-margin q-mb-md"
              v-html="otherDetails.long_description">
            </div>
            <div
              v-if="otherDetails.privacy_policy"
              class="text-dark text-bold q-mb-sm">
              Syarat dan Ketentuan
            </div>
            <p v-html="otherDetails.privacy_policy">
            </p>
          </template>
        </div>
      </div>
      <SectionProduct class="q-my-md"
        v-for="(content, idx) in contents"
        :key="'content-'+idx"
        :content="content"/>
    </div>
    <DialogContentPayment
      ref="dialogContentPayment"/>
    <DialogShare
      :model="content"
      :url="$route.path"
      ref="dialogShare"/>
    <DialogRatingProduct
      ref="dialogRatingProduct"
      :product="content"
      v-model="dialogRating"/>
  </q-page>
</template>
<script>
import SectionProduct from 'components/SectionProduct'
import DialogContentPayment from 'components/dialogs/DialogContentPayment'
import DialogShare from 'components/dialogs/DialogShare'
import DialogRatingProduct from 'components/dialogs/DialogRatingProduct'

export default {
  meta () {
    const meta = this.aMeta
    const location = window.location.href
    return {
      title: meta.title,
      meta: {
        description: { name: 'description', content: meta.description },
        image: { name: 'image', content: meta.image },
        image_link: { name: 'image_link', content: meta.image },
        ogTitle: { property: 'og:title', content: meta.title },
        ogDescription: { property: 'og:description', content: meta.description },
        ogImage: { property: 'og:image', content: meta.image },
        ogUrl: { property: 'og:url', content: location },
        twitterTitle: { property: 'twitter:title', content: meta.title },
        twitterDescription: { property: 'twitter:description', content: meta.description },
        twitterImage: { property: 'twitter:image', content: meta.image },
        twitterUrl: { property: 'twitter:url', content: location },
      }
    }
  },

  name: 'ContentIndex',
  components: {
    SectionProduct,
    DialogContentPayment,
    DialogShare,
    DialogRatingProduct
  },
  data () {
    return {
      host: null,
      productOri: null,

      aMeta: {
        title: 'Finplan.id',
        description: 'Finplan adalah komunitas belajar investasi. Mulai dari saham, Reksadana, emas, maupun properti.',
        image: 'https://finplan.id/favicon.png'
      },

      otherDetails: null,

      content: {
        id: null,
        is_paid: 0,
        img: '',
        name: '',
        rating: '',
        rating_cnt: '',
        description: '',
        is_bookmarked: 0,
        tag: '',
        price_sell: '',
        thumbnail: '',
        price_ori: '',
        url: '',
        pointer: 0,
        duration: 0,
        subcategory: null
      },
      contents: [
      ],
      share: {
        show: true,
        url: "/"
      },

      purchased: null,

      dialogRating: false,

      lockedContent: ""
    }
  },
  mounted () {
    if (this.$utils.lastPurchase) {
      this.purchased = this.$utils.lastPurchase
      this.$utils.lastPurchase = null
    }
    this.$global.$on('user', (data) => {
      this.$nextTick(() => {
        this.getProductDetail(this.$route.params.title)
      })
    })
    this.host = process.env.API_URL
    this.getProductDetail(this.$route.params.title)
  },
  methods: {
    getProductDetail (slug) {
      this.$services.product.detailV2({
        slug: slug
      }, (data) => {
        if (data.id === 0) {
          this.$q.notify({
            message: 'Konten sudah dihapus / kadaluarsa',
            color: 'negative'
          })
          return this.$router.replace("/e-learning")
        }
        this.contentOri = {...data}
        if (this.$route.params.subcategory == 'purchased') {
          this.$router.replace({
            path: this.$utils.getContentRoute(data)
          })
        }
        data.thumbnail = this.host + data.thumbnail
        data.price_ori = data.price_ori.toLocaleString()
        data.price_sell = data.price_sell.toLocaleString()
        data.description = this.$utils.replaceEnter(data.description)

        Object.keys(this.content).forEach(key => {
          this.content[key] = data[key]
        })

        this.getProducts()
        if (this.purchased) {
          this.$nextTick(() => {
            this.$refs.dialogContentPayment.show(this.content, this.purchased)
            this.purchased = null
          })
        }

        try {
          const otherDetails = JSON.parse(data.other_details)
          if (otherDetails.privacy_policy) {
            otherDetails.privacy_policy = otherDetails.privacy_policy.replace(/\n/g, '<br/>')
          }
          this.otherDetails = otherDetails
        } catch (e) {
          this.otherDetails = null
        }
        this.lockedContent = data.url.replace(/\n/g, '<br/>')

        this.trackViewContent(data)
      }, (msg, errors) => {
        this.$q.notify({
          message: 'Konten sudah dihapus / kadaluarsa',
          color: 'negative'
        })
        return this.$router.replace("/e-learning")
      }, () => {
      })
    },

    getProducts () {
      const filter = {
        id_subcategory: this.content.subcategory.id,
        type: this.content.type
      }

      this.$services.product.get(filter, (data) => {
        this.contents = [
          {
            icon: this.content.subcategory.icon,
            code: 'Rekomendasi Produk',
            products: data,
            host: process.env.API_URL
          }
        ]
      }, (msg, errors) => {
      }, () => {
      })
    },

    buyClass () {
      if (this.$utils.getToken() == null) {
        this.$q.notify({
          message: 'Harap masuk terlebih dahulu',
          color: 'info'
        })
        this.$global.$emit('showLogin')
        return
      }
      this.$global.$emit('addCart', this.contentOri)
    },

    bookmarkProduct () {
      if (this.$utils.getToken() == null) {
        this.$q.notify({
          message: 'Harap masuk terlebih dahulu',
          color: 'primary'
        })
        this.$global.$emit('showLogin')
        return
      }
      if (this.content.is_bookmarked === 1) {
        return this.deleteBookmark()
      }
      this.$services.bookmark.add({
        id_product: this.content.id,
        id_user: this.$utils.getUser().id
      }, (data) => {
        this.content.is_bookmarked = 1
      }, () => {
      }, () => {
      })
    },

    deleteBookmark () {
      this.$services.bookmark.delete({
        id_product: this.content.id,
        id_user: this.$utils.getUser().id
      }, (data) => {
        this.content.is_bookmarked = 0
      }, () => {
      }, () => {
      })
    },

    trackViewContent (item) {
      this.$utils.track.custom(this.$route.meta.track, {name: item.id, link: this.$utils.getContentRoute(item)})
    }
  },

  watch: {
    '$route.params.title': function (newVal, oldVal) {
      if (newVal) {
        this.getProductDetail(newVal)
      }
    },
    'content.name': function (newVal, oldVal) {
      this.aMeta.title = newVal + ' - Finplan.id'
    },
    'content.description': function (newVal, oldVal) {
      this.aMeta.description = this.$utils.stripHtml(newVal)
    },
    'content.thumbnail': function (newVal, oldVal) {
      this.aMeta.image = newVal
    }
  }
}
</script>
