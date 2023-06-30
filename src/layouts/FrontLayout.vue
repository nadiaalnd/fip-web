<template>
  <q-layout id="front-layout" view="lHh LpR lFf">
    <LayoutHeader
      v-if="useComponent"/>
    <div v-else id="app-header"/>
    <q-page-container>
      <router-view class="app-bg"/>
      <q-page-sticky position="bottom-right" :offset="[18, 18]"
        style="z-index: 1">
        <a
          href="https://api.whatsapp.com/send/?phone=6285156700865&text=Halo+Finplan%2C+saya+mau+Tanya+&app_absent=0"
          target="_blank"
          class="flex flex-center"
          style="border-radius: 50%;
            background-color: #1bd741;
            overflow: hidden;
            height: 48px;
            width: 48px;
            box-shadow: 2px 2px 3px 0px rgb(27, 215, 65, 0.4)">
          <img src="/images/wa-chat.png"
            style="width: 40px;"/>
          <q-tooltip>
            Tanya finplan
          </q-tooltip>
        </a>
      </q-page-sticky>
    </q-page-container>


    <div class="footer-front">
      <div class="bg-wave">

      </div>

      <footer class="q-pt-xl" style="margin-top: 6rem;
      background-color: #FFFCF2;
      position: relative;
      ">
        <div class="bg-wave"></div>
        <div class="container q-py-lg q-px-md">
          <div class="row flex">
            <div class="col-xs-12 col-md-4 q-mb-lg">

              <img src="/images/finplan-logo-black.png" style="height: 38px" text-color="white" class="q-mr-md q-mb-md" height="38px" />


              <div class="text-weight-medium" style="color: #888888; font-size: 1.125em;">
                Finplan hadir untuk menjawab solusi finansial di Indonesia. Sebagai komunitas belajar investasi, Finplan membahas beragam informasi seputar saham, reksadana, emas, properti, dan NFT.
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 justify-center row ">
              <div class="col-xs-6 col-md-5 q-px-sm q-mb-md">
                <div class="text-bold q-mb-md">
                  <div class="row" style="flex-direction: column; justify-items: center;">
                    <!-- col-4 -->
                    <div class="col-xs-6 col-md-6 q-mb-md" style="font-size: 1.125em; color: #2A3342;">
                      Product
                    </div>

                    <template
                    v-if="settingProduct">
                      <div class="col-12 q-py-sm" :key="idx" v-for="(product, idx) in products">
                        <a
                          class="text-weight-medium"
                          style="color:#3469A7; text-decoration: none; display: block; width: fit-content; font-size: 1em;"
                          v-if="settingProduct[product.key]"
                          :key="'product-'+idx"
                          :target="settingProduct[product.key].target"
                          :href="settingProduct[product.key].path">
                          {{ settingProduct[product.key].label }}
                        </a>
                      </div>
                    </template>
                  </div>
                </div>
              </div>

              <div class="col-xs-6 col-md-4">
                <div class="q-px-sm q-mb-md text-bold q-mb-md">
                  <div class="row" style="flex-direction: column;">
                    <div class="col-xs-6 col-md-6 q-mb-md" style="color:#2A3342;  font-size: 1.125em;">
                      Navigasi
                    </div>

                    <template
                    v-if="settingProduct">
                      <div class="col-xs-6 col-md-12 q-py-sm" :key="idx" v-for="(company, idx) in companies">
                        <a
                          class="text-weight-medium"
                          style="color:#3469A7; text-decoration: none; display: block; width: fit-content; font-size: 1em;"
                          v-if="settingProduct[company.key]"
                          :key="'company-'+idx"
                          :href="settingProduct[company.key].path">
                          {{ settingProduct[company.key].label }}
                        </a>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <!--  -->
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 q-px"
            :class="($q.platform.is.mobile ? 'q-mt-xl' : 'q-mt-none')"
            >
              <div class="text-weight-medium q-mb-lg" style="font-size: 1.125em; color: #888888;">
                <div>PT. Yang Muda Kaya Jl</div>
                <div class="q-my-md">Jl. Cijerokaso No. 57, Sarijadi, Kec. Sukasari, Bandung, Jawa Barat 40151 Indonesia</div>
                <div style="text-decoration: underline;">cs@finplan.id</div>
              </div>
              <div class="media-social bg-blue q-mt-lg q-px-md q-py-sm row" style="border-radius:10px; width:fit-content; gap: 10px;">

                <template :key="idx" v-for="(soscmed, idx) in socmeds">
                  <a  style="text-decoration: none; padding: 4px"
                    target="_blank">
                    <q-icon size="sm" :name="socmeds[idx].icon" color="light"/>
                  </a>
                </template>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer style="background-color: #FFFCF2; color: #8896AB; position: relative;" class="text-center q-pa-md q-py-xl">
        <hr class="liner">
        <span>
          © 2022 Finplan. All rights reserved.
        </span>
      </footer>
    </div>

  </q-layout>
</template>

<script>
import LayoutHeader from 'components/LayoutHeader.vue'
import { useMeta } from 'quasar';

const updateMeta = function (meta) {
  const location = window.location.pathname.split("/")

  useMeta({
    title: meta.title,
    meta: {
      description: { name: 'description', content: meta.description },
      image: { name: 'image', content: meta.image },
      image_link: { name: 'image_link', content: meta.image },
      ogTitle: { property: 'og:title', content: meta.title },
      ogDescription: { property: 'og:description', content: meta.description },
      ogImage: { property: 'og:image', content: meta.image },
      ogUrl: { property: 'og:url', content: location },
      twitterTitle: { property: 'twitter:title', content: meta.title },
      twitterDescription: { property: 'twitter:description', content: meta.description },
      twitterImage: { property: 'twitter:image', content: meta.image },
      twitterUrl: { property: 'twitter:url', content: location },
    }

  })


}

export default {
  name: 'FrontLayout',

  components: {
    LayoutHeader
  },

  data () {
    return {
      itemsDropdown: [
        {label: 'E-Learning', path: "/e-learning", target: ""},
        {label: 'Akademi', path: "", target: ""},
        {label:'Kamus', path: "/kamus", target: ""},
        {label:'Kalkulator', path: "/kalkulator/personal/budget", target: ""}
      ],

      products: [
        {
          key: "e-learning"
        },

        {
          key: "akademi"
        },

        {
          key: "kamus"
        },

        {
          key: "kalkulator"
        },
      ],

      companies: [
        {
          key: "home",
        },

        {
          key: "media"
        },

        {
          key: "advertisement"
        },

        {
          key: "kerja sama"
        },

        {
          key: "bantuan"
        },

        {
          key: "press kit"
        },

        {
          key: "disclaimer"
        },

        {
          key: "contact us"
        },

        {
          key: "term and conditions"
        },

        {
          key: "privacy&policy",
        }
      ],

      settingProduct: {
        "e-learning": {
          label: "E-Learning",
          path: "/e-learning",
          target: ""
        },

        akademi: {
          label: "Akademi",
          path: "/academy",
          target: ""
        },

        kamus: {
          label: "Kamus",
          path: "/kamus",
          target: ""
        },

        kalkulator: {
          label: "Kalkulator",
          path: "/kalkulator/personal/budget",
          target: ""
        },

        home: {
          label: "Home",
          path: "",
          target: ""
        },

        media: {
          label: "Media",
          path: "/media",
          target: "_blank"
        },

        advertisement: {
          label: "Advertisement",
          path: "/media/advertise/",
          target: ""
        },

        "kerja sama": {
          label: "Kerja Sama",
          path: "/media/kerja-sama/",
          target: ""
        },

        bantuan: {
          label: "Bantuan",
          path: "/media/bantuan/",
          target: ""
        },

        "press kit": {
          label: "Press Kit",
          path: "/media/press/",
          target: ""
        },

        disclaimer: {
          label: "Disclaimer",
          path: "/media/disclaimer",
          target: ""
        },

        "contact us": {
          label: "Contact Us",
          path: "/media/kontak-kami",
          target: ""
        },

        "term and conditions": {
          label: "Terms and Conditions",
          path: "/media/syarat-dan-ketentuan",
          target: ""
        },

        "privacy&policy": {
          label: "Privacy & Policy",
          path: "/privacy-policy",
          target: ""
        },
      },

      socmeds: [
        {
          label: "facebook",
          key: "Socmed Facebook",
          icon: "img:/images/facebook.svg"
        },
        {
          label: "twitter",
          key: "Socmed Twitter",
          icon: "img:/images/twitter.svg"
        },
        {
          label: "instagram",
          key: "Socmed Instagram",
          icon: "img:/images/instagram.svg"
        },
        {
          label: "linkedin",
          key: "Socmed Linkedin",
          icon: "img:/images/linkedin.svg"
        },

        {
          label: "google",
          key: "Socmed Google",
          icon: "img:/images/google.svg"
        },

        {
          label: "youtube",
          key: "Socmed Youtube",
          icon: "img:/images/youtube.svg"
        },

      ],


      x: '',
      user: null,
      searchQuery: '',
      navHeader: [],
      showMenu: false,

      useComponent: true
    }
  },

  created () {
    this.useComponent = true
    // this.appMode = process.env.NODE_ENV
    // if (this.appMode != 'development'){
    //   import('../lib/header.mjs').then(app => {
    //     let header = app.default
    //     header.myApp.config.globalProperties.$global = this.$global
    //     header.myApp.config.globalProperties.$route = this.$route
    //     header.myApp.config.globalProperties.$router = this.$router
    //     header.myApp.mount('#app-header')
    //   })
    // }
    this.appMode = process.env.NODE_ENV
    updateMeta(this.$route.meta)

    this.$global.$on('meta-updated', (value) => {
      const meta = {
        key: value.key,
        title: value.title,
        description: value.description,
        image: value.image,
      }

      updateMeta(meta)
    })
    this.$global.$on('user', (user) => {
      this.user = user
    })
    this.$global.$on('setting', (setting) => {
      this.setupSetting(setting)
    })
  },

  mounted () {

    try {
      document.getElementById('first-spinner').style.display = 'none'
    } catch (e) {
    }
    this.user = this.$utils.getUser()
    this.setupSetting(this.$utils.getSetting())
    this.getSetting()
    this.getDeviceId()
  },

  methods: {
    getDeviceId () {
      let deviceId = this.$utils.getDeviceId()
      if (!deviceId) {
        this.$services.visitor.generate((data) => {
          console.log(data)
          this.$utils.saveDeviceId(data)
        }, (msg, err) => {
          console.log(msg)
        }, () => {
        })
      }
    },
    getSetting () {
      this.$services.getSetting(null, (data) => {
        this.$global.$emit('setting', data)
      }, (msg, errors) => {
        console.log(msg)
      }, () => {
      })
    },
    setupSetting(setting) {
      if (setting == null) {
        return
      }
      this.setting = setting
      const navHeader = JSON.parse(setting["Navigation Bar"])
      navHeader.forEach((item, i) => {
        if (typeof item.val === 'object') {
          item.val.forEach((child, j) => {
            let link = this.getLink(child.val)
            child.val = link.link
            child.target = link.target
          })
        } else {
          let link = this.getLink(item.val)
          item.val = link.link
          item.target = link.target
        }
      })

      this.navHeader = navHeader
    },

    getLink (link) {
      let url = link
      let target = ''
      if (link.indexOf(';http') > 0) {
        let values = url.split(';')
        url = values[1]
        target = values[0]
      }
      return {
        link: url,
        target: target
      }
    }
  },

  watch: {
    '$route.query.login': function (newVal) {
      if (newVal == 'true') {
        this.$global.$emit('showLogin')
      }
    },
    searchQuery: function (newVal, oldVal) {
      if (newVal) {
        this.$router.push({
          query: {
            search: newVal
          },
          path: '/search'
        })
      }
    },

    '$route.path': function (newVal, oldVal) {
      updateMeta(this.$route.meta)
    }
  }
}
</script>
