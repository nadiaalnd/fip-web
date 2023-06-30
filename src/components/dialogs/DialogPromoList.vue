<template>
  <q-dialog v-model="dialog" style="q-px-none">
    <q-card class="q-pa-sm" style="width: 600px; height: 100%; max-width: 100%">
      <q-toolbar>
        <q-toolbar-title>
          <span class="text-h6">Pilih Promo yang Tersedia</span>
        </q-toolbar-title>
        <q-btn
          flat round dense
          class="gtm-track"
          icon="close"
          size="1em"
          v-close-popup
          gtm-action="btn_promo_close">
        </q-btn>
      </q-toolbar>
      <q-card-section class="q-pa-none q-ma-xs" align="center">
        <div class="row q-mb-md">
          <q-input
            dense outlined round
            type="text"
            class="flex-1 col-2 q-mr-md text-uppercase"
            v-model="couponCode"
            :loading="loading"
            debounce="500"
            label="Masukkan kode promo"/>
          <q-btn
            push no-caps dense
            @click="checkCoupon()"
            class="col-4 q-px-md q-py-xs gtm-track"
            label="Cari"
            color="primary"
            gtm-action="btn_promo_search">
          </q-btn>
        </div>
      </q-card-section>
      <q-separator
        class="q-mb-md"/>
      <q-card-section class="q-pa-none q-ma-xs">
        <div class="row">
          <div
            v-if="coupons == null || coupons.length === 0"
            class="text-neutral">
            Promo tidak tersedia
          </div>
          <template
            v-else>
            <q-btn
              outline no-caps dense
              align="left"
              :class="(coupon.active ? 'bg-teal-1 ' : '') +  ' q-pa-sm q-mb-md full-width block gtm-track'"
              :color="(coupon.active ? 'primary ' : 'dark')"
              v-for="(coupon, idx) in coupons"
              :key="'coupon' + idx"
              @click="select(coupon)"
              gtm-action="btn_promo_select_card">
              <div class="full-width text-left">
                <div class="text-primary text-bold">{{ coupon.name }}</div>
                <div class="text-neutral q-mb-xs pre-line">{{ coupon.description }}</div>
                <div class="text-left">
                  <q-btn
                    dense no-caps
                    class="gtm-track"
                    color="primary"
                    style="border-radius: 4px; min-width: 120px"
                    gtm-action="btn_promo_select">
                    Pilih
                  </q-btn>
                </div>
              </div>
            </q-btn>
          </template>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,

      pagination: {
        page:1,
        rows_per_page:100,
        filter:{
          code: ""
        },
        sort:{
            time_start: "ASC",
            time_end: "ASC",
            used: "DESC"
        }
      },

      couponCode: '',
      loading: false,
      coupons: [],
      selectedCoupon: null
    }
  },

  mounted () {
    this.getList()
  },

  methods: {
    show (coupon) {
      this.selectedCoupon = coupon
      this.dialog = true
    },
    getList () {
      this.$services.coupon.list(this.pagination, (data) => {
        const coupon = this.selectedCoupon
        if (coupon && coupon.idx_show > 0) {
          data.forEach((item, i) => {
            coupon.selected = coupon.code === item.code
          })
        }

        this.coupons = data || []
      }, (msg, errors) => {
        this.$q.notify({
          message: msg ? msg : 'Promo Tidak Ditemukan',
          color: 'negative'
        })
      }, () => {
      })
    },
    select (coupon) {
      this.selectedCoupon = coupon
      this.$emit('selected', coupon)
      this.dialog = false
    },

    checkCoupon () {
      this.loading = true
      this.$services.coupon.getDetail(this.couponCode, (data) => {
        if (data && data.id) {
          this.coupons = [data]
        } else {
          this.coupons = []
        }
        
      }, (msg, errors) => {
        this.$q.notify({
          message: msg ? msg : 'Promo Tidak Ditemukan',
          color: 'negative'
        })
      }, () => {
        this.loading = false
      })
    }
  },
  watch: {
    'couponCode': function (newVal) {
      if (newVal === '') {
        this.getList()
      }
    }
  }
}
</script>
