<template>
  <div class="item-product-container"
    :class="{ 'popular-product': category === 'popularProduct' }">
    <div
      class="item-product">
      <div class="relative">
        <a class="--img"
          :href="$utils.getContentRoute(product)"
          :target="target"
          @click="(e) => { $utils.openLink(e, $utils.getContentRoute(product), $router, target) }">
          <img :src="host + product.thumbnail"/>
          <i
            v-if="product.price_sell == 0"
            class="--free-tag">
            Gratis
          </i>
        </a>
        <a
          class="--play-button"
          :href="$utils.getContentRoute(product)"
          :target="target"
          @click="(e) => { $utils.openLink(e, $utils.getContentRoute(product), $router, target) }">
          <div class="pulse-yellow">
            <img style="display: block; width: 30px; height: 30px;" src="/images/play.svg"/>
          </div>
        </a>

        <!-- <q-circular-progress
          show-value
          class="--product-progress text-white q-ma-xs"
          v-if="product.type == 0 && product.is_paid"
          :value="percentage"
          track-color="grey-3"
          center-color="grey-8"
          size="32px"
          :color="percentage < 50 ? 'red' : (percentage < 80 ? 'amber-7' : 'primary')"/> -->
      </div>
      <div class="q-pa-sm">
        <div>
          <q-chip dense square
            class="text-primary text-bold q-px-sm"
            color="light">
            {{ product.subcategory.code }}
          </q-chip>
        </div>
        <div class="relative">
          <a
            class="--title ellipsis-1"
            :href="$utils.getContentRoute(product)"
            :target="target"
            @click="(e) => { $utils.openLink(e, $utils.getContentRoute(product), $router, target) }">
            {{product.name}}
          </a>
        </div>
        <div class="text-neutral ellipsis-2">
          {{product.description}}
        </div>
        <div class="--rating flex flex-center"
          v-if="false">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object
    },
    type: {
      default: '' // purchased
    },
    target: {
      default: null
    },
    category: {
      type: String,
      default: ''
    }
  },

  name: 'ItemProduct',

  data () {
    return {
      host: '',
      percentage: 0
    }
  },

  mounted () {
    this.host = process.env.API_URL_IMG
    if (this.product) {
      this.percentage = Math.round(this.product.percentage)
    } else {
      this.percentage = 0
    }
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
  },

  watch: {
    product: function (newVal) {
      if (newVal) {
        this.percentage = Math.round(newVal.percentage)
      } else {
        this.percentage = 0
      }

    }
  }
}
</script>
