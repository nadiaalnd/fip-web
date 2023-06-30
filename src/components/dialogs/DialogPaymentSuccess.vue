<template>
  <q-dialog v-model="dialog">
    <q-card class="q-pa-md" style="width: 600px; max-width: calc(100% - 32px)">
      <q-card-section class="q-pa-none q-ma-xs">
        <div class="text-center">
          <q-toolbar-title class="text-title-responsive text-center q-mb-lg">
            Yeay Pembelian Berhasil!
          </q-toolbar-title>
          <img
            class="img-illustration q-mb-lg"
            width="100%"
            style="border-radius: 50%"
            src="/images/ill-cat-in-box.png"/>
          <div class="q-mb-md" style="letter-spacing: 0.5px">
            {{message}}
          </div>
          <q-btn
            unelevated rounded no-caps
            class="gtm-track"
            style="min-width: 164px"
            color="primary"
            label="Mulai Belajar!"
            @click="$router.push('/profile')"
            gtm-action="btn_payment_success_start"/>
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
      message: null
    }
  },

  methods: {
    show (method, code) {
      this.message = this.$utils.getSetting()['Wording Payment Success - Product']
      this.dialog = true
    }
  }
}
</script>
