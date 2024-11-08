<template>
  <div class="item-product-grid">
    <template v-if="content.showPlaceholder || (content.products != null && content.products.length > 0)">
      <div ref="section-product" class="section-product">
        <div class="grid-product">
          <div v-if="content.products == null || content.products.length == 0" class="flex-center"
            style="width: 100%; height: 128px; color: #757575; display: flex;">
            {{ content.placeholder ? content.placeholder : 'Belum Ada' }}
          </div>
          <ItemProductVideo v-else v-for="(product, idx) in content.products" :key="'product-' + idx" :product="product"
            @bookmarked="(value) => {
              product.is_bookmarked = value
            }" class="item-product-content" ref="item-product"/>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import ItemProductVideo from 'components/items/ItemProductVideo'
export default {
  props: {
    content: {
      type: Object
    }
  },
  components: {
    ItemProductVideo
  },

  name: 'SectionProduct',

  data() {
    return {
      host: '',
      isMobileView: false
    }
  },

  mounted() {
    if (this.content.host) {
      this.host = this.content.host
    } else {
      this.host = process.env.API_URL_IMG
    }
    this.handleScrollContent();
    this.checkMobileView();
    window.addEventListener('resize', this.checkMobileView);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobileView);
  },

  methods: {
    checkMobileView() {
      this.isMobileView = window.innerWidth < 1024;
    },
    sectionClicked() {
      this.$router.push({
        path: `/learning-path/${this.content.id}/${this.$utils.escapeRoute(this.content.code)}`
      })
    },

    scrollRight() {
      let productWidth = this.$refs['item-product'][0].$el.offsetWidth
      this.$refs['section-product'].scrollTo({
        top: 0,
        left: this.$refs['section-product'].scrollLeft + productWidth,
        behavior: 'smooth'
      })
    },

    scrollLeft() {
      let productWidth = this.$refs['item-product'][0].$el.offsetWidth
      this.$refs['section-product'].scrollTo({
        top: 0,
        left: this.$refs['section-product'].scrollLeft - productWidth,
        behavior: 'smooth'
      })
    },

    handleScrollContent() {
      if (this.isMobileView) {
        const sectionProduct = this.$refs['section-product'];
        sectionProduct.style.paddingRight = '';
      } else {
        const sectionProduct = this.$refs['section-product'];
        sectionProduct.style.paddingRight = '0.5px';

        const afterElement = document.createElement('div');
        afterElement.classList.add('section-product-after');
        sectionProduct.appendChild(afterElement);
      }

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

      function onWindowScroll() {
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
