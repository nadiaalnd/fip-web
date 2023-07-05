<template>
  <div class="item-product-list">
    <template v-if="content.showPlaceholder || (content.products != null && content.products.length > 0)">
      <!-- <div :class="'home-section ' + (content.id ? 'cursor-not-allowed' : '')" -->
      <!-- <div class="home-section"
        @click="() => {
            if (content.id) {
              sectionClicked()
            }
          }"> -->
      <!-- <div class="home-section q-mb-sm">
        <h2>
          {{content.code}}
          <q-tooltip
            v-if="content.id">
            Lihat lebih
          </q-tooltip>
        </h2>
        <q-icon
          v-if="content.icon_name"
          :name="content.icon_name"
          color="primary"
          size="sm"/>
        <q-icon
          v-else-if="content.icon"
          :name="'img:' + host + content.icon"
          size="sm"/>
        <q-icon
          v-if="content.id"
          class="text-bold"
          name="chevron_right"
          color="primary"
          size="24px"/>
      </div> -->
      <div
        ref="section-product"
        class="section-product">
        <div class="grid-product">
          <div v-if="content.products == null || content.products.length == 0"
            class="flex-center"
            style="width: 100%; height: 128px; color: #757575; display: flex;">
              {{content.placeholder ? content.placeholder : 'Belum Ada' }}
          </div>
          <ItemProductLP
            v-else
            v-for="(product, idx) in content.products"
            :key="'product-'+idx"
            :product="product"
            @bookmarked="(value) => {
              product.is_bookmarked = value
            }"
            class="item-product-content"
            ref="item-product"
            style="width: 250px"/>
          <!-- <template
            v-if="content.products != null && content.products.length > 0">
            <q-btn
              ref="carousel-arrow-right"
              round
              icon="chevron_right"
              class="bg-white text-primary carousel-arrow-right"
              @click="scrollRight"
              gtm-action="btn_section_right"/>
            <q-btn
              ref="carousel-arrow-left"
              round
              icon="chevron_left"
              class="bg-white text-primary carousel-arrow-left"
              @click="scrollLeft"
              gtm-action="btn_section_left"/>
          </template> -->
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import ItemProductLP from 'components/items/ItemProductLP'
export default {
  props: {
    content: {
      type: Object
    }
  },

  components: {
    ItemProductLP
  },

  name: 'SectionProduct',

  data () {
    return {
      host: ''
    }
  },

  mounted () {
    if (this.content.host) {
      this.host = this.content.host
    } else {
      this.host = process.env.API_URL_IMG
    }

    this.handleScrollContent()
  },

  methods: {
    sectionClicked () {
      this.$router.push({
        path: `/learning-path/${this.content.id}/${this.$utils.escapeRoute(this.content.code)}`
      })
    },

    scrollRight () {
      let productWidth = this.$refs['item-product'][0].$el.offsetWidth
      this.$refs['section-product'].scrollTo({
        top: 0,
        left: this.$refs['section-product'].scrollLeft + productWidth,
        behavior: 'smooth'
      })
    },

    scrollLeft () {
      let productWidth = this.$refs['item-product'][0].$el.offsetWidth
      this.$refs['section-product'].scrollTo({
        top: 0,
        left: this.$refs['section-product'].scrollLeft - productWidth,
        behavior: 'smooth'
      })
    },

    handleScrollContent () {
      if (this.$refs['section-product'] == null) {
        return
      }
      this.$refs['section-product'].onscroll = function () { onWindowScroll() }

      const self = this
      if (self.$refs['carousel-arrow-left']) {
        self.$refs['carousel-arrow-left'].$el.classList.add('hidden')
      }
      let showCarouselLeft = false
      let showCarouselRight = false
      let maxRight = 0

      if (this.$refs['carousel-arrow-right']) {
        maxRight = this.$refs['section-product'].scrollWidth - this.$refs['section-product'].clientWidth
        if (this.$refs['section-product'].scrollLeft == maxRight) {
          this.$refs['carousel-arrow-right'].$el.classList.add('hidden')
          showCarouselRight = false
        }
      }

      function onWindowScroll () {
        if (self.$refs['section-product'].scrollLeft == 0) {
          self.$refs['carousel-arrow-left'].$el.classList.add('hidden')
          showCarouselLeft = false
        } else if (self.$refs['section-product'].scrollLeft == maxRight) {
          self.$refs['carousel-arrow-right'].$el.classList.add('hidden')
          showCarouselRight = false
        } else if (!showCarouselLeft) {
          self.$refs['carousel-arrow-left'].$el.classList.remove('hidden')
          showCarouselLeft = true
        } else if (!showCarouselRight) {
          self.$refs['carousel-arrow-right'].$el.classList.remove('hidden')
          showCarouselRight = true
        }
      }
    },
  }
}
</script>
