<template>
  <q-page class="flex flex-center column static-page">
    <h1
      v-if="title"
      class="text-primary text-bold text-center q-ma-none" style="font-size: 32px; line-height: 1.01;">
      {{title}}
    </h1>
    <div
      v-html="iframe" class="flex-1 container q-py-md">
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      iframe: null
    }
  },

  mounted () {
    this.reloadPage()
  },

  methods: {
    reloadPage () {
      this.title = null
      let section = this.$route.params.section.split(' ')
        .map((str) => str.charAt(0).toUpperCase() + str.slice(1)).join(' ')
      let subsection = this.$route.params.subsection
      console.log('section', section)
      if (section.toLowerCase() == 'static') {
        this.getStaticPage(subsection)
        return
      }
      let id = parseInt(this.$route.params.id)
      this.getSetting(section, subsection, id)
    },

    getSetting(section, subsection, id) {
      const setting = this.$utils.getOtherSetting(section.toLowerCase())
      let found = false
      for (var i in setting) {
        const item = setting[i]
        if (item.val == id) {
          this.iframe = item[subsection]
          found = true
          return
        }
      }
      if (!found) {
        this.$router.replace("/e-learning")
      }
    },

    getStaticPage(slug) {
      this.$axios.create({
        baseURL: 'https://finplan.id',
        crossDomain: true
      }).get('/media/wp-json/wp/v2/pages', {
        params: {
          slug: slug
        }
      }).then((data) => {
        console.log(data)
        if (data && data.data[0]) {
          const page = data.data[0]
          this.title = page.title.rendered
          this.iframe = '<div style="max-width: 870px; margin: auto;">'+page.content.rendered+'</div>'
          return
        }
        this.$router.replace("/e-learning")
      })
      .catch((e) => {
        this.$router.replace("/e-learning")
      })
    }
  },

  watch: {
    'this.$route.params.id': function (newVal, oldVal) {
      this.reloadPage()
    },
    'this.$route.params.subsection': function (newVal, oldVal) {
      this.reloadPage()
    }
  }
}
</script>
