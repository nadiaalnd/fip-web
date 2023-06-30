<template>
  <q-page class="q-py-md">
    <div class="container q-mb-lg">
      <ListPackageCarousel/>
      <div
        v-if="setting"
        class="container q-px-md q-pt-md q-mb-lg">
        <div class="list-popular-product row">
          <div class="col-12 col-md-4 --wording q-my-md">
            <div class="--title">
              {{setting['Home Product Title']}}
            </div>
            <div class="--subtitle text-neutral">
              {{setting['Home Product Subtitle']}}
            </div>
          </div>
          <div class="col-12 col-md-8">
            <SectionProduct
              :showPrice="false"
              :id="'popular-'+idx"
              class="q-my-md"
              v-for="(content, idx) in [popularProduct]"
              :key="'popular-'+idx"
              :content="content"/>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import ListPackageCarousel from 'components/list/ListPackageCarousel'
import SectionProduct from 'components/SectionProduct'
export default {
  components: {
    SectionProduct,
    ListPackageCarousel
  },

  data () {
    return {
      setting: null,
      popularProduct: {
        icon: '/images/profile-bookmark.svg',
        code: 'Produk Populer',
        products: [],
        host: process.env.HOST
      }
    }
  },

  mounted () {
    this.getPopularProduct()
    this.setting = this.$utils.getSetting()
    this.$global.$on('setting', (data) => {
      this.setting = data
      // this.setupBootcamp(this.$utils.getOtherSetting('bootcamp'))
    })
  },

  methods: {
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
    }
  }
}
</script>
