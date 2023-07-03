<template>
  <q-layout id="brand-layout" view="lHh LpR lFf">
    <q-header style="background-color: #FFFCF2;">
      <q-toolbar
        class="container q-pl-xl q-pr-lg q-py-lg">
        <a href="/" class="q-mr-md mobile-only"
          @click="(e) => { $utils.openLink(e, '/', $router) }">
          <img src="/images/finplan-logo-black.png" style="height: 38px" text-color="white" class="vertical-middle" height="38px"/>
        </a>
        <a href="/" class="q-mr-md desktop-only"
          @click="(e) => { $utils.openLink(e, '/', $router) }">
          <img src="/images/finplan-logo-black.png" style="height: 38px" text-color="white" class="vertical-middle" height="38px"/>
        </a>
        <div class="toolbar-menus mobile-only">
          <q-btn
            flat dense no-caps
            label="Menu"
            icon-right="expand_more"
            @click="showMenu = !showMenu"/>
        </div>
        <div class="toolbar-menus desktop-only">
          <template
            v-for="(nav, idx) in navHeader">
            <q-btn-dropdown
              v-if="typeof nav.val === 'object'"
              :key="'nav-'+idx"
              flat stretch no-caps
              :label="nav.key">
              <q-list>
                <q-item
                  tag="a"
                  :href="navChild.val"
                  :target="navChild.target"
                  v-for="(navChild, idxChild) in nav.val"
                  :key="`x.${idxChild}`"
                  clickable v-close-popup
                  :tabindex="idxChild">
                  <q-item-section>
                    <q-item-label>{{navChild.key}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-btn
              v-else
              flat stretch no-caps
              type="a"
              :key="'nav-'+idx"
              :href="nav.val"
              :target="nav.target"
              :label="nav.key"/>
          </template>
        </div>
        <div
          v-if="user == null"
          class="flex-1 text-right">
          <q-btn
            flat no-caps
            :class="($q.platform.is.mobile ? 'q-px-xs q-ml-sm' : 'q-px-sm q-ml-lg')"
            label="Home"
            color="black"/>
          <q-btn
            flat no-caps
            :class="($q.platform.is.mobile ? 'q-px-xs q-ml-sm' : 'q-px-sm q-ml-lg')"
            label="About"
            color="black"/>


          <q-btn-dropdown :class="($q.platform.is.mobile ? 'q-px-xs q-ml-sm' : 'q-px-sm q-ml-lg')" color="black" flat no-caps label="Product">
            <q-list>

                <q-item style="width: 10.625rem;" v-for="(item, idx) in itemsDropdown" :key="idx" class="item-dropdown" clickable v-close-popup @click="() => {}"

                  >

                  <a
                    class="text-weight-medium"
                    style="color: #1A1A1A; text-decoration: none; display: flex; width: 100%; font-size: 1.25em;"
                    :key="'product-'+idx"
                    :href="item.path">
                    <q-item-section >
                      <q-item-label class="text-weight-medium" >
                        {{ item.label }}
                      </q-item-label>
                    </q-item-section>
                  </a>


                </q-item>
            </q-list>
          </q-btn-dropdown>





          <!-- <q-btn
            flat no-caps
            :class="($q.platform.is.mobile ? 'q-px-xs q-ml-sm' : 'q-px-sm q-ml-lg')"
            label="Login"
            color="black"
            @click="$global.$emit('showLogin')"/> -->
          <q-btn
            flat no-caps
            class="q-btn q-btn-item non-selectable no-outline q-btn--push q-btn--rectangle bg-secondary text-white q-btn--actionable q-focusable q-hoverable q-btn--no-uppercase q-btn--dense text-black text-bold q-px-md q-px-xs q-ml-sm q-btn--active"
            :class="($q.platform.is.mobile ? 'q-px-xs q-ml-sm' : 'q-px-sm q-ml-lg')"
            label="Daftar / Masuk"
            style="border-radius:10px; font-weight: 600;"
            @click="$global.$emit('showRegister')"/>
        </div>
        <div
          v-else
          class="flex-1 text-right">
          <q-btn
            flat no-caps
            :class="($q.platform.is.mobile ? 'q-px-xs q-ml-sm' : 'q-px-sm q-ml-lg')"
            label="Home"
            color="secondary"/>
          <q-btn
            flat no-caps
            :class="($q.platform.is.mobile ? 'q-px-xs q-ml-sm' : 'q-px-sm q-ml-lg')"
            label="About"
            color="secondary"/>
          <q-btn
            flat no-caps
            :class="($q.platform.is.mobile ? 'q-px-xs q-ml-sm' : 'q-px-sm q-ml-lg')"
            label="Product"
            color="secondary"/>
          <q-btn
            flat no-caps
            :class="($q.platform.is.mobile ? 'q-px-xs q-ml-sm' : 'q-px-sm q-ml-lg')"
            label="Profil"
            color="secondary"/>
        </div>
      </q-toolbar>
    </q-header>
    <div class="mobile-header-menu mobile-only" v-if="showMenu">
      <div style="background-color: #fff">
        <div class="container">
          <template
            v-for="(nav, idx) in navHeader">
            <q-btn-dropdown
              v-if="typeof nav.val === 'object'"
              :key="'m-nav-'+idx"
              flat stretch no-caps
              :label="nav.key">
              <q-list>
                <q-item
                  tag="a"
                  :href="navChild.val"
                  :target="navChild.target"
                  v-for="(navChild, idxChild) in nav.val"
                  :key="`x.${idxChild}`"
                  clickable v-close-popup
                  :tabindex="idxChild">
                  <q-item-section>
                    <q-item-label>{{navChild.key}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-btn
              v-else
              flat stretch no-caps
              type="a"
              :key="'m-nav-'+idx"
              :href="nav.val"
              :target="nav.target"
              :label="nav.key"/>
          </template>
        </div>
      </div>
      <div class="flex-1" @click="showMenu = false">
      </div>
    </div>
    <q-page-container>
      <router-view class="app-bg"/>
      <q-page-sticky position="bottom-right" :offset="[18, 18]"
        style="z-index: 1">
        <a
          href="https://api.whatsapp.com/send/?phone=085156700865&text=Halo+Finplan%2C+saya+mau+tanya+&app_absent=0"
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
                  <div class="col-xs-6 col-md-6" style="font-size: 1.125em; color: #2A3342;">
                    Product
                  </div>

                  <template
                  v-if="setting">
                    <div class="col-xs-6 col-md-6 q-mt-lg" :key="idx" v-for="(product, idx) in products">
                      <a
                        class="text-weight-medium"
                        style="color: #556987; text-decoration: none; display: block; width: fit-content; font-size: 1em;"
                        v-if="setting[product.key]"
                        :key="'product-'+idx"
                        :href="setting[product.key].path">
                        {{ setting[product.key].label }}
                      </a>
                    </div>
                  </template>
                </div>
              </div>
            </div>

            <div class="col-xs-6 col-md-4">
              <div class="q-px-sm q-mb-md text-bold q-mb-md">
                <div class="row" style="flex-direction: column;">
                  <div class="col-xs-6 col-md-6" style="color:#2A3342;  font-size: 1.125em;">
                    Navigasi
                  </div>

                  <template
                  v-if="setting">
                    <div  class="col-xs-6 col-md-12 q-mt-lg" :key="idx" v-for="(company, idx) in companies">
                      <a
                        class="text-weight-medium"
                        style="color: #556987; text-decoration: none; display: block; width: fit-content; font-size: 1em;"
                        v-if="setting[company.key]"
                        :key="'company-'+idx"
                        :href="setting[company.key].path">
                        {{ setting[company.key].label }}
                      </a>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 q-px">
            <div class="text-weight-medium q-mb-lg" style="font-size: 1.125em; color: #888888;">
              <div>PT. Yang Muda Kaya Jl</div>
              <div class="q-my-md">Jl. Cijerokaso No. 57, Sarijadi, Kec. Sukasari, Bandung, Jawa Barat 40151 Indonesia</div>
              <div style="text-decoration: underline;">cs@finplan.id</div>
            </div>
            <div class="media-social bg-grey-5 q-mt-lg q-px-md q-py-sm row" style="border-radius:10px; width:fit-content; gap: 10px;">

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
    <DialogLogin
      ref="dialogLogin"
      @register="$refs.dialogRegister.show()"
      @forgot="$refs.dialogForgotPassword.show()"/>
    <DialogRegisterMini
      ref="dialogRegister"
      @login="$refs.dialogLogin.show()"/>
    <DialogForgotPassword
      ref="dialogForgotPassword"
      @login="$refs.dialogLogin.show()"/>
  </q-layout>
</template>

<style>
  .item-dropdown:hover{
    background-color: #FFCC004D;
  }

</style>

<script>
import DialogLogin from 'components/dialogs/DialogLogin'
import DialogRegisterMini from 'components/dialogs/auth/DialogRegisterMini'
import DialogForgotPassword from 'components/dialogs/DialogForgotPassword'
import { ref } from 'vue'

export default {
  name: 'BrandLayout',

  components: {
    DialogLogin,
    DialogRegisterMini,
    DialogForgotPassword
  },

  meta () {
    return {
      title: this.aMeta.title
    }
  },

  setup () {
    return {
      model: ref(null),
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
    }
  },


  data () {
    return {
      aMeta: {
        title: 'Finplan.id'
      },

      x: '',
      user: null,
      searchQuery: '',
      navHeader: [],
      itemsDropdown: [{label: 'E-Learning', path: "/e-learning"}, {label: 'Akademi', path: ""}, {label:'Kamus', path: "/kamus"}, {label:'Kalkulator', path: "/kalkulator/personal/budget"}],
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
          key: "about",
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
      ],

      setting: {
        "e-learning": {
          label: "E-Learning",
          path: "/e-learning"
        },

        akademi: {
          label: "Akademi",
          path: "/academy"
        },

        kamus: {
          label: "Kamus",
          path: "/kamus"
        },

        kalkulator: {
          label: "Kalkulator",
          path: "/kalkulator/personal/budget"
        },

        home: {
          label: "Home",
          path: "/media/"
        },

        about: {
          label: "About",
          path: ""
        },

        media: {
          label: "Media",
          path: ""
        },

        advertisement: {
          label: "Advertisement",
          path: "/media/advertisement/"
        },

        "kerja sama": {
          label: "Kerja Sama",
          path: "/media/kerja-sama/"
        },

        bantuan: {
          label: "Bantuan",
          path: "/media/bantuan/",
        },

        "press kit": {
          label: "Press Kit",
          path: "/media/press/",
        },

        disclaimer: {
          label: "Disclaimer",
          path: "/media/disclaimer",
        },

        "contact us": {
          label: "Contact Us",
          path: "/media/kontak-kami",
        },

        "terms and conditions": {
          label: "Terms and Conditions",
          path: "/media/kontak-kami/",
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

      showMenu: false,

      dialogCart: false,
      cartCount: ''
    }
  },

  created () {
    this.$global.$on('user', (user) => {
      this.user = user
    })
    this.$global.$on('showLogin', (data) => {
      if (data && data.register) {
        this.$refs.dialogRegister.show()
      } else {
        this.$refs.dialogLogin.show()
      }

    })

    this.$global.$on('showRegister', (data) => {
        this.$refs.dialogRegister.show()
    })

    this.$global.$on('setting', (setting) => {
      this.setupSetting(setting)
    })
    this.$global.$on('addCart', (product) => {
      this.$refs.dialogCart.addCart(product)
    })

    this.$global.$on('cartChanged', (count) => {
      // console.log('cartChanged', count)
      this.cartCount = count
    })
  },

  // mounted () {
  //   this.$refs.dialogCart.countCart(true)
  //   this.user = this.$utils.getUser()
  //   this.setupSetting(this.$utils.getSetting())
  //   this.getSetting()
  // },

  methods: {
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
      this.aMeta.title = 'Finplan.id'
    }
  }
}
</script>
