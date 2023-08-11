<template>
  <div
    ref="sliderContainer"
    id="slider-container">
    <div class="no-scrollbar list-slider row flex-nowrap"
      style="overflow-x: scroll"
      ref="item-container">
      <div class="container-article">
        <div class="q-px-md q-py-sm">
          <h1 class="q-mb-md">
            Belajar Bersama Kami
          </h1>
          <p class="q-mb-md">
            Kamu bisa pelajari berbagai hal tentang finansial, mulai dari perencanaan keuangan sampai investasi dengan detail mendasar oleh para pemateri terbaik secara asyik dan menarik.
          </p>
        </div>
        <section v-if="$q.platform.is.desktop"
          class="container item-package q-px-md q-py-md">
          <div class="row q-mb-md">
            <ItemProductLP
              target="_blank"
              class="col-12 col-sm-4 col-md-3"
              v-for="(product, idx) in products"
              :key="idx"
              :product="product"/>
          </div>
          <div class="text-center q-mt-md">
            <q-btn
              dense outline no-caps
              type="a"
              target="_blank"
              color="primary"
              class="q-px-md"
              href="/e-learning"
              icon-right="chevron_right"
              label="Lihat Lainnya"/>
          </div>
        </section>
        <section 
          v-else
          class="item-product-list">
          <div
            ref="section-product"
            class="section-product">
            <div 
              style="display: inline-flex">
              <ItemProductLP
                target="_blank"
                v-for="(product, idx) in products"
                :key="'product-'+idx"
                :product="product"
                @bookmarked="(value) => {
                  product.is_bookmarked = value
                }"
                ref="item-product"
                style="width: 320px"/>
            </div>
          </div>
          <div class="text-center q-mt-md">
            <q-btn
              dense outline no-caps
              color="primary"
              class="q-px-md"
              type="a"
              href="/e-learning"
              target="_blank"
              icon-right="chevron_right"
              label="Lihat Lainnya"/>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
// import ItemSimpleCard from 'components/items/ItemSimpleCard'
import ItemProductLP from 'src/components/items/ItemProductVideo.vue';
export default {
  components: {
    // ItemSimpleCard
    ItemProductLP
  },

  data () {
    return {
      form: {
        name: ''
      },
      items: [],
      itemsOri: [],
      loading: false,
      iframeDialog: {
        dialog: false,
        iframe: ''
      },
      products: [],
      showCarouselLeft: true,
      showCarouselRight: true
    }
  },

  created () {
    this.getProducts()
    this.handleScrollContent()
  },

  mounted () {
    // create an Observer instance
    const resizeObserver = new ResizeObserver(entries =>
      window.parent.postMessage({
        frameHeight: entries[0].target.clientHeight
      }, '*')
    )

    // start observing a DOM node
    resizeObserver.observe(this.$refs.sliderContainer)
  },

  methods: {
    // get products / products
    getProducts () {
      this.$services.product.get({
        tag: 'Modul 1',
      }, (data) => {
        if (data.length > 8) {
          this.products = data.slice(0, 8)
        } else {
          this.products = data
        }
      }, (msg, errors) => {
      }, () => {
      })
    },

    scrollRight () {
      let productWidth = this.$refs['item-product'][0].$el.offsetWidth
      this.$refs['item-container'].scrollTo({
        top: 0,
        left: this.$refs['item-container'].scrollLeft + productWidth,
        behavior: 'smooth'
      })
    },

    scrollLeft () {
      let productWidth = this.$refs['item-product'][0].$el.offsetWidth
      this.$refs['item-container'].scrollTo({
        top: 0,
        left: this.$refs['item-container'].scrollLeft - productWidth,
        behavior: 'smooth'
      })
    },

    handleScrollContent () {
      if (this.$refs['item-container'] == null) {
        return
      }
      this.$refs['item-container'].onscroll = function () { onWindowScroll() }

      const self = this
      if (self.$refs['carousel-arrow-left']) {
        self.$refs['carousel-arrow-left'].$el.classList.add('hidden')
      }
      let showCarouselLeft = false
      let showCarouselRight = false
      let maxRight = 0

      if (this.$refs['carousel-arrow-right']) {
        maxRight = this.$refs['item-container'].scrollWidth - this.$refs['item-container'].clientWidth
        if (this.$refs['item-container'].scrollLeft == maxRight) {
          this.$refs['carousel-arrow-right'].$el.classList.add('hidden')
          showCarouselRight = false
        }
      }

      function onWindowScroll () {
        if (self.$refs['item-container'].scrollLeft == 0) {
          self.$refs['carousel-arrow-left'].$el.classList.add('hidden')
          showCarouselLeft = false
        } else if (self.$refs['item-container'].scrollLeft == maxRight) {
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
    }
  }
}
</script>
