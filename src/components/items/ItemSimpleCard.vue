<template>
  <a
    class="col-md-3 col-12 col-sm-4 q-pa-sm simple-card-item"
    :href="$utils.getToken() ? item.link : null"
    @click="(e) => {
        openItem(e, item)
      }"
    target="_blank">
    <q-card
      class="cursor-pointer full-height column">
      <img :src="item.photo"/>
      <div class="price-tag text-bold">
        {{item.price}}
      </div>
      <div
        class="q-pa-sm column flex-1">
        <div class="text-bold ellipsis-1 --title" style="font-size: 16px">
          {{ item.name }}
        </div>
        <div class="q-mb-sm flex-1 ellipsis-3 --desc" v-html="item.description">
        </div>
        <div class="text-right">
          {{ item.dateStr }}
        </div>
      </div>

    </q-card>
  </a>
</template>

<script>
export default {
  props: {
    title: String,
    track: String,
    item: Object,
    push: {
      default: false
    }
  },
  methods: {
    openItem (e, item) {
      e.preventDefault()
      if (this.$utils.getToken()) {
        if (this.push) {
          this.$router.push(item.link)
          return
        }
        let link = ''
        if (item.registration) {
          link = `/page/${this.$route.meta.name}/registration/` + item.val
        } else {
          link = item.link
        }
        window.open(link)
      } else {
        this.$q.notify({
          message: 'Harap masuk untuk dapat melihat ' + this.title,
          color: 'primary'
        })
        this.$global.$emit('showLogin')
        this.$global.$emit('iframe', {
          event: 'showLogin',
          params: null
        })
      }
    }
  }
}
</script>
