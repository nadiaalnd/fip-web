<template>
  <q-page class="q-py-md">
    <div class="container q-mt-xl">
      <div class="text-bold text-primary q-mb" style="font-size: 32px;">
        Mulai Langkahmu Menuju Financial Freedom
      </div>
      <div class="text-dark q-mt-md" style="font-size: 18px;">
        Hanya dengan modal 99 Ribu, tonton puluhan video pembelajaran eksklusif dan tambahan materi ter-update seputar investasi di Pasar Modal.
        <br><span class="text-bold">AKSES PENUH, TANPA BATAS!</span>
      </div>
      <q-btn
        v-if="!hasActivePackage"
        style="font-weight: 600; font-size: 1rem; background-color: #FFCC00; border-radius: 10px;"
        no-caps unelevated
        color="secondary"
        class="text-black q-px-md q-mt-md gtm-track"
        label="Mulai Gratis"
        @click="$router.push({ path: '/free/package/e-learning'})"
        gtm-action="btn_free_get_home"/>
      <div class="container q-px-md q-mt-xl q-mb-lg">
        <div class="list-popular-product row">
          <!-- Sidebar -->
          <div class="col-12 col-md-4">
            <h1>Ini Sidebar</h1>
          </div>
          <!-- Content Video -->
          <div class="col-12 col-md-8">
            <h1>Ini konten</h1>
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
          </div>
        </div>
      </div>
    </div>
    <!-- Popular Video -->
    <div class="container q-mb-lg" id="popular">
      <SectionProduct
        :showPrice="false"
        :id="'popular-'+idx"
        class="q-my-md"
        v-for="(content, idx) in [popularProduct]"
        :key="'popular-'+idx"
        :content="content">
      </SectionProduct>
    </div>
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
        console.log(this.popularProduct)
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
