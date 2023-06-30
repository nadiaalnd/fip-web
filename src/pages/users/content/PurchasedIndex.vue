<template>
  <q-page class="q-py-md">
    <div class="container q-pa-md">
      <div class="border-bottom q-mb-md">
        <div class="q-mb-md">
          <h1 class="text-primary q-ma-none text-bold" style="font-size: 32px; line-height: 1.01;">
            Riwayat Pembelian
          </h1>
        </div>
      </div>
      <div>
        <div v-if="purchaseList == null || purchaseList.length == 0"
          class="flex-center"
          style="width: 100%; height: 128px; color: #757575; display: flex;">
          Anda Belum Melakukan Pembelian
        </div>
        <div
          v-else
          class="row">
          <div
            v-for="(item, idx) in purchaseList"
            :key="'purchase-'+idx"
            class="col-12 col-md-6 q-px-lg">
            <div class="purchase-item q-py-sm">
              <div class="flex q-mb-sm">
                <div class="flex-1">
                  <div class="text-bold">
                    Tanggal Pembelian
                  </div>
                  <div>
                    {{$utils.getFullDate(new Date(item.time_create))}}
                  </div>
                </div>
                <q-chip
                  :color="$utils.getStatusColor(item)"
                  class="text-white"
                  :label="$utils.getStatusStr(item)"
                  size="sm"/>
              </div>
              <div class="q-mb-xs">
                <div class="text-bold">
                  List Pembelian
                </div>
                <div
                  v-for="(pkg, idx) in item.packages"
                  :key="'package-'+idx"
                  class="row">
                  <div style="width: 24px">
                    -
                  </div>
                  <a :href="$utils.getContentRoute(pkg, 1)" target="_blank" class="flex-1">
                    {{ pkg.name }}
                  </a>
                  <div class="text-grey">
                    Harga : Rp {{ $utils.localeString(pkg.price) }}
                  </div>
                </div>
                <div
                  v-for="(product, idx) in item.products"
                  :key="'product-'+idx"
                  class="row">
                  <div style="width: 24px">
                    -
                  </div>
                  <a :href="$utils.getContentRoute(product)" target="_blank" class="flex-1">
                    {{ product.name }}
                  </a>
                  <div class="text-neutral">
                    Rp {{ $utils.localeString(product.price_sell) }}
                  </div>
                </div>
              </div>
              <div class="row q-mb-sm" v-show="item.discount > 0">
                <div class="text-bold flex-1">
                  Diskon
                </div>
                <div class="text-neutral">
                  - Rp {{ $utils.localeString(item.discount) }}
                </div>
              </div>
              <div class="row q-mb-sm">
                <div class="text-bold flex-1">
                  Total Bayar
                </div>
                <div class="text-bold text-primary">
                  Rp {{ $utils.localeString(item.price_sell - item.discount + item.unique_number) }}
                </div>
              </div>
              <div class="text-right">
                <q-btn
                  dense no-caps unelevated
                  class="q-px-sm"
                  color="primary"
                  label="Detail Pembelian"
                  size="sm"
                  @click="gotoPaymentDetail(item)"/>
                <q-btn
                  dense no-caps unelevated v-if="item.is_paid == 1"
                  class="q-ml-sm q-px-sm"
                  color="primary"
                  label="Akses Pembelian"
                  size="sm"
                  @click="accessContent(item)"/>
              </div>
            </div>
          </div>
          <div class="full-width text-center q-pt-md">
            <q-btn
              dense unelevated no-caps
              class="q-px-md"
              color="primary"
              v-if="!isLast"
              label="Lihat lebih"
              :loading="loading"
              :disable="loading"
              @click="() => {
                  page = page + 1
                  getPurchasedProduct()
                }"/>
          </div>
        </div>
      </div>
    </div>
    <DialogContentPayment
      ref="dialogContentPayment"
      @successUpload="() => {
          page = 1
          getPurchasedProduct()
        }"/>
  </q-page>
</template>

<script>
import DialogContentPayment from 'components/dialogs/DialogContentPayment'

export default {
  components: {
    DialogContentPayment
  },

  data () {
    return {
      loading: false,
      form: {
        name: ''
      },
      page: 1,

      purchaseList: []
    }
  },

  created () {
    this.form.name = this.$route.query.search
  },

  mounted () {
    this.getPurchasedProduct()
    let initialId = this.$route.query.id
    if (initialId) {
      this.getPurchasedProductDetail(initialId)
    }
  },

  methods: {
    getPurchasedProduct () {
      this.loading = true
      if (this.page == 1) {
        this.purchaseList = []
      }
      this.$services.product.purchaseList(this.page, null, (data) => {
        this.isLast = data == null || data.length % 20 > 0 || data.length == 0
        if (data) {
          data.forEach((purchase, i) => {
            purchase.products.forEach((item, i) => {
              item.is_paid = purchase.is_paid
            })
            if (((purchase.products && purchase.products.length > 0) || (purchase.packages && purchase.packages.length > 0)) && purchase.id_paymentmethod !== 3) {
              this.purchaseList.push(purchase)
            } else {
            }
          })
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

    getPurchasedProductDetail (id) {
      this.$services.product.purchaseDetail({
        id: id
      }, (data) => {
        let purchased = data[0]
        this.gotoPaymentDetail(purchased)
        // this.gotoPaymentDetail(purchased)
      }, (msg, errors) => {
        console.log(msg)
        this.$q.notify({
          message: msg,
          color: 'negative'
        })
      }, () => {
        this.loading = false
      })
    },

    gotoPaymentDetail (item) {
      this.$router.push({
        path: `/transaction/detail/${item.id}`,
        query: {
          id_purchase: item.id
        }
      })
    },

    accessContent (item) {
      this.$router.push({
        path: `/profile`
      })
    }
  }
}
</script>
