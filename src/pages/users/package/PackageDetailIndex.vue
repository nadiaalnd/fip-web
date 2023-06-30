<template>
  <q-page class="q-py-md">
    <div class="container-sm">
      <div v-if="aPackage" class="container">
        <div class="items-center">
          <h1 class="text-primary text-bold text-center q-ma-none" style="font-size: 32px; line-height: 1.01;">
            Informasi Pembelian
          </h1>
          <hr/>
        </div>
        <div class="q-py-md payment-container">
          <div class="payment-main q-px-md q-mb-md">
            <div class="q-mb-sm">
              <div class="row" style="align-items: flex-start; justify-content: center; flex-wrap: nowrap;">
                <h3 class="flex-1 title q-mx-none q-pl-none q-pr-sm" style="margin-bottom: 0">
                  {{ aPackage.name }}
                </h3>
                <div class="text-primary text-bold" style="font-size: 18px; white-space: nowrap;">
                  Rp {{aPackage.price_sell.toLocaleString()}}
                </div>
              </div>
              <div class="row">
              </div>
              <div class="section text-neutral" style="font-weight: 300">
                {{aPackage.duration_days}} hari
              </div>
            </div>
            <div
              class="jodit-wysiwyg-content q-mb-md"
              v-html="aPackage.description"></div>
          </div>
          <div class="payment-sidebar q-px-md">
            <q-card class="q-pa-sm q-mb-md">
              <div>
                <div
                  v-if="price.subTotal > 0">
                  <q-btn
                    push dense no-caps
                    align="between"
                    icon="img:/images/ic-voucher.svg"
                    icon-right="chevron_right"
                    color="primary"
                    class="full-width q-px-sm q-py-xs q-mb-sm"
                    @click="$refs.dialogPromoList.show(discount)">
                    <div class="flex-1 text-left q-px-sm">
                      Cek Promo Biar Lebih Hemat!
                    </div>
                  </q-btn>
                </div>
                <div
                  class="q-mb-sm"
                  v-if="discount !== null">
                  <div
                    class="q-mx-sm"
                    :style="(discount.isValid ? 'border: 1px solid #0A929E;' : 'border: 1px solid #9e9e9e;') + 'border-radius: 4px; overflow: hidden;'">
                    <div :class="'q-pa-sm text-bold ' + (discount.isValid ? 'bg-primary text-white' : 'bg-grey-6 text-white')">
                      {{ discount.name }}
                    </div>
                    <div class="q-pa-sm">
                      <div class="pre-line">
                        {{ discount.description }}
                      </div>
                    </div>
                  </div>
                  <div v-if="!discount.isValid"
                    class="text-negative q-px-sm text-light q-mt-xs text-italic" style="font-size: 12px">
                    * {{ discount.invalidMessage }}
                  </div>
                </div>
              </div>
              
              <div v-if="!discount || price.subTotal === 0 || paymentGateway === null">
                
                <div
                  v-if="price.subTotal > 0"
                  class="q-mb-sm">
                  <q-btn
                    v-if="price.total > 0"
                    push
                    dense no-caps
                    align="between"
                    icon-right="chevron_right"
                    color="primary"
                    class="full-width q-px-sm q-py-xs"
                    @click="$refs.dialogPaymentMethods.show()">
                    <div class="flex-1 text-left">
                      {{ paymentGateway == null ? 'Pilih Metode Pembayaran' : 'Ganti Metode Pembayaran'}}
                    </div>
                  </q-btn>
                  <div class="payment-method-item"
                    v-if="paymentGateway && price.total > 0">
                      <template v-if="paymentGateway.img">
                        <img
                          :class="paymentGateway.img ? '' : 'hidden'"
                          :src="paymentGateway.img"
                          width="80"/>
                      </template>

                      <div :class="paymentGateway.img ? '--label' : ''">
                        {{ paymentGateway.name ? paymentGateway.name : 'Discount' }}
                      </div>
                      <q-btn
                        dense no-caps outline
                        color="primary"
                        size="sm"
                        class="q-px-sm"
                        label="Cara Pembayaran"
                        @click="$refs.dialogHowToPay.show(paymentGatewayMethodCode, paymentGateway.code)"/>
                  </div>
                </div>
              </div>
              <div v-else>
                <div
                  v-if="price.total > 0"
                  class="q-mb-sm">
                  <q-btn
                    push
                    dense no-caps
                    align="between"
                    icon-right="chevron_right"
                    color="primary"
                    class="full-width q-px-sm q-py-xs"
                    @click="$refs.dialogPaymentMethods.show()">
                    <div class="flex-1 text-left">
                      {{ paymentGateway == null ? 'Pilih Metode Pembayaran' : 'Ganti Metode Pembayaran'}}
                    </div>
                  </q-btn>
                  <div class="payment-method-item"
                    v-if="paymentGateway">
                      <template v-if="paymentGateway.img">
                        <img
                          :class="paymentGateway.img ? '' : 'hidden'"
                          :src="paymentGateway.img"
                          width="80"/>
                      </template>

                      <div :class="paymentGateway.img ? '--label' : ''">
                        {{ paymentGateway.name }}
                      </div>
                      <q-btn
                        dense no-caps outline
                        color="primary"
                        size="sm"
                        class="q-px-sm"
                        label="Cara Pembayaran"
                        @click="$refs.dialogHowToPay.show(paymentGatewayMethodCode, paymentGateway.code)"/>
                  </div>
                </div>
                
              </div>

              <div
                v-if="paymentGatewayMethodId == 102">
                <!-- VA -->
                <q-input
                  outlined dense
                  class="q-mb-sm"
                  :label="'Nama Pengguna ' + paymentGateway.name"
                  v-model="user.name"/>
                <q-input
                  outlined dense
                  class="q-mb-sm"
                  :label="'No Ponsel ' + paymentGateway.name"
                  v-model="user.phone"
                  :error="$utils.isEmpty(user.phone)"
                  :error-message="$utils.isEmpty(user.phone) ? 'Harap isi nomor ponsel' : null"/>
              </div>
              <div class="row q-px-sm">
                <div class="text-grey flex-1" style="font-size: 14px;">
                  Sub Total
                </div>
                <div>
                  Rp {{ price.subTotal.toLocaleString() }}
                </div>
              </div>
              <div class="row q-px-sm" v-if="price.discount > 0">
                <div class="text-grey flex-1" style="font-size: 14px;">
                  Diskon
                </div>
                <div class="text-red">
                  - Rp {{ price.discount.toLocaleString() }}
                </div>
              </div>
              <div class="row q-px-sm">
                <div class="flex-1" style="font-size: 18px; font-weight: bold;">
                  Total Bayar
                </div>
                <div class="text-primary" style="font-size: 18px; font-weight: bold">
                  Rp {{ price.total.toLocaleString() }}
                </div>
              </div>
              <div align="right"
                class="q-mt-md">
                <div>
                  <q-btn
                    push dense no-caps
                    :loading="loading"
                    :disable="paymentGateway == null && price.total > 0 || (paymentGatewayMethodId == 102 && $utils.isEmpty(user.phone)) "
                    class="q-px-sm"
                    color="primary"
                    :label="price.total > 0 ? 'Lanjut Pembayaran' : 'Lanjut'"
                    @click="onConfirm"/>
                </div>
                <div>
                  <error v-if="paymentGateway == null && price.total > 0">Harap pilih metode pembayaran</error>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <DialogPromoList
      ref="dialogPromoList"
      @selected="(coupon) => { this.couponCode = coupon.code }"/>
    <DialogHowToPay
      ref="dialogHowToPay"/>
    <DialogPaymentMethods
      ref="dialogPaymentMethods"
      @selected="(value, type, code) => {
        this.paymentGateway = value
        this.paymentGatewayMethodId = type
        this.paymentGatewayMethodCode = code
      }"
      :code="paymentGateway ? paymentGateway.code : null"/>
  </q-page>
</template>

<script>
import DialogPromoList from 'components/dialogs/DialogPromoList'
import DialogPaymentMethods from 'components/dialogs/DialogPaymentMethods'
import DialogHowToPay from 'components/dialogs/DialogHowToPay'
import QRCode from 'qrcode'

export default {
  components: {
    DialogPromoList,
    DialogPaymentMethods,
    DialogHowToPay
  },
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
    this.user.phone = this.$utils.getUser().phone
    this.user.name = this.$utils.getUser().name
    this.$global.$emit('dismissCart')
    this.host = process.env.API_URL_IMG
    this.setting = this.$utils.getSetting()
  },

  methods: {
    getPackages () {
      this.$services.package.get({product_type: 0, is_active: 1}, (data) => {
        for (var i in data) {
          const item = data[i]
          if (this.$route.params.slug == item.slug) {
            this.aPackage = item
            this.countPrice()
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

    totalPriceStr () {
      return 'Rp ' + (this.price.total).toLocaleString()
    },

    onConfirm () {
      const form = this.formPurchase(false)

  
      if (form == null) {
        return this.$q.notify({
          message: 'Harap pilih metode pembayaran terlebih dahulu',
          color: 'negative'
        })
      }
      if (form.coupon == null) {
        this.discount = null
      }

      this.loading = true
      this.$services.product.purchase(form, (data) => {
        this.$router.push({
          name: 'transaction-detail',
          params: {
            id_purchase: data.id
          }
        })
      }, (msg, errors) => {
        this.$q.notify({
          message: msg,
          color: 'negative'
        })
      }, () => {
        this.loading = false
      })
    },

    purchaseSimulate () {
      const form = this.formPurchase(true)
      this.$services.product.purchaseSimulate(form, (data) => {
        this.price.discount = data.discount
        this.price.total = data.price_sell + data.unique_number - this.price.discount
      }, (msg, errors) => {
        this.$q.notify({
          message: msg,
          color: 'negative'
        })
      }, () => {
        this.loading = false
      })
    },


    formPurchase: function (bypass) {
      const priceTotal = this.price.total
      let issuer = null
      let paymentMethodId = null
      if (bypass) {
        issuer = ''
        paymentMethodId = 99
      } else if (this.price.total == 0) {
        issuer = ''
        paymentMethodId = 99
      } else {
        if (this.paymentGateway == null) {
          return null
        } else {
          issuer = this.paymentGateway.code ? this.paymentGateway.code : "";
          paymentMethodId = this.paymentGatewayMethodId
        }
      }

      const referal = this.referalCode
      let coupon = ''
      if (this.discount && this.discount.isValid) {
        coupon = this.couponCode
      } else {
        coupon = null
      }
      return {
        products: [],
        referral: referal,
        id_paymentmethod: paymentMethodId,
        issuer: issuer,
        coupon: coupon,
        user_name: this.user.name,
        user_phone: this.user.phone,
        packages: [
          this.aPackage ? this.aPackage.id : null
        ]
      }
    },

    generateQR (data) {
      if (data) {
        // With promises
        QRCode.toDataURL(data)
          .then(url => {
            this.payment_qr = url
          })
          .catch(err => {
            console.error(err)
          })
      } else {
        this.payment_qr = null
      }
    },

    countPrice () {
      let subTotal = 0
      subTotal = this.aPackage ? this.aPackage.price_sell : 0
      this.price.subTotal = subTotal
      this.checkCouponValidation()

      // count total price
      this.purchaseSimulate()
    },

    checkCoupon () {
      this.loading = true
      this.$services.coupon.getDetail(this.couponCode, (data) => {
        data.isValid = true
        this.discount = data
        this.countPrice()
      }, (msg, errors) => {
        this.$q.notify({
          message: msg,
          color: 'negative'
        })
      }, () => {
        this.loading = false
      })
    },

    checkCouponValidation () {
      if (this.discount) {
        let { isValid, invalidMessage } = this.$utils.validateCoupon(this.discount, this.price.subTotal, [this.aPackage])
        this.discount.isValid = isValid
        this.discount.invalidMessage = invalidMessage
      }
    },

    copyText (text) {
      navigator.clipboard.writeText(text)
      this.$q.notify({
        message: 'Tersalin : ' + text,
        color: 'info'
      })
    },

    gotoProfile () {
      this.$router.push({
        path: `/profile`
      })
    }
  },

  watch: {
    couponCode: function (newVal) {
      if (newVal) {
        this.checkCoupon()
      } else {
        this.discount = null
      }
    }
  }
}
</script>