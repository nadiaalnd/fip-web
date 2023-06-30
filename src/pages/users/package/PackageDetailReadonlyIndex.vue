<template>
  <q-page class="q-py-md">
    <div class="container-sm">
      <div v-if="aPackage" class="container">
        <div class="items-center">
          <h1 class="text-primary text-bold text-center q-ma-none" style="font-size: 32px; line-height: 1.01;">
            Informasi Paket {{ aPackage.name }}
          </h1>
          <hr/>
        </div>
        <div class="q-py-md ">
          <div
            class="jodit-wysiwyg-content q-mb-md"
            v-html="aPackage.description">
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PaymentIndex',
  data () {
    return {
      aPackage: null,
      packages: [],
      model: null,
      loading: false,

      form: {
        username: ''
      },

      referalCode: null,
      couponCode: null,

      // upload
      cancelTokenSource: null,
      photo: null,
      photoUrl: null,
      upload: {
        progress: 0,
        percent: 0
      },

      setting: null,

      paymentMethod: {
        options: [],
        value: null
      },
      payment_qr: null,
      paymentGateway: null,
      paymentGatewayMethodId: null,
      paymentGatewayMethodCode: null,

      carts: {},
      showedCarts: [],
      discount: null,
      price: {
        subTotal: 0,
        discount: 0,
        total: 0
      },

      user: {
        phone: '',
        name: ''
      },

      redirecting: false
    }
  },

  mounted () {
    this.getPackages()
    this.setting = this.$utils.getSetting()
  },

  methods: {
    getPackages () {
      this.$services.package.get({product_type: 0, is_active: 1}, (data) => {
        for (var i in data) {
          const item = data[i]
          if (this.$route.params.slug == item.slug) {
            this.aPackage = item
            break
          }
        }

        this.packages = data
        if (this.$route.query.coupon) {
          this.couponCode = this.$route.query.coupon
        }
      }, (msg, error) => {
      }, () => {
      })
    },
  },
}
</script>