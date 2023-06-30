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
        v-model="form.name"
        :loading="loading">
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>
      <div class="row row-margin">
        <ItemSimpleCard
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
  components: {
    DialogIFrame,
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
      }
    }
  },

  created () {
    this.getSetting()
  },

  methods: {
    getSetting () {
      this.loading = true
      this.$services.getSetting({
      }, (data) => {
        this.setting = data
        this.setupJobPreparation(data)
        this.$nextTick(() => {
          this.form.name = this.$route.query.search
        })
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
          itemsOri.push({
            ...item,
            lowercase: item.name.toLowerCase(),
            dateStr: this.$utils.getDateStr(new Date(item.date)),
            description: item.description.replace(/\n/g, '<br />'),
            price: item.price
          })
        }
      })

      this.items = itemsOri
      this.itemsOri = itemsOri
    }
  },

  watch: {
    'form.name': function (newVal, oldVal) {
      if (newVal) {
        let needle = newVal.toLowerCase()
        this.items = this.itemsOri.filter((val) => val.lowercase.indexOf(needle) > -1)
        this.$router.replace({
          query: {
            search: needle
          }
        })
      }
    },
    '$route.meta.storageKey': function (newVal, oldVal) {
      if (newVal) {
        this.getSetting()
      }
    }
  }
}
</script>
