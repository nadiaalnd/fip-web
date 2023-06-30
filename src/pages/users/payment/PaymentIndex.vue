<template>
  <q-page class="q-py-md">
    <div v-if="setting" class="container">
      <div class="items-center">
        <h1 class="text-primary text-bold text-center q-ma-none" style="font-size: 32px; line-height: 1.01;">
          Informasi Pembelian
        </h1>
        <hr/>
      </div>
      <div class="q-py-md payment-container">
        <div class="payment-main q-px-md q-mb-md">
          <div class="items-center">
            <div class="text-dark q-mb-md" style="font-size: 14px;">
              <div
                class="cart-list q-mb-md">
                <div
                  v-for="(product,idx) in showedCarts"
                  :key="idx"
                  class="row q-py-xs --v-container">
                  <div class="relative --v-img"
                    @click="(e) => { $utils.openLink(e, $utils.getContentRoute(product), $router) }">
                    <img class="--img" :src="host + product.thumbnail" style="border-radius: 4px;"/>
                    <!-- <div class="--v-category ellipsis-1" style="">
                      {{product.subcategory.code}}
                    </div> -->
                  </div>
                  <div class="flex-1 --v-text">
                    <div class="q-mb-xs ellipsis-1 --v-name"
                      @click="(e) => { $utils.openLink(e, $utils.getContentRoute(product), $router) }">
                      {{product.name}}
                    </div>
                    <div class="ellipsis-3 --v-description">
                      {{product.description}}
                    </div>
                    <div class="row flex-nowrap flex-center">
                      <div class="flex-1">
                        <span class="--price">Rp {{product.price_sell.toLocaleString()}}</span>
                        <span v-if="(product.price_original || product.price_ori || 0) != product.price_sell" class="--price-discount">{{(product.price_original || product.price_ori || 0).toLocaleString()}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br/>
              <div
                v-html="setting['Content Payment Method']"></div>
            </div>
          </div>
        </div>
        <div class="payment-sidebar q-px-md">
          <q-card class="q-pa-sm q-mb-md">
            <div
              v-if="purchase == null && price.subTotal > 0">
              <q-btn
                outline dense no-caps
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
              v-if="discount">
              <div
                class="q-mx-sm"
                :style="(discount.isValid ? 'border: 1px solid #0A929E;' : 'border: 1px solid #9e9e9e;') + 'border-radius: 4px; overflow: hidden;'">
                <div :class="'q-pa-sm text-bold ' + (discount.isValid ? 'bg-primary text-white' : 'bg-grey-6 text-white')">
                  {{ discount.name }}
                </div>
                <div class="q-pa-sm">
                  <div>
                    {{ discount.description }}
                  </div>
                </div>
              </div>
              <div v-if="!discount.isValid"
                class="text-negative q-px-sm text-light q-mt-xs text-italic" style="font-size: 12px">
                * {{ discount.invalidMessage }}
              </div>
            </div>
            <q-input
              outlined dense
              class="q-mb-sm"
              label="Kode Referal (Opsional)"
              v-model="referalCode"
              :readonly="purchase != null"/>
          </q-card>
          <q-card class="q-pa-sm q-mb-md">
            <div>
              <div
                v-if="price.subTotal > 0"
                class="q-mb-sm"
                :style="paymentGateway != null ? 'border: 1px solid #0A929E; border-radius: 4px; overflow: hidden;' : ''">
                <q-btn
                  unelevated dense no-caps
                  align="between"
                  :icon-right="purchase == null ? 'chevron_right' : ''"
                  color="primary"
                  class="full-width q-px-sm q-py-xs"
                  :style="paymentGateway != null ? 'border-radius: 0' : ''"
                  @click="() => {
                      purchase == null ? $refs.dialogPaymentMethods.show() : () => {}
                    }">
                  <div class="flex-1 text-left">
                    Pilih Metode Pembayaran
                  </div>
                </q-btn>
                <div class="payment-method-item"
                  v-if="paymentGateway">
                    <img
                      :src="paymentGateway.img"
                      width="80"/>
                    <div class="--label">
                      {{ paymentGateway.name }}
                    </div>
                    <q-btn
                      v-if="purchase == null"
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
                v-model="user.name"
                :readonly="purchase != null"/>
              <q-input
                outlined dense
                class="q-mb-sm"
                :label="'No Ponsel ' + paymentGateway.name"
                v-model="user.phone"
                :readonly="purchase != null"/>
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
            <template
              v-if="purchase && price.subTotal > 0">
              <div class="row q-px-sm q-mb-md"
                v-if="purchase.unique_number > 0">
                <div class="text-grey flex-1" style="font-size: 14px;">
                  Kode Unik
                </div>
                <div>
                  Rp {{ purchase.unique_number }}
                </div>
              </div>
              <div class="row q-px-sm">
                <div class="flex-1" style="font-size: 18px; font-weight: bold;">
                  Total Bayar
                </div>
                <div class="text-primary" style="font-size: 18px; font-weight: bold">
                  {{totalPriceStr()}}
                </div>
                <div class="text-grey text-center" style="font-size: 12px"
                  v-if="purchase.unique_number > 0">
                  * Harap nominal pembayaran memasukkan 3 digit terakhir
                </div>
              </div>
            </template>
            <template
              v-else>
              <div class="row q-px-sm">
                <div class="flex-1" style="font-size: 18px; font-weight: bold;">
                  Total Bayar
                </div>
                <div class="text-primary" style="font-size: 18px; font-weight: bold">
                  {{totalPriceStr()}}
                </div>
              </div>
            </template>
            <div align="right"
              v-if="purchase == null"
              class="q-mt-md">
              <q-btn
                dense unelevated no-caps
                :disable="paymentGateway == null && price.subTotal > 0"
                class="q-px-sm"
                color="primary"
                :label="price.subTotal > 0 ? 'Lanjut Pembayaran' : 'Lanjut'"
                @click="onConfirm"/>
            </div>
          </q-card>
          <q-card class="q-pa-sm q-mb-md"
            v-if="purchase">
            <div>
              <div class="q-mb-md text-bold" style="font-size: 18px">
                INVOICE
              </div>
              <div class="row flex-center">
                <div class="q-mb-sm flex-1">
                  <div ref="paymentStatus" class="text-grey">Status Pembayaran</div>
                  <div class="text-bold">{{
                    purchase.is_paid == 1 ? 'Lunas'
                    : purchase.is_paid == 2 ? 'Pembayaran Ditolak'
                    : $utils.payment.isExpired(purchase.payment_expired, purchase.time_create) ? 'Transaksi Kadaluarsa'
                    : purchase.proof == '' || purchase.proof == null ? 'Belum dibayar'
                    : 'Menunggu Konfirmasi' }}</div>
                </div>
                <div>
                  <q-btn
                    v-if="purchase.is_paid == 0"
                    unelevated dense no-caps
                    color="primary"
                    size="md"
                    class="q-px-sm"
                    label="Perbarui status"
                    :loading="loading"
                    @click="getPurchasedProductDetail(purchase.id)"/>
                  <q-btn
                    v-else-if="purchase.is_paid == 1"
                    unelevated dense no-caps
                    color="primary"
                    size="md"
                    class="q-px-sm"
                    label="Akses Pembelian"
                    :loading="loading"
                    @click="gotoProfile()"/>
                </div>
              </div>
              <div class="q-mb-sm">
                <div class="text-grey">Pembelian untuk</div>
                <ul class="q-mt-none q-pl-md">
                  <li
                    v-for="(product, idx) in purchase.products"
                    :key="'product-' + idx">
                    {{product.name}}
                  </li>
                </ul>
              </div>
              <template
                v-if="price.total > 0">
                <div class="payment-method-item q-mb-sm"
                  style="padding: 0"
                  v-if="paymentGateway">
                    <img
                      :src="paymentGateway.img"
                      width="80"/>
                    <div class="--label">
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
                <div class="q-mb-md"
                  v-if="purchase.payment_url">
                  <div class="text-grey">
                    Link Pembayaran
                  </div>
                  <a class="text-bold payment-box flex flex-center"
                    :href="purchase.payment_url"
                    target="_blank">
                    <div class="flex-1">
                      Klik untuk melakukan pembayaran
                    </div>
                    <q-icon
                      name="chevron_right"/>
                  </a>
                  <div v-if="redirecting"
                    class="text-italic text-positive text-sm">
                    * Harap tunggu, sedang mengarahkan ke halaman pembayaran
                  </div>
                </div>
                <div class="q-mb-md"
                  v-if="purchase.payment_va">
                  <div class="text-grey">
                    Nomor Virtual Account
                  </div>
                  <div class="text-bold payment-box flex">
                    <div class="flex-1">
                      {{purchase.payment_va}}
                    </div>
                    <q-btn
                      dense no-caps outline
                      color="primary"
                      size="sm"
                      class="q-px-sm"
                      label="Salin"
                      @click="copyText(purchase.payment_va)"/>
                  </div>
                </div>
                <div class="q-mb-md"
                  v-if="purchase.payment_code">
                  <div class="text-grey">
                    Kode Bayar
                  </div>
                  <div class="text-bold payment-box flex">
                    <div class="flex-1">
                      {{purchase.payment_code}}
                    </div>
                    <q-btn
                      dense no-caps outline
                      color="primary"
                      size="sm"
                      class="q-px-sm"
                      label="Salin"
                      @click="copyText(purchase.payment_code)"/>
                  </div>
                </div>
                <div class="q-mb-md"
                  v-if="payment_qr">
                  <div class="text-grey">
                    Scan QR untuk bayar melalui QRIS
                  </div>
                  <div class="text-center">
                    <img
                      class="text-center"
                      :src="payment_qr"/>
                  </div>
                </div>
                <div class="q-mb-md">
                  <div class="text-grey">
                    Total Nominal Transfer
                  </div>
                  <div class="text-bold payment-box flex">
                    <div class="flex-1">
                      {{totalPriceStr()}}
                    </div>
                    <q-btn
                      dense no-caps outline
                      color="primary"
                      size="sm"
                      class="q-px-sm"
                      label="Salin"
                      @click="copyText(price.total)"/>
                  </div>
                </div>
                <div class="q-mb-md"
                  v-if="purchase.payment_expired">
                  <div class="text-grey">
                    Bayar sebelum <span class="text-bold text-dark">{{$utils.getFullDate(purchase.payment_expired)}} WIB</span> atau pembelian akan dibatalkan oleh sistem
                  </div>
                </div>
                <div class="q-mb-md"
                  v-if="purchase.order_number">
                  <div class="text-grey">
                    ID Pemesanan
                  </div>
                  <div class="text-bold">
                    {{purchase.order_number}}
                  </div>
                </div>
                <template v-if="purchase.is_paid == 2">
                  <div class="text-bold">Catatan</div>
                  <div class="q-mb-sm">{{ purchase.notes }}</div>
                </template>
              </template>
            </div>
          </q-card>
        </div>
      </div>
    </div>
    <DialogPromoList
      ref="dialogPromoList"
      @selected="(coupon) => { this.couponCode = coupon.code }"/>
    <DialogHowToPay
      ref="dialogHowToPay"/>
    <DialogPaymentSuccess
      ref="dialogPaymentSuccess"/>
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
import DialogPaymentSuccess from 'components/dialogs/DialogPaymentSuccess'
import QRCode from 'qrcode'

export default {
  components: {
    DialogPromoList,
    DialogPaymentSuccess,
    DialogPaymentMethods,
    DialogHowToPay
  },
  name: 'PaymentIndex',
  data () {
    return {
      model: null,
      purchase: null,
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
    this.user.phone = this.$utils.getUser().phone
    this.user.name = this.$utils.getUser().name
    this.$global.$emit('dismissCart')
    this.host = process.env.API_URL_IMG
    this.setting = this.$utils.getSetting()

    if (this.$route.query.id_purchase) {
      this.getPurchasedProductDetail(this.$route.query.id_purchase)
    } else {
      const carts = this.$utils.getOtherSetting('product_carts')
      if (carts.length == 0) {
        this.carts = {}
      } else {
        this.carts = carts
      }
      const showedCarts = []
      Object.keys(this.carts).forEach((key) => {
        const product = this.carts[key]
        showedCarts.push({...product})
      })
      this.showedCarts = showedCarts

      this.setProduct(null)
      this.simulatePurchase ()
    }
  },

  methods: {
    totalPriceStr () {
      return 'Rp ' + (this.price.total).toLocaleString()
    },

    onPhotoChanged (e) {
      const files = event.target.files
      this.photo = files
    },

    setProduct (purchase) {
      this.paymentMethod.value = null
      this.referalCode = null
      this.couponCode = null
      this.photoUrl = null
      this.photo = null

      if (this.purchase) {
        this.referalCode = this.purchase.referral
        this.couponCode = this.purchase.coupon
      }

      const options = JSON.parse(this.setting['List Bank'])
      this.paymentMethod.options = options.filter((option) => {
        if (this.purchase && option.val == this.purchase.id_paymentmethod) {
          this.paymentMethod.value = option
        }
        return option.active
      })

      this.countPrice()
    },

    purchaseForm (bypass) {
      const priceTotal = this.price.total
      let issuer = null
      let paymentMethodId = null
      if (bypass) {
        issuer = ''
        paymentMethodId = 99
      } else {
        if (this.price.subTotal == 0) {
          issuer = ''
          paymentMethodId = 99
        } else {
          if (this.paymentGateway == null) {
            return null
          } else {
            issuer = this.paymentGateway.code
            paymentMethodId = this.paymentGatewayMethodId
          }
        }
      }

      const referal = this.referalCode
      let coupon = ''

      if (this.discount && this.discount.isValid) {
        coupon = this.couponCode
      } else {
        coupon = null
      }

      const products = []
      for (var key in this.showedCarts) {
        products.push(this.showedCarts[key].id)
      }

      return {
        products: products,
        referral: referal,
        id_paymentmethod: paymentMethodId,
        issuer: issuer,
        coupon: coupon,
        user_name: this.user.name,
        user_phone: this.user.phone
      }
    },

    onConfirm () {
      const form = this.purchaseForm(false)
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
        this.$utils.purchases.add(data.id)
        this.$global.$emit('resetCart')

        this.setPurchaseDetail(data)
        this.checkPaymentPaid(this.purchase)
        if (form.paymentMethodId == 99) {
          this.getPurchasedProductDetail(data.id)
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

    simulatePurchase () {
      const form = this.purchaseForm(true)
      this.$services.product.simulatePurchase(form, (data) => {
        this.price.discount = data.discount
        this.price.total = data.price_sell + data.unique_number - this.price.discount
      }, (msg, errors) => {
      }, () => {
        this.loading = false
      })
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

    uploadProof () {
      const CancelToken = this.$axios.CancelToken
      const source = CancelToken.source()
      this.cancelTokenSource = source
      this.loading = true
      this.$services.uploadFile(this.photo, source.token, (progress) => {
        // on progress
        this.upload.progress = progress
        this.upload.percent = Math.round(progress * 100)
      }, (data) => {
        this.photoUrl = data.url
        this.loading = false
        this.photo = null
        this.submitProof()
      }, (msg, errors) => {
        this.upload.progress = 0
        this.upload.percent = 0
        this.$q.notify({
          message: msg,
          color: 'negative'
        })
        this.loading = false
      }, () => {
      })
    },

    submitProof () {
      this.loading = true
      const totalPrice = this.price.total
      this.$services.product.submitProof(
        totalPrice,
        this.purchase.id,
        this.photoUrl,
        "-", (data) => {
          this.purchase.proof = this.photoUrl
          this.$q.notify({
            message: "Berhasil kirim bukti pembayaran",
            color: 'positive'
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

    countPrice () {
      let subTotal = 0
      for (var i in this.showedCarts) {
        subTotal = subTotal + this.showedCarts[i].price_sell
      }
      this.price.subTotal = subTotal
      this.checkCouponValidation()

      // count total price
      if (this.purchase) {
        this.price.discount = this.purchase.discount ? this.purchase.discount : 0
        this.price.total = this.purchase.price_sell + this.purchase.unique_number - this.price.discount
      } else {
        this.simulatePurchase()
      }
    },

    getPurchasedProductDetail (id, checkPayment = true) {
      if (checkPayment) {
        return this.getPurchaseStatus(id)
      }
      this.$nextTick(() => {
        this.loading = true
      })
      this.$services.product.purchaseDetail({
        id: id
      }, (data) => {
        if (data.length === 0) {
          this.$router.replace({ path: "/e-learning" })
          return
        }
        this.setPurchaseDetail(data[0])

        const showedCarts = []
        const carts = {}
        this.purchase.products.forEach((item, i) => {
          carts[item.id] = item
          showedCarts.push(item)
        })
        this.showedCarts = showedCarts
        this.carts = carts

        this.setProduct(this.purchase)
        this.checkPaymentPaid(this.purchase)
      }, (msg, errors) => {
        this.$q.notify({
          message: msg,
          color: 'negative'
        })
      }, () => {
        this.$nextTick(() => {
          this.loading = false
        })
      })
    },

    getPurchaseStatus (id) {
      this.$nextTick(() => {
        this.loading = true
      })
      this.$services.product.purchaseStatus({
        id: id
      }, (data) => {
      }, (msg, error) => {
      }, () => {
        this.$nextTick(() => {
          this.loading = false
          this.getPurchasedProductDetail(id, false)
        })
      })
    },

    setPurchaseDetail (purchase) {
      if (typeof purchase.is_paid === 'undefined') {
        purchase.is_paid = 0
      }

      this.purchase = purchase
      this.generateQR(this.purchase.payment_qr)
      const paymentMethod = this.purchase.id_paymentmethod
      const issuer = this.purchase.payment_issuer
      this.paymentGateway = {
        code: issuer,
        img: this.$utils.payment.getImage(issuer)
      }
      this.$refs.dialogPaymentMethods.getDefaultPaymentMethod(paymentMethod, issuer)

      if (history.replaceState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?id_purchase='+this.purchase.id;
        window.history.replaceState({path:newurl},'',newurl);
      }

      const isExpired = this.$utils.payment.isExpired(purchase.payment_expired, purchase.time_create)
      if (purchase.is_paid == 0 && !isExpired && purchase.payment_url && purchase.payment_url != '') {
        this.redirecting = true
        setTimeout(function () {
          this.redirecting = false
          this.$nextTick(function () {
            window.open(purchase.payment_url)
          }.bind(this))
        }.bind(this), 3000);
      }

      this.countPrice()
    },

    checkPaymentPaid (purchase) {
      let idx = this.$utils.purchases.find(purchase.id)
      if (purchase.is_paid == 1 && idx != null) {
        this.$utils.purchases.remove(purchase.id)

        this.$refs.dialogPaymentSuccess.show()

        const carts = []
        let type = ''
        this.showedCarts.forEach((item, i) => {
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
          value: this.price.total,
          currency: 'IDR'
        })
      }
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
      if (this.discount && this.purchase == null) {
        let { isValid, invalidMessage } = this.$utils.validateCoupon(this.discount, this.price.subTotal, this.showedCarts)
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
