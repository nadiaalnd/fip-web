<template>
  <div id="carousel"
    class="relative-position carousel q-py-lg"
    style="background-color: #4778C1;"
    v-if="setting.banner.length > 0">
    <q-carousel
      v-model="slide"
      swipeable
      animated
      :padding="padding"
      :vertical="vertical"
      :arrows="arrows"
      :navigation-position="navPos"      
      navigation
      class="text-white rounded-borders"
      style="background-color: #4778C1;"
    >
    <template v-slot:navigation-icon="{ active, onClick }">
      <q-btn v-if="active" padding="0px" flat class="dot gtm-track"
      style="width: 32px; height: 4px; background-color: #FFD93E; border-radius: 2px;"  @click="onClick"
        gtm-action="click_carousel_navigation"/>
      <q-btn v-else class="gtm-track" padding="0px" flat style="background-color: rgba(255, 255, 255, 0.5); width: 32px; height: 4px;" @click="onClick"
        gtm-action="click_carousel_navigation"/>
    </template>
      <q-carousel-slide :name="sett.name" class="column no-wrap flex-center content" :key="idx" v-for="(sett, idx) in setting.banner">
        <div class="row items-center container items-content justify-between">
          <div class="col-0 col-md-5 col-lg-5">
            <img style="width: 100%;" :src="sett.image" alt=""/>
          </div>
          <div class="col-12 col-md-6 col-lg-6 text-left">
            <a class="title-carousel" :href="sett.link">{{ setting.banner[idx].title }}</a>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<style lang="sass">
  @import "../css/carousel.sass"
</style>

<script>
import { ref, watch } from 'vue'

export default{
  setup () {
      const navPos = ref('bottom')
      const vertical = ref(false)

      watch(vertical, val => {
      navPos.value = val === true
          ? 'right'
          : 'bottom'
      })

      return {
          padding: ref(true),
          vertical,
          arrows: ref(true),
          navigation: ref(true),

          navPos,
          slide: ref('1'),

          setting: {
            banner: [],
            name: "caraousel",
          },

      }
  },

  created () {
      this.setupSetting(this.$utils.getSetting())
      this.$global.$on('setting', (setting) => {
        this.setupSetting(setting)
      })
    },

  methods: {
    setupSetting (setting) {
      if (setting?.Banner) {
        const banner = JSON.parse(setting?.Banner);
        const addVal = banner.map((ban, idx) => ({...ban, name: `${idx+1}`}))
        this.setting.banner = addVal;
      }
    },
  }
}
</script>