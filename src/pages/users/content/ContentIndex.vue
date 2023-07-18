<template>
  <q-page class="q-py-md">
    <div class="container q-px-md">
      <e-learning-player
        :slug="$route.params.title"
        @productChanged="onProductChanged"/>
      <SectionProduct class="q-my-md"
        v-for="(content, idx) in contents"
        :key="'content-'+idx"
        :content="content"
        :showPrice="false"/>
    </div>
  </q-page>
</template>
<script>
import SectionProduct from 'components/SectionProduct'
import ELearningPlayer from 'src/components/videos/ELearningPlayer.vue'

export default {
  meta () {
    const meta = this.aMeta
    const location = window.location.href
    return {
      title: meta.title,
      meta: {
        description: { name: 'description', content: meta.description },
        image: { name: 'image', content: meta.image },
        image_link: { name: 'image_link', content: meta.image },
        ogTitle: { property: 'og:title', content: meta.title },
        ogDescription: { property: 'og:description', content: meta.description },
        ogImage: { property: 'og:image', content: meta.image },
        ogUrl: { property: 'og:url', content: location },
        productPrice: { property: 'product:price:amount', content: meta.price },
        productPriceCurrency: { property: 'product:price:currency', content: 'IDR' },
        productRetailerItemd: { property: 'product:retailer_item_id', content: meta.id },
        ogAvailability: { property: 'og:availability', content: meta.availability },
        twitterTitle: { property: 'twitter:title', content: meta.title },
        twitterDescription: { property: 'twitter:description', content: meta.description },
        twitterImage: { property: 'twitter:image', content: meta.image },
        twitterUrl: { property: 'twitter:url', content: location },
      }
    }
  },

  name: 'ContentIndex',
  components: {
    SectionProduct,
    ELearningPlayer
  },
  data () {
    return {
      aMeta: {
        title: 'Finplan.id',
        description: "Investment Learning Community. Bahas saham, reksadana, emas, properti, NFT",
        image: 'https://finplan.id/favicon.png',
        id: "",
        price: "",
        availability: 'in stock'
      },
      product: null,
      contents: []
    }
  },
  methods: {
    onProductChanged (product) {
      this.product = product
      this.aMeta.id = product.id
      this.aMeta.price = product.price_sell
      this.getProducts()
    },

    getProducts () {
      const filter = {
        id_subcategory: this.product.subcategory.id
      }

      this.$services.product.get(filter, (data) => {
        this.contents = [
          {
            icon: this.product.subcategory.icon,
            code: 'Rekomendasi Materi Lainnya',
            products: data,
            host: process.env.API_URL
          }
        ]
      }, (msg, errors) => {
      }, () => {
      })
    },
  },

  watch: {
    'product': function (product, oldVal) {
      this.aMeta.title = product.title + ' - Finplan.id'
      this.aMeta.description = this.$utils.stripHtml(product.description)
      this.aMeta.image = product.thumbnail
    }
  }
}
</script>
