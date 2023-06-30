<template>
  <q-card class="card-product">
    <div
      class="--img-container">
      <img
        class="--img"
        :src="item.thumbnail"/>
      <div class="--tags q-mt-md" style="margin-left:-7px">
        <div class="text-bold --tag-sell-1">
          Hot Sell
          <!-- {{ item.type }} -->
        </div>
        <div class="--tag-sell-2"></div>
      </div>
      <div class="--price-name-container">
        <div class="--name q-pa-md" style="font-size:20px">
          <!-- Nama Produk -->
          {{ item.name }}
        </div>
        <div class="--price">
          <!-- Rp. 100.000 -->
          {{ item.price_sell.toLocaleString() }}
        </div>
      </div>
    </div>
    <div class="text-center text-white q-pa-md --description-product full-width">
      <div class="q-mb-md">
      Lorem ipsum dolor sit amet, consectetur adipiscing ...
      <!-- {{ item.description }} -->
      </div>
      <div class="text-center">
        <q-btn
          flat dense
          color="white"
          class="--btn-product gtm-track"
          label="Pilih"
          @click="(e) => {
              openItem(e, item)
            }"
          target="_blank"
          gtm-action="btn_product_select"/>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  props: {
    item: Object,
    push: {
      default: false
    }
  },
  methods: {
    openItem (e, item) {
      e.preventDefault()
      if (this.$utils.getToken()) {
        if (this.push) {
          this.$router.push(item.link)
          return
        }
        let link = ''
        if (item.registration) {
          link = `/page/${this.$route.meta.name}/registration/` + item.val
        } else {
          link = item.link
        }
        window.open(link)
      } else {
        this.$q.notify({
          message: 'Harap masuk untuk dapat melihat ' + this.item.name,
          color: 'primary'
        })
        this.$global.$emit('showLogin')
        this.$global.$emit('iframe', {
          event: 'showLogin',
          params: null
        })
      }
    }
  }
}
</script>
