<template>
    <q-card class="--item --item-border bg-white q-py-lg q-px-md">
      <h2 class="--pkg-title">
        {{ model.name }}
      </h2>
      <h5 class="--pkg-title-strikeline">
        Rp {{ model.price ? model.price.toLocaleString() : '0' }}
      </h5>
      <h2 class="--pkg-title">
        Rp {{ model.price_sell ? model.price_sell.toLocaleString() : '0' }}
      </h2>
      <q-btn
        @click="onClickPackage()"
        push no-caps
        class="full-width gtm-track"
        text-color="dark"
        color="warning"
        label="Berlangganan"
        gtm-action="btn_package_subscribe"/>
    </q-card>
</template>
<script>
export default {
  props: {
    model: {
      type: Object,
      default: new Object()
    }
  },

  data () {
      return {

      }
  },

  methods: {
    onClickPackage () {
      if (this.$utils.getToken() == null) {
        this.$q.notify({
          message: 'Harap masuk terlebih dahulu',
          color: 'info'
        })
        this.$global.$emit('showLogin')
        return
      }

      this.$router.push({
        path: this.$utils.getPackageDetailRoute(this.model)
      })
    }
  }
}
</script>
