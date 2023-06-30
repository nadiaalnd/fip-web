<template>
  <q-drawer
    v-model="dialog" side="right" bordered overlay
    behavior="mobile"
    :width="480">
  <!-- <q-dialog v-model="dialog"
    position="right"> -->
    <div class="cart-list q-pa-md column flex-nowrap" style="position: relative; height: 100%; max-heigth: 100%;">
      <q-card-section class="q-pt-xs row flex-nowrap flex-center">
        <q-btn
          flat round dense
          @click="dialog = false"
          class="q-mr-sm"
          color="neutral"
          icon="chevron_left"/>
        <h1 class="text-dark text-bold q-ma-none flex-1" style="font-size: 18px; line-height: 1.01;">
          Keranjang Pembelian ({{showedCarts.length}})
        </h1>
      </q-card-section>
      <div class="text-dark bg-grey-3 q-pa-sm q-mb-xs" style="border-radius: 4px">
        <q-icon name="info" color="primary"/> Kamu bisa beli beberapa materi sekaligus!
        Coba kembali dan pilih materi lainnya lalu beli kelas.
        Semua yg kamu beli akan jadi satu di keranjang ini
      </div>
      <q-card-section
        class="flex-1"
        v-if="showedCarts.length == 0">
        <div  class="q-py-lg text-neutral text-center">
          Belum ada materi yang dipilih
        </div>
      </q-card-section>
      <q-card-section class="flex-1" style="overflow: scroll; padding-left: 16px; padding-right: 16px; margin-left: -8px; margin-right: -8px;">
        <div
          v-for="(product,idx) in showedCarts"
          :key="idx"
          class="row q-py-xs --v-container">
          <div class="relative --v-img"
            @click="(e) => { $utils.openLink(e, $utils.getContentRoute(product), $router) }">
            <img class="--img" :src="host + product.thumbnail" style="border-radius: 4px;"/>
            <div class="--v-category ellipsis-1" style="">
              {{product.subcategory.code}}
            </div>
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
                <span v-if="(product.price_original || product.price_ori) != product.price_sell" class="--price-discount">{{(product.price_original || product.price_ori).toLocaleString()}}</span>
              </div>
              <div>
                <q-btn
                  dense flat round
                  size="sm"
                  color="neutral"
                  icon="delete"
                  @click="deleteCart(idx)"/>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <div class="q-pt-sm flex-center row flex-nowrap">
        <div class="flex-1 text-bold">
          <!-- Rp {{totalPrice.toLocaleString()}} -->
        </div>
        <div class="q-mr-md text-bold">
          Total Rp {{totalPrice.toLocaleString()}}
        </div>
        <!-- <q-btn
          no-caps dense flat v-close-popup
          class="q-px-xs q-mr-md"
          color="primary"
          label="Tambah Lainnya"/> -->
        <q-btn
          no-caps dense unelevated
          :disable="Object.keys(this.carts).length == 0"
          class="q-px-md"
          color="primary"
          label="Beli"
          @click="buyClass"
          icon-right="chevron_right"/>
      </div>
    </div>
  </q-drawer>
</template>

<script>
export default {
  name: 'DialogCart',
  props: {
    value: Boolean
  },
  data () {
    return {
      dialog: false,

      carts: {},
      showedCarts: [],

      host: null,
      refresh: false,

      totalPrice: 0
    }
  },

  created () {
    this.$global.$on('resetCart', this.resetCart)
    this.$global.$on('dismissCart', () => {
      this.dialog = false
    })
  },

  mounted () {
    this.host = process.env.API_URL_IMG
    this.dialog = this.value
    this.getCarts()
  },

  methods: {
    resetCart () {
      this.carts = {}
      this.$utils.saveOtherSetting('product_carts', JSON.stringify(this.carts))
      this.refreshCarts()
    },

    countCart (emit = false) {
      const count = Object.keys(this.carts).length
      if (emit) {
        this.$global.$emit('cartChanged', count)
      }
      return count
    },

    show () {
      this.dialog = !this.dialog
      this.$nextTick(() => {
        this.refreshCarts()
      })
    },

    hasLogin () {
      return this.$utils.hasLogin()
    },

    getCarts () {
      if (this.hasLogin()) {
        const carts = this.$utils.getOtherSetting('product_carts')
        if (carts.length == 0) {
          this.carts = {}
        } else {
          this.carts = carts
        }
      }
    },

    refreshCarts () {
      const carts = []
      let totalPrice = 0
      Object.keys(this.carts).forEach((key) => {
        const product = this.carts[key]
        totalPrice = totalPrice + parseInt(product.price_sell)
        carts.push({...product})
      })
      this.totalPrice = totalPrice
      this.showedCarts = carts

      this.countCart(true)
    },

    addCart (product) {
      if (product.is_paid === 1) {
        return
      }
      this.dialog = true
      this.$nextTick(() => {
        this.$utils.track.addToCart()
        this.carts[product.id] = product
        this.$utils.saveOtherSetting('product_carts', JSON.stringify(this.carts))
        this.refreshCarts()
      })
    },

    deleteCart(idx) {
      const product = this.showedCarts.splice(idx, 1)[0]
      delete this.carts[product.id]
      this.totalPrice = this.totalPrice - product.price_sell
      this.$utils.saveOtherSetting('product_carts', JSON.stringify(this.carts))
      this.$nextTick(() => {
        this.countCart(true)
      })
    },

    buyClass () {
      this.$router.push({
        path: '/payment'
      })
    }
  },

  watch: {
    value: function (newVal, oldVal) {
      this.dialog = newVal
      if (newVal) {
        this.getCarts()
      }
    },
    dialog: function (newVal, oldVal) {
      this.$emit('input', newVal)
    }
  }
}
</script>
