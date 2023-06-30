<template>
  <div class="q-py-md">
    <div class="content-header q-mb-lg flex">
      <h1 class="content-title text-primary q-ma-none text-bold inline-block flex-1">
        {{product.name}}
      </h1>
      <!-- <q-icon color="amber-8" name="star" size="28px"/> -->
      <img height="28" width="28" src="/images/star-fill.svg"/>
      <span class="q-ml-sm text-primary vertical-middle text-bold" style="font-size: 20px;">{{$utils.getRating(product)}}</span>
      <span class="q-ml-sm text-neutral vertical-middle" style="font-size: 20px;">({{$utils.getRatingCnt(product)}} ulasan)</span>
      <q-btn
        class="q-ml-sm gtm-track"
        dense flat
        color="dark"
        icon="img:/images/share.svg"
        @click="$refs.dialogShare.show()"
        gtm-action="btn_video_share"/>
      <q-btn
        class="q-ml-sm gtm-track"
        dense flat
        color="dark"
        :icon="product.is_bookmarked === 1 ? 'bookmark' : 'bookmark_border'"
        @click="bookmarkProduct"
        gtm-action="btn_video_bookmark"/>
    </div>
    <div
      v-if="product.url"
      class="q-mb-md"
      style="width: 100%; position: relative;">
      <div>
        <VideoPlayer
          ref="videoPlayer"
          :product="product"
          :pointer="product.pointer"
          @updatePercentage="updatePercentage"
          :sendReport="product.percentage < 100"/>
      </div>
    </div>
    <div
      v-else
      class="q-mb-md"
      style="width: 100%; padding-top: 48%; position: relative;">
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
        <ImageComponent
          :src="product.thumbnail"
          width="100%"
          height="100%"/>
      </div>
    </div>
    <h2 class="text-primary q-mb-md">
      Deskripsi
    </h2>
    <p v-html="product.description">
    </p>
    <div
      v-if="product.is_paid == 1 "
      class="q-mb-md">
      <h2 class="text-primary q-mb-md">
        Progress
      </h2>
      <p>
        <q-linear-progress
          rounded
          :value="product.percentage / 100"
          size="20px"
          class="q-mt-md cursor-pointer">
          <q-tooltip>
            {{product.percentage}} %
          </q-tooltip>
        </q-linear-progress>
      </p>
      <div class="text-center">
        <q-btn
          dense push no-caps
          class="q-px-sm"
          :color="product.percentage < 80 ? 'grey-5' : 'primary'"
          label="Unduh Sertifikat"
          @click="downloadCertificate"
          gtm-action="btn_video_certificate_download">
          <q-tooltip>
            Minimal 80% menonton dari durasi product
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="price text-center"
      v-if="product.is_paid == 0">
      <q-btn
        dense push no-caps
        class="q-px-sm"
        color="primary"
        label="Berlangganan Sekarang!"
        @click="$router.push(`/package/list`)"
        gtm-action="btn_video_subscribe"/>
    </div>
    
    <DialogContentPayment
      ref="dialogContentPayment"/>
    <DialogShare
      :model="product"
      :url="$route.path"
      ref="dialogShare"/>
    <DialogRatingProduct
      ref="dialogRatingProduct"
      :product="product"
      v-model="dialogRating"
      @success="openCertificate"/>
  </div>
</template>
<script>
import ImageComponent from 'components/Image'
import VideoPlayer from 'components/VideoPlayer'
import DialogContentPayment from 'components/dialogs/DialogContentPayment'
import DialogShare from 'components/dialogs/DialogShare'
import DialogRatingProduct from 'components/dialogs/DialogRatingProduct'

export default {
  props: {
    slug: String
  },

  name: 'ContentIndex',
  components: {
    ImageComponent,
    DialogContentPayment,
    DialogShare,
    VideoPlayer,
    DialogRatingProduct
  },
  data () {
    return {
      host: null,
      productOri: null,

      product: {
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
        subcategory: null,
        percentage: 0
      },
      share: {
        show: true,
        url: "/e-learning"
      },

      purchased: null,

      dialogRating: false,

      certificatePath: null,

      loading: false,
      page: 1,
      purchaseListLast: [],
      purchaseList: []
    }
  },
  mounted () {
    this.$global.$on('user', (data) => {
      this.$nextTick(() => {
        this.getProductDetail(this.slug)
      })
    })
    this.host = process.env.API_URL
    this.getProductDetail(this.slug)
  },
  methods: {
    getProductDetail (slug) {
      if (this.$utils.isEmpty(slug)) {
        return
      }
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
        this.productOri = {...data}
        if (this.$route.params.subcategory == 'purchased') {
          this.$router.replace({
            path: this.$utils.getContentRoute(data)
          })
        }
        data.thumbnail = this.host + data.thumbnail
        data.price_ori = data.price_ori.toLocaleString()
        data.price_sell = data.price_sell.toLocaleString()
        data.description = this.$utils.replaceEnter(data.description)
        Object.keys(this.product).forEach(key => {
          this.product[key] = data[key]
        })

        this.checkPurchase()
        if (data.url) {
          this.$nextTick(() => {
            this.$refs.videoPlayer.setThumbnail(this.product.thumbnail)
            this.$refs.videoPlayer.setVideo(this.product.id, `${process.env.API_URL_VIDEO}/vod${this.product.url}/playlist.m3u8`)
          })
        }
        this.$emit('productChanged', this.product)
      }, (msg, errors) => {
        this.$q.notify({
          message: 'Konten sudah dihapus / kadaluarsa',
          color: 'negative'
        })
        return this.$router.replace("/e-learning")
      }, () => {
      })
    },

    checkPurchase () {
      const purchases = this.$utils.purchases.get()
      const time = Math.floor((new Date()).getTime() / 1000)
      const length = purchases.length
      this.purchaseListLast = []
      for (var i = 0; i < length; i++) {
        const obj = purchases[length - i]
        if (typeof obj == 'object') {
          if ((time - obj.date) > 86400) {
            break
          } else {
            this.purchaseListLast.push(obj.id)
          }
        }
      }
      if (this.purchaseListLast.length > 0) {
        this.getPurchasedProduct()
      }
    },

    getPurchasedProduct () {
      if (this.$utils.getToken() == null) {
        return
      }
      this.loading = true
      if (this.page == 1) {
        this.purchaseList = []
      }
      this.$services.product.purchaseList(this.page, "1", (data) => {
        for (var i in data) {
          const purchase = data[i]
          if (this.purchaseListLast.indexOf(data[i].id) > -1) {
            this.$utils.purchases.remove(purchase.id)

            const carts = []
            let type = ''
            purchase.products.forEach((item, i) => {
              const itemType = this.$utils.content.typeName(item.type)
              carts.push({
                name: item.name,
                type: itemType,
                id: item.id,
                price: item.price_sell
              })
              if (type == '') {
                type = itemType
              } else if (type != itemType) {
                type = 'multiple'
              }
            })

            this.$utils.track.purchase({
              type: type.toLowerCase(),
              contents: [
                {
                  id: purchase.id,
                  quantity: 1,
                  items: carts
                }
              ],
              value: purchase.payment,
              currency: 'IDR'
            })
          }
        }
      }, (msg, errors) => {
        this.$q.notify({
          message: msg,
          color: 'negative'
        })
      }, () => {
        this.loading = false
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
      this.$global.$emit('addCart', this.productOri)
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
      if (this.product.is_bookmarked === 1) {
        return this.deleteBookmark()
      }
      this.$services.bookmark.add({
        id_product: this.product.id,
        id_user: this.$utils.getUser().id
      }, (data) => {
        this.product.is_bookmarked = 1
      }, () => {
      }, () => {
      })
    },

    deleteBookmark () {
      this.$services.bookmark.delete({
        id_product: this.product.id,
        id_user: this.$utils.getUser().id
      }, (data) => {
        this.product.is_bookmarked = 0
      }, () => {
      }, () => {
      })
    },

    downloadCertificate () {
      if (this.product.percentage < 80) {
        this.$q.notify({
          message: 'Harap tonton video materi pembelajaran terlebih dahulu',
          color: 'negative'
        })
        return
      }
      this.generateCertificate(() => {})
    },

    openCertificate () {
      if (this.certificatePath != null) {
        this.downloadCertificatePdf()
      } else {
        this.generateCertificate(() => {
          this.downloadCertificatePdf()
        })
      }
    },

    downloadCertificatePdf () {
      window.location.assign(process.env.API_URL + this.certificatePath, '_blank');
    },

    generateCertificate (onSuccess) {
      this.$services.certificate.generate({
        id_product: this.product.id,
        id_user: this.$utils.getUser().id
      }, (data, msg, response) => {
        this.certificatePath = response.data.path
        if (this.certificatePath) {
          // user must give rating first
          this.dialogRating = true
          onSuccess()
        }
      }, (msg, errors) => {
        this.$q.notify({
          message: msg,
          color: 'negative'
        })
      }, () => {
      })
    },

    updatePercentage (pointer, duration) {
      const percentage = Math.round(pointer / duration * 10000) / 100
      if (pointer <= duration) {
        this.product.pointer = pointer
        this.product.percentage = Math.round(pointer / duration * 10000) / 100
      } else {
        this.product.pointer = duration
        this.product.percentage = 100
      }
    }
  },

  watch: {
    'slug': function (newVal, oldVal) {
      this.getProductDetail(this.slug)
    },
  }
}
</script>
