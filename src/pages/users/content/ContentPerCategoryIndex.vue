<template>
  <q-page class="q-py-md">
    <div class="container q-pa-md">
      <div class="border-bottom q-mb-md">
        <div class="q-mb-md">
          <h1 class="text-primary q-ma-none text-bold" style="font-size: 32px; line-height: 1.01;">
            {{ category ? category.code : ''}}
          </h1>
        </div>
      </div>
      <q-input
        dense outlined rounded
        class="q-mb-md"
        placeholder="Cari ilmu baru..."
        debounce="500"
        v-model="form.name"
        :loading="loading">
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>
      <div class="search-products">
        <div v-if="products.length == 0"
          class="flex-center"
          style="width: 100%; height: 128px; color: #757575; display: flex;">
          Materi tidak ditemukan
        </div>
        <ItemProduct
          v-else
          v-for="(product, idx) in products"
          :key="'product-'+idx"
          :product="product"
          @bookmarked="(value) => {
            product.is_bookmarked = value
          }"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import ItemProduct from 'components/items/ItemProduct'

export default {
  components: {
    ItemProduct
  },

  meta () {
    return {
      title: this.aMeta.title
    }
  },

  data () {
    return {
      aMeta: {
        title: 'Finplan.id'
      },

      loading: false,
      form: {
        id_subcategory: null,
        name: ''
      },

      products: [],

      categories: [],
      category: null
    }
  },

  created () {
    this.form.id_subcategory = this.$route.params.id_subcategory
    this.form.name = this.$route.query.search
  },

  mounted () {
    this.getCategories()
  },

  methods: {
    getCategories () {
      this.$services.category.get({}, (data) => {
        let found = false
        let id = this.$route.params.id_subcategory
        for (var i in data) {
          console.log(data[i].id)
          if (data[i].id == id) {
            found = true
            this.form.id_subcategory = id
            this.category = data[i]
            // this.searchProduct ()
            break
          }
        }
      }, (msg, errors) => {
      }, () => {
      })
    },

    searchProduct () {
      this.$services.product.get(this.form, (data) => {
        this.products = data
      }, (msg, errors) => {
      }, () => {
      })
    }
  },

  watch: {
    'form.name' : function (newVal, oldVal) {
      this.$route.query.search = newVal
      this.searchProduct()
    },
    'category': function (newVal, oldVal) {
      this.aMeta.title = newVal.code + ' - Finplan.id'
    }
  }
}
</script>
