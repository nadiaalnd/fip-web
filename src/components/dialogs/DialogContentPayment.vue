<template>
  <q-dialog v-model="dialog">
    <q-card class="q-pa-sm" style="width: 720px; max-width: calc(100%)"
      v-if="setting">
      <q-card-section class="items-center">
        <h1 class="text-primary text-bold text-center q-ma-none" style="font-size: 32px; line-height: 1.01;">
          Pembelian Video Pembelajaran
        </h1>
      </q-card-section>
      <q-card-section class="items-center">
        <div class="text-dark q-mb-md" style="font-size: 14px;">
          <div
            v-html="setting['Content Payment Method']"></div>
          <hr/><br/>
          <template v-if="model">
            <div class="q-mb-xs text-bold text-primary">Detail</div>
            <div class="q-mb-xs">
              <div class="text-bold">Judul</div>
              <div class="q-mb-sm">
                <a :href="$utils.getContentRoute(model)">
                  {{ model.name }}
                </a>
              </div>
              <!-- <div class="text-bold">Kategori</div>
              <div class="q-mb-sm">{{ model.subcategory.description }}</div> -->
              <div class="text-bold">Deskripsi</div>
              <div class="q-mb-sm" v-html="model.description"></div>
              <div class="text-bold">Status Pembelian</div>
              <div class="q-mb-sm">{{
                model.is_paid == 1 ? 'Sudah dibeli'
                : purchase == null ? 'Belum dibeli'
                : purchase.is_paid == 2 ? 'Pembayaran Ditolak'
                : purchase.proof == '' || purchase.proof == null ? 'Belum dibayar'
                : 'Menunggu Konfirmasi' }}</div>
              <template v-if="purchase && purchase.is_paid == 2">
                <div class="text-bold">Catatan</div>
                <div class="q-mb-sm">{{ purchase.notes }}</div>
              </template>
              <div class="row">
                <div class="col-12 col-sm-6">
                  <q-select
                    outlined dense stack-label
                    option-value="val"
                    option-label="key"
                    class="q-mb-sm q-mx-sm"
                    label="Metode Pembayaran"
                    :options="paymentMethod.options"
                    v-model="paymentMethod.value"
                    :readonly="purchase != null"/>
                </div>
                <div class="col-12 col-sm-6">
                  <q-input
                    outlined dense
                    class="q-mb-sm q-mx-sm"
                    label="Kode Referal (Opsional)"
                    v-model="referalCode"
                    :readonly="purchase != null"/>
                </div>
              </div>
              <template v-if="purchase">
                <div class="text-bold text-primary text-center q-mb-sm">Total Bayar</div>
                <div class="text-center q-mb-md">
                  <div class="q-mb-sm bg-teal-1 text-dark"
                    style="padding: 16px;
                      font-size: 32px;
                      display: inline-block;
                      border-radius: 8px;
                      border: 1px dashed #757575;">
                    Rp {{ (purchase.price_sell + purchase.unique_number).toLocaleString() }}
                  </div>
                  <div class="text-grey">
                    Harap nominal pembayaran memasukkan 3 digit terakhir
                  </div>
                </div>
              </template>
              <div class="q-mb-sm" v-if="purchase">
                <q-input
                  outlined dense stack-label
                  class="q-mb-sm"
                  label="Bukti Bayar"
                  type="file"
                  v-model="photo"/>
                <div class="text-right">
                  <q-btn
                    unelevated dense no-caps
                    v-if="purchase.proof"
                    color="positive"
                    size="sm"
                    class="q-px-sm gtm-track"
                    icon="download"
                    label="Lihat Bukti Bayar"
                    type="a"
                    target="_blank"
                    :href="host+purchase.proof"
                    gtm-action="btn_payment_proof_show"/>
                </div>
              </div>
            </div>
          </template>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          dense flat no-caps v-close-popup
          class="q-px-sm gtm-track"
          color="neutral"
          :label="purchase == null ? 'Batal' : 'Kembali'"
          gtm-action="btn_payment_cancel"/>
        <q-btn
          dense unelevated no-caps
          v-if="purchase == null"
          class="q-px-sm gtm-track"
          color="primary"
          label="Konfirmasi"
          @click="onConfirm"
          gtm-action="btn_payment_confirm"/>
        <q-btn
          dense unelevated no-caps
          v-else
          class="q-px-sm gtm-track"
          color="primary"
          label="Upload Bukti Bayar"
          :loading="loading"
          :disable="loading || photo == null || paymentMethod.value == null"
          @click="uploadProof"
          gtm-action="btn_payment_proof_upload"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogContentPayment',
  data () {
    return {
      dialog: false,
      model: null,
      purchase: null,
      loading: false,

      form: {
        username: ''
      },

      referalCode: null,

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
      }
    }
  },

  mounted () {
    this.host = process.env.API_URL_IMG
  },

  methods: {
    show (model, purchase = null) {
      this.setting = this.$utils.getSetting()

      this.paymentMethod.value = null

      this.model = model
      this.referalCode = null
      this.photoUrl = null
      this.photo = null
      if (purchase) {
        this.purchase = {...purchase}
        console.log(purchase)
        this.referalCode = purchase.referral
      } else {
        this.purchase = null
      }
      const options = JSON.parse(this.setting['List Bank'])
      this.paymentMethod.options = options.filter((option) => {
        if (purchase && option.val == purchase.id_paymentmethod) {
          this.paymentMethod.value = option
        }
        return option.active
      })
      this.dialog = true
    },
    onConfirm () {
      if (this.paymentMethod.value == null) {
        return this.$q.notify({
          message: 'Harap pilih metode pembayaran terlebih dahulu',
          color: 'negative'
        })
      }
      this.loading = true
      const referal = this.referalCode
      this.$services.product.purchase([this.model.id], referal, this.paymentMethod.value.val, (data) => {
        this.purchase = data
      }, (msg, errors) => {
        this.$q.notify({
          message: msg,
          color: 'negative'
        })
      }, () => {
        this.loading = false
      })
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
      const totalPrice = this.purchase.price_sell + this.purchase.unique_number
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
          this.$emit('successUpload')
        }, (msg, errors) => {
          this.$q.notify({
            message: msg,
            color: 'negative'
          })
        }, () => {
          this.loading = false
        })
    }
  }
}
</script>
