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
            <div style="font-weight: 600" class="q-mb-sm">
              Catatan Tambahan :
            </div>
            <ul class="text-red q-my-none">
              <li>
                Hanya dengan mengunggah kartu Pelajar / KTM, kamu akan dapat menikmati akses video di Finplan
              </li>
              <li>
                Pembelian gratis menggunakan Pelajar / KTM tidak termasuk fitur pemberian sertifikat
              </li>
              <li>
                Setelah kartu Pelajar / KTM diunggah, admin akan mengkonfirmasi. Harap tunggu untuk konfirmasi maksimal 5 hari kerja. Jika lebih dari itu dan tidak ada perubahan status, harap hubungi admin finplan melalui WA / instagram @finplan.id
              </li>
            </ul>
          </div>
          <div class="payment-sidebar q-px-md">
            <q-card class="q-pa-sm q-mb-md">
              <div class="q-mb-sm">
                <q-btn dense no-caps push color="primary" class="q-px-md full-width text-left q-mb-sm gtm-track" label="Kartu Pelajar / KTM" icon="camera_alt" @click="$refs.imageKTM.selectPhoto()" gtm-action="btn_free_student_ktm"/>
                <div class="text-center">
                  <ImageWithCropper
                    width="300px"
                    height="400px"
                    class="inline-block"
                    ref="imageKTM"
                    :aspectRatio="$route.meta.image_ratio ? $route.meta.image_ratio : 3/4"
                    :circle="false"
                    :imagePreview="preview ? preview : ''"
                    :onPreviewChanged="onIconChanged"/>
                </div>
                <div style="font-size: 12px;" class="q-py-sm">
                  * harap tutup semua data yang Anda anggap pribadi, kami hanya membutuhkan Nama Lengkap Anda, Universitas dan Nomor Induk Pelajar / sejenis
                </div>
                <div>
                  <q-input dense label="Nama Lengkap" v-model="user.name" class="q-mb-sm"/>
                  <q-input
                    dense
                    label="Nomor HP"
                    type="tel"
                    mask="############"
                    :prefix="prefix"
                    v-model="user.phone"
                    class="q-mb-md"/>
                </div>
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
                  {{totalPriceStr()}}
                </div>
              </div>
              <div align="right"
                class="q-mt-md">
                <div>
                  <q-btn
                  push dense no-caps
                  :disable="preview == null || preview == ''"
                  :loading="loading"
                  class="q-px-sm"
                  color="primary"
                  :label="price.total > 0 ? 'Submit' : 'Lanjut'"
                  @click="onConfirm"
                  gtm-action="btn_free_student_submit"/>
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
    <DialogPaymentSuccess
      ref="dialogPaymentSuccess"/>
  </q-page>
</template>

<script>
import DialogPaymentSuccess from 'components/dialogs/DialogPaymentSuccess'
import ImageWithCropper from 'src/components/ImageWithCropper.vue'

export default {
  components: {
    DialogPaymentSuccess,
    ImageWithCropper
},
  name: 'PaymentIndex',
  data () {
    return {
      isStudent: false,
      aPackage: null,
      packages: [],
      model: null,
      loading: false,

      form: {
        username: ''
      },

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
        username: '',
        dob: '',
        phone: '',
        name: '',
        avatar: '',
      },
      prefix: '+62',

      redirecting: false,

      preview: '',
      changeImage: false
    }
  },

  mounted () {
    this.isStudent = this.$route.name == 'student-package-detail'
    this.getPackages()
    const user = this.$utils.getUser()
    let newPhone = user.phone
    this.user.phone = (newPhone && newPhone.includes(this.prefix)) ? newPhone.slice(this.prefix.length) : newPhone
    this.user.name = user.name
    this.user.username = user.username
    this.user.dob = user.dob
    this.user.avatar = user.avatar
    this.$global.$emit('dismissCart')
    this.host = process.env.API_URL_IMG
    this.setting = this.$utils.getSetting()
  },

  methods: {
    saveProfile () {
      let form = {
        ...this.user
      }

      if(form.phone){
        // force 0
        let newPhone = form.phone
        if(form.phone[0].includes(0)){
          newPhone = form.phone.slice(1)
        }

        // tambahkan prefix
        form.phone = this.prefix + newPhone
      }

      this.$services.user.updateSelf(form, (data) => {
          let user = this.$utils.getUser()
          user.name = form.name
          user.phone = form.phone
          user.username = form.username
          user.dob = form.dob
          user.avatar = form.avatar
          this.$utils.saveUser(user)
        },
        (msg, errors) => {
        },
        () => {
        }
      );
    },
    onIconChanged (preview) {
      this.changeImage = true
      this.preview = preview
    },

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
      }, (msg, error) => {
      }, () => {
      })
    },

    totalPriceStr () {
      return 'Rp ' + (this.price.total).toLocaleString()
    },

    onConfirm () {
      const form = this.formPurchase(false)
      this.saveProfile()
  
      if (form == null) {
        return this.$q.notify({
          message: 'Harap pilih metode pembayaran terlebih dahulu',
          color: 'negative'
        })
      }

      this.loading = true
      this.$services.product.purchase(form, (data) => {
        console.log(data)
        this.uploadProof(data.id)
      }, (msg, errors) => {
        this.$q.notify({
          message: msg,
          color: 'negative'
        })
        this.loading = false
      }, () => {
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
      return {
        products: [],
        referral: "",
        id_paymentmethod: 100,
        issuer: "idcard",
        coupon: "",
        user_name: this.user.name,
        user_phone: this.user.phone,
        packages: [
          this.aPackage ? this.aPackage.id : null
        ]
      }
    },

    countPrice () {
      let subTotal = 0
      subTotal = this.aPackage ? this.aPackage.price_sell : 0
      this.price.subTotal = subTotal

      // count total price
      this.purchaseSimulate()
    },

    getPurchasedProductDetail (id, checkPayment = true) {
      if (checkPayment) {
        return this.getPurchaseStatus(id)
      }
      this.loading = true
      this.$services.product.purchaseDetail({
        id: id
      }, (data) => {
        if (data.length === 0) {
          this.$router.replace({ path: "/e-learning" })
          return
        }
        this.setPurchaseDetail(data[0])
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

    uploadProof (id_purchase) {
      const CancelToken = this.$axios.CancelToken
      const source = CancelToken.source()
      this.cancelTokenSource = source
      this.loading = true
      this.$services.upload.image('file', this.preview,  (data) => {
        this.photoUrl = data.url
        this.loading = false
        this.preview = null
        this.submitProof(id_purchase)
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

    submitProof (id_purchase) {
      this.loading = true
      const totalPrice = this.price.total
      this.$services.product.submitProof(
        totalPrice,
        id_purchase,
        this.photoUrl,
        "-", (data) => {
          this.$q.notify({
            message: "Berhasil upload KTM / Kartu Pelajar",
            color: 'positive'
          })
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
  },

  watch: {

    '$route.name': function (newVal) {
      this.isStudent = this.$route.name == 'student-package-detail'
    }
  }
}
</script>