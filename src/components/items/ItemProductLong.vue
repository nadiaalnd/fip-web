<template>
  <div
    :class="'item-product-learnpath ' + (active ? 'active' : '')">
    <div :class="'--progress-before ' + (activeBefore ? 'active' : '')">
    </div>
    <div :class="'--progress-after ' + (activeNext ? 'active' : '')">
    </div>
    <div class="relative">
      <a :href="$utils.getContentRoute(product)"
        @click="(e) => { $utils.openLink(e, $utils.getContentRoute(product), $router) }">
        <img class="--img" :src="host + product.thumbnail"/>
      </a>
      <q-circular-progress
        show-value
        class="--product-progress text-white q-ma-xs"
        v-if="product.is_paid"
        :value="product.percentage"
        track-color="grey-3"
        center-color="grey-8"
        size="32px"
        :color="product.percentage < 50 ? 'red' : (product.percentage < 80 ? 'amber-7' : 'primary')"/>
    </div>
    <div class="--content flex-1">
      <div class="relative">
        <a  class="--title" :href="$utils.getContentRoute(product)"
          @click="(e) => { $utils.openLink(e, $utils.getContentRoute(product), $router) }">
          {{product.name}}
        </a>
        <div class="--rating flex">
          <div class="--rating-value">
            {{ getRating() }}
          </div>
          <div>
            <q-icon
              v-for="i in 5"
              :key="'star'+i"
              :name="i > Math.round(getRating()) ? 'star_border' : 'star'"
              color="amber-8"/>
          </div>
          <div class="--rating-people">
            ({{ getRatingCnt() }})
          </div>
        </div>
        <p class="--description">
          {{product.description}}
        </p>
        <q-btn
          rounded dense flat
          v-if="type == ''"
          class="--bookmark absolute-top-right gtm-track"
          :icon="product.is_bookmarked === 1 ? 'bookmark' : 'bookmark_border'"
          size="sm"
          @click="addBookmark"
          gtm-action="btn_product_bookmark"/>
      </div>
      <div v-if="product.tag.length > 0" class="--tag">
        {{product.tag ? product.tag.map(v => v.name).join(', ') : ''}}
      </div>
      <div>
        <span class="--price">Rp {{product.price_sell.toLocaleString()}}</span>
        <span v-if="(product.price_original || product.price_ori) != product.price_sell" class="--price-discount">{{(product.price_original || product.price_ori).toLocaleString()}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
    type: {
      default: '' // purchased
    },
    active: Boolean,
    activeBefore: Boolean,
    activeNext: Boolean,
    idx: Number
  },

  name: 'ItemProduct',

  data () {
    return {
      host: ''
    }
  },

  mounted () {
    this.host = process.env.API_URL_IMG
  },

  methods: {
    getRating () {
      return this.$utils.getRating(this.product)
      // const firstRating = (35 + this.product.id % 7) / 10
      // return Math.round((firstRating + (this.product.rating ? this.product.rating : 5)) / 2 * 10) / 10
      // return this.product.rating
    },

    getRatingCnt () {
      return this.$utils.getRatingCnt(this.product)
      // return (this.product.id * 7) + (this.product.rating_cnt ? this.product.rating_cnt : 0)
      // return this.product.rating_cnt
    },

    addBookmark () {
      if (this.$utils.getToken() == null) {
        this.$q.notify({
          message: 'Harap masuk terlebih dahulu',
          color: 'primary'
        })
        this.$global.$emit('showLogin')
        return
      }
      if (this.product.is_bookmarked === 1) {
        return this.deleteBookmark()
      }
      this.$services.bookmark.add({
        id_product: this.product.id,
        id_user: this.$utils.getUser().id
      }, (data) => {
        console.log('bookmark.add')
        this.$emit('bookmarked', 1)
        // this.product.is_bookmarked = 1
      }, () => {
      }, () => {
      })
    },
    deleteBookmark () {
      this.$services.bookmark.delete({
        id_product: this.product.id,
        id_user: this.$utils.getUser().id
      }, (data) => {
        console.log('bookmark.delete')
        this.$emit('bookmarked', 0)
        // this.product.is_bookmarked = 0
      }, () => {
      }, () => {
      })
    }
  }
}
</script>
