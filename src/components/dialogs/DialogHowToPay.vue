<template>
  <q-dialog v-model="dialog">
    <q-card class="q-pa-md" style="width: 600px; height: 100%; max-width: calc(100% - 32px)">
      <q-toolbar>
        <q-toolbar-title>
          <span class="text-h6">Cara Pembayaran</span>
        </q-toolbar-title>
        <q-btn
          flat round dense
          class="gtm-track"
          icon="close"
          size="1em"
          v-close-popup
          gtm-action="btn_how_to_pay_close">
        </q-btn>
      </q-toolbar>
      <q-card-section
        id="section-how-to-pay"
        class="q-pa-none q-ma-xs">
        <div
          v-html="body">
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
      body: null
    }
  },

  methods: {
    show (method, code) {
      console.log(method, code)
      const howToPay = this.$utils.getOtherSetting('how_to_pay')
      if (method) {
        this.body = howToPay[method].list.find(e => e.code == code).content
      } else {
        for (const mtd in howToPay) {
          let issuer = howToPay[mtd].list.find(e => e.code == code)
          if (issuer) {
            this.body = issuer.content
            break
          }
        }
      }
      
      
      this.dialog = true
    }
  }
}
</script>
