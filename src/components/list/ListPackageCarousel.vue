<template>
  <div v-if = "hasActivePackages == 0"
    class="list-package-carousel q-mb-md">
    <h1 class="--title text-center q-px-md">
        Dapatkan Akses Video Eksklusif Belajar Investasi Bersertifikat
    </h1>
    <div class="package-carousel">
      <div
        class="--item-container flex-1"
        v-for="(model, idx) in (packages)"
        :key="idx">
        <ItemPackageCarousel
          :model="model"
          v-if="idx != selected"/>
        <ItemPackageCarouselHighlighted
          :model="model"
          v-else/>
      </div>
    </div>
  </div>
</template>
<script>

import ItemPackageCarousel from 'components/items/ItemPackageCarousel'
import ItemPackageCarouselHighlighted from 'components/items/ItemPackageCarouselHighlighted'

export default {
  components: {
    ItemPackageCarouselHighlighted,
    ItemPackageCarousel
  },

  data () {
    return {
      user: null,
      packages: [],
      selected: 1,
      hasActivePackages: 0,
    }
  },

  mounted () {
    this.user = this.$utils.getUser()
    this.getPackages()
    this.checkActivePackage()
  },

  methods: {
    getPackages () {
      this.$services.package.get({video_type: 0, is_active: 1}, (data) => {
        this.packages = data
      }, (msg, error) => {
      }, () => {
      })
    },

    // new line 
    checkActivePackage () {
      if (this.user == null) {
        return 
      }
      this.$services.user.checkActivePackage((data) => {
        this.$global.$emit('active_package', data)
        if (data.ActivePackage == 1) {
          this.hasActivePackages = 1
        } else {
        }
      }, (msg, err) => {
      }, () => {
      }) 
    }, // /checkActivePackage()
  }
}
</script>
