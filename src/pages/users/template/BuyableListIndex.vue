<template>
  <q-page class="q-pb-md">
    <div
      v-if="setting"
      class="text-white section-banner">
      <div class="container row flex-center q-px-md">
        <div class="flex-1 q-py-md banner-title">
          <h1
            class="text-bold q-mt-none q-mb-sm"
            v-html="$utils.replaceEnter(setting[$route.meta.storageKey + ' Title'])">
          </h1>
          <p
            class="q-mb-none"
            style="font-size: 16px;"
            v-html="$utils.replaceEnter(setting[$route.meta.storageKey + ' Subtitle'])">
          </p>
        </div>
      </div>
    </div>
    <div class="container q-pa-md">
      <q-input
        dense outlined rounded
        class="q-mb-md"
        placeholder="Cari..."
        debounce="500"
        v-model="filter.name"
        :loading="loading">
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>
      <div class="row row-margin">
        <ItemSimpleCard
          :push="true"
          v-for="(item, idx) in items"
          :title="setting[$route.meta.storageKey + ' Title']"
          :track="$route.meta.track"
          :key="'item-'+idx"
          :item="item"/>
      </div>
    </div>
    <DialogIFrame
      v-model="iframeDialog.dialog"
      :iframe="iframeDialog.iframe"/>
  </q-page>
</template>
<script>
import DialogIFrame from 'components/dialogs/DialogIFrame'
import ItemSimpleCard from 'components/items/ItemSimpleCard'
export default {
  meta () {
    let title = this.setting ? this.$utils.replaceEnter(this.setting[this.$route.meta.storageKey + ' Title']) : 'Finplan'
    let description = this.setting ? this.$utils.replaceEnter(this.setting[this.$route.meta.storageKey + ' Subtitle']) : 'Finplan'
    const location = window.location.href
    return {
      title: title,
      meta: {
        description: { name: 'description', content: description },
        ogTitle: { property: 'og:title', content: title },
        ogDescription: { property: 'og:description', content: description },
        ogUrl: { property: 'og:url', content: location },
        twitterTitle: { property: 'twitter:title', content: title },
        twitterDescription: { property: 'twitter:description', content: description },
        twitterUrl: { property: 'twitter:url', content: location },
      }
    }
  },

  components: {
    DialogIFrame,
    ItemSimpleCard
  },

  data () {
    return {
      filter: {
        name: '',
        id_subcategory: '',
        type: ''
      },
      pagination: {
        page: 1,
        rowsPerPage: 20
      },
      setting: false,
      iframeDialog: {
        dialog: false,
        iframe: ''
      },
      items: [],
      api: ''
    }
  },

  created () {
    this.filter.name = this.$route.query.search
    this.api = process.env.API_URL_IMG
    this.filter.type = this.$route.meta.type
    this.getProducts()
    this.getSetting()
  },

  methods: {
    getProducts () {
      // this.filter.id_subcategory = this.category.value ? this.category.value.value : null
      this.loading = true
      this.$services.product.get(this.filter, (data) => {
        const items = []
        data.forEach((item, i) => {
          item.type = this.filter.type
          let min
          try {
            min = JSON.parse(item.other_details_min)
          } catch (e) {
            min = {}
          }

          const date = new Date(min.date)
          let dateStr = min.date
          if (!isNaN(date.getDate())) {
            dateStr = this.$utils.getDateStr(date)
          }

          items.push({
              name: item.name,
              link: this.$utils.getBuyableContentRoute(item),
              price: item.price_sell ? 'Rp ' + item.price_sell.toLocaleString() : 'Gratis',
              description: item.description.replace(/\n/g, '<br />'),
              photo: this.api + item.thumbnail,
              dateStr: dateStr
            })
        })
        this.items = items
      }, (msg, errors, y) => {
        console.log(msg)
        console.log(errors)
        console.log(y)
      }, () => {
        this.loading = false
      })
    },
    getSetting () {
      this.$services.getSetting({
      }, (data) => {
        this.setting = data
      }, (msg, errors) => {
        this.$q.notify({
          message: msg,
          color: 'negative'
        })
      }, () => {
      })
    }
  },

  watch: {
    '$route.meta.type': function (newVal) {
      this.filter.type = newVal
      this.getProducts()
    },
    '$route.meta.storageKey': function (newVal, oldVal) {
      if (newVal) {
        this.getSetting()
      }
    },
    'filter.name': function (newVal) {
      if (newVal) {
        let needle = newVal.toLowerCase()
        this.$router.replace({
          query: {
            search: needle
          }
        })
        this.getProducts()
      }
    }
  }
}
</script>
