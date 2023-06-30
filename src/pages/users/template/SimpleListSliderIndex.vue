<template>
  <div
    ref="sliderContainer"
    id="slider-container">
    <div class="no-scrollbar list-slider row flex-nowrap"
      style="overflow-x: scroll"
      ref="item-container">
      <ItemSimpleCard
        v-for="(item, idx) in items"
        :title="setting[$route.meta.storageKey + ' Title']"
        :track="$route.meta.track"
        :key="'item-'+idx"
        :item="item"
        ref="item-product"
        gtm-action="item_slider"/>
    </div>
    <div class="row">
      <div class="flex-1">
      </div>
      <q-btn
        no-caps dense flat
        icon="chevron_left"
        size="sm"
        color="primary"
        label="Sebelumnya"
        ref="carousel-arrow-left"
        class="q-mx-sm"
        @click="scrollLeft"/>
      <q-btn
        no-caps dense flat
        icon-right="chevron_right"
        size="sm"
        color="primary"
        label="Selanjutnya"
        ref="carousel-arrow-right"
        class="q-mx-sm"
        @click="scrollRight"/>
    </div>
  </div>
</template>
<script>
import ItemSimpleCard from 'components/items/ItemSimpleCard'
export default {
  components: {
    ItemSimpleCard
  },

  data () {
    return {
      form: {
        name: ''
      },
      items: [],
      itemsOri: [],
      loading: false,
      setting: false,
      iframeDialog: {
        dialog: false,
        iframe: ''
      },
      showCarouselLeft: true,
      showCarouselRight: true
    }
  },

  created () {
    this.getSetting()
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
    getSetting () {
      this.loading = true
      this.$services.getSetting({
      }, (data) => {
        this.setting = data
        this.setupJobPreparation(data)
      }, (msg, errors) => {
        this.$q.notify({
          message: msg,
          color: 'negative'
        })
        this.loading = false
      }, () => {
        this.loading = false
      })
    },
    setupJobPreparation (setting) {
      let itemsOri = []
      JSON.parse(setting[this.$route.meta.storageKey] || '[]').forEach((item, i) => {
        if (item.active) {
          let date = new Date(item.date)
          itemsOri.push({
            ...item,
            lowercase: item.name.toLowerCase(),
            dateStr: date.getTime() ? this.$utils.getDateStr(new Date(item.date)) : item.date,
            description: item.description.replace(/\n/g, '<br />'),
            price: item.price
          })
        }
      })

      this.items = itemsOri
      this.itemsOri = itemsOri
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
  },

  watch: {
    '$route.meta.storageKey': function (newVal, oldVal) {
      if (newVal) {
        this.getSetting()
      }
    }
  }
}
</script>
