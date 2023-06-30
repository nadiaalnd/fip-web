<template>
  <q-page class="flex flex-center column">
    <div
      v-if="product.is_paid == 1 && product.percentage >= 80"
      v-html="certificate" class="full-width flex-1">
    </div>
    <div
      v-else>
      <div class="q-mb-md">
        Anda tidak memiliki akses untuk halaman ini
      </div>
      <div class="text-center">
        <q-btn
          unelevated
          color="primary"
          label="Kembali"
          @click="$router.back()"/>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      certificate: null,
      product: {
        id: null,
        is_paid: 0,
        img: '',
        name: '',
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
    }
  },

  mounted () {
    this.getProductDetail(this.$route.params.id)
  },

  methods: {
    getProductDetail (id) {
      this.$services.product.detail(id, (data) => {
        data.thumbnail = this.host + data.thumbnail
        data.price_ori = data.price_ori.toLocaleString()
        data.price_sell = data.price_sell.toLocaleString()
        data.description = this.$utils.replaceEnter(data.description)

        Object.keys(this.product).forEach(key => {
          this.product[key] = data[key]
        })

        this.certificate = data.certificate
      }, (msg, errors) => {
      }, () => {
      })
    },
  }
}
</script>
