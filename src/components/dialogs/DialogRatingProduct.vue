<template>
  <q-dialog v-model="dialog" :persistent="loading">
    <q-card class="q-pa-md" style="width: 400px; max-width: calc(100% - 32px)">
      <q-card-section class="items-center">
        <h1 class="text-primary text-bold text-center q-ma-none" style="font-size: 32px; line-height: 1.01;">
          Ulasan Anda
        </h1>
      </q-card-section>
      <q-card-section class="items-center">
        <div class="text-dark q-mb-md">
          Sebelum mendapatkan sertifikat, harap berikan ulasanmu untuk product materi yang telah kamu tonton.
        </div>
        <div class="q-mb-md text-center">
          <div :class="form.rating == 0 ? 'give-rating give-rating-empty' : 'give-rating'">
            <q-icon
              v-for="i in 5"
              :key="'star'+i"
              :class="i + 1 == form.rating ? '--active' : ''"
              name="star"
              size="32px"
              @click="form.rating = i + 1"/>
          </div>
        </div>
        <q-input
          dense outlined
          v-model="form.review"
          placeholder="Tulis ulasan / kesanmu di sini"
          autogrow/>
      </q-card-section>
      <q-card-section class="row">
        <div class="flex-1">
        </div>
        <q-btn
          dense flat no-caps v-close-popup
          class="q-px-md q-mr-md gtm-track"
          label="Nanti"
          color="neutral"
          gtm-action="btn_rating_later"/>
        <q-btn
          dense unelevated no-caps
          @click="rateProduct"
          :loading="loading"
          :disable="loading"
          class="q-px-md gtm-track"
          label="Simpan"
          color="primary"
          gtm-action="btn_rating_submit"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogRatingProduct',
  props: {
    product: Object,
    value: Boolean
  },
  components: {
  },
  data () {
    return {
      dialog: true,
      loading: false,

      form: {
        rating: 5,
        review: ''
      }
    }
  },

  mounted () {
    this.dialog = this.value
  },

  methods: {
    rateProduct () {
      const form = this.form
      if (form.rating == 0) {
        this.$q.notify({
          message: 'Harap beri nilai (bintang)',
          color: 'negative'
        })
        return
      } else if (form.review === '' || form.review == null) {
        this.$q.notify({
          message: 'Harap beri ulasan',
          color: 'negative'
        })
        return
      }
      this.loading = true
      this.$services.product.rate({
        id_product: this.product.id,
        rating: form.rating - 1,
        review: form.review
      }, (data) => {
        this.$q.notify({
          message: 'Terima kasih telah memberi saran dan ulasan',
          color: 'positive'
        })
        this.dialog = false
        setTimeout(function () {
          this.$emit('success')
        }.bind(this), 2000);
      }, (msg, errors) => {
        this.$q.notify({
          message: 'Gagal, harap coba beberapa saat lagi',
          color: 'negative'
        })
      }, () => {
        this.loading = false
      })
    }
  },

  watch: {
    value: function (newVal, oldVal) {
      this.dialog = newVal
      if (newVal) {
        this.form.rating = 5
        this.form.review = ''
        this.loading = false
      }
    },
    dialog: function (newVal, oldVal) {
      this.$emit('input', newVal)
    }
  }
}
</script>
