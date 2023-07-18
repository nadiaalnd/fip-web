<template>
  <q-page class="q-py-md">
    <div class="container q-mb-lg">
      <div
        v-if="setting"
        class="container q-px-md q-pt-md q-mb-lg">
        <div class="list-popular-product row">
          <div class="col-12 col-md-4 --wording q-my-md">
            <div class="--title">
              {{setting['Home Product Title']}}
            </div>
            <div class="--subtitle text-neutral q-mb-sm">
              {{setting['Home Product Subtitle']}}
            </div>
            <q-btn
              v-if="!hasActivePackage"
              no-caps push
              class="gtm-track btn-secondary btn-medium"
              label="Mulai Gratis"
              @click="$router.push({
                path: '/free/package/e-learning'
              })"
              gtm-action="btn_free_get_home"/>
          </div>
          <div class="col-12 col-md-8" id="popular">
            <SectionProduct
              :showPrice="false"
              :id="'popular-'+idx"
              class="q-my-md"
              v-for="(content, idx) in [popularProduct]"
              :key="'popular-'+idx"
              :content="content">
            </SectionProduct>
          </div>
        </div>
      </div>
    </div>
    <section 
    	id="start-learning"
    	class="container list-popular-product q-px-md q-pb-md">
      <q-input
        dense outlined rounded
        class="mobile-only"
        placeholder="Cari ilmu baru...">
        <template v-slot:append>
          <q-icon name="search" color="white" />
        </template>
      </q-input>
      <SectionProduct
        :showPrice="false"
        :id="'dashboard-'+idx"
        class="q-my-md"
        v-for="(content, idx) in contents"
        :key="'content-'+idx"
        :content="content"/>
    </section>
  </q-page>
</template>
<script>
import SectionProduct from 'components/SectionProduct'
export default {
  components: {
    SectionProduct
  },

  data () {
    return {
      contents: [],
      setting: null,
      popularProduct: {
        icon: '/images/profile-bookmark.svg',
        code: 'Produk Populer',
        products: [],
        host: process.env.HOST
      },

      hasActivePackage: false
    }
  },

  created () {
    this.$global.$on('active_package', (data) => {
      this.hasActivePackage = data.ActivePackage == 1
    })
  },

  mounted () {
  	this.getDashboard()
    this.getPopularProduct()
    this.setting = this.$utils.getSetting()
    this.$global.$on('setting', (data) => {
      this.setting = data
    })
    this.$nextTick(function () {
      if (this.$route.query.scroll) {
        this.scrollTo(this.$route.query.scroll)
      }
    }.bind(this))
  },

  methods: {
    scrollTo (id = 'start-learning') {
      window.scroll({
        top: document.getElementById(id).offsetTop,
        behavior: 'smooth'
      })
    },
    getPopularProduct () {
      const filter = {
        tag: this.popularProduct.code
      }

      this.$services.product.get(filter, (data) => {
        this.popularProduct.products = data
      }, (msg, errors) => {
      }, () => {
      })
    },
    getDashboard () {
      this.$services.dashboard (data => {
        data.forEach((item, i) => {
          const subcategory = {
            id: item.id,
            code: item.code,
            icon: item.icon,
            idx: item.idx,
          }
          item.products.forEach((product, i) => {
            product.type = 0
            product['subcategory'] = subcategory
          })

        })
        this.contents = data
        this.$nextTick(() => {
          this.$emit('pageReady')
        })
      }, (msg, errors) => {
      }, () => {
      })
    },
  }
}
</script>
