<template>
    <div class="nav-bar" ref="navBar">
      <q-toolbar
          class="container q-px-md">
          <a href="/" class="q-mr-md mobile-only"
              @click="(e) => { $utils.openLink(e, '/', $router) }">
              <img src="/images/finplan-logo-square.png" style="height: 38px" text-color="white" class="vertical-middle" height="38px"/>
          </a>
          <a href="/" class="q-mr-md desktop-only"
              @click="(e) => { $utils.openLink(e, '/', $router) }">
              <img src="/images/finplan-logo-black.png" style="height: 38px" text-color="white" class="vertical-middle" height="38px"/>
          </a>
          <div class="toolbar-menus mobile-only">
              <q-btn
                class="gtm-track"
                flat dense no-caps
                label="Menu"
                icon-right="expand_more"
                @click="showMenu = !showMenu"
                gtm-action="btn_header_menu"/>
          </div>
          <div class="flex-1">
          </div>
          <div class="toolbar-menus desktop-only">
            <template
              v-for="(nav, idx) in products">
                <q-btn-dropdown
                  v-if="haveArray(nav.val)"
                  class="gtm-track"
                  :key="'nav-'+idx"
                  flat stretch no-caps
                  :label="nav.label"
                  gtm-action="btn_header_dropdown">
                  <q-list>
                    <template
                    v-for="(navChild, idxChild) in nav.val"
                      :key="`x.${idxChild}`"
                    >

                    <q-item
                      v-if="!haveArray(navChild.val)"
                      tag="a"
                      :href="navChild.val"
                      :target="navChild.target"
                      :class="this.childDropdownShow"
                      class="link-item"
                      clickable
                      replace
                      exact
                      :tabindex="idxChild">

                      <q-item-section :style="haveArray(navChild.val) ? 'flex-direction: row; align-items: center; column-gap: 20px;' : 'flex-direction: columns;'" >
                        <q-item-label>{{navChild.label}}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item  v-else
                      class="link-item"
                      clickable
                      v-ripple
                      v-close-popup="haveArray(navChild.val) ? false : true"
                      @click="handleChild(navChild.val)"
                    >
                      <q-item-section  style="flex-direction: row; align-items: center; column-gap: 20px;">
                        <div class="child-dropdowns" v-if="haveArray(navChild.val)"
                        :style="this.childDropdownShow ? 'opacity: 1; z-index: 5;' : 'opacity: 0; z-index: -5;'"
                        style="position: absolute; top: 0; right: -100px; 
                        transition: 0.50s ease; box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.25);
                        "
                        >
                          <q-item
                            class="bg-white childs-link"
                            tag="a"
                            :href="child.val"
                            :target="child.target"
                            v-for="(child, idxChild) in navChild.val"
                            :key="`x.${idxChild}`"
                            clickable
                            exact
                            replace
                            v-close-popup
                            :tabindex="idxChild">
                            {{ child.label }}
                          </q-item>
                        </div>


                        <q-item-label>{{navChild.label}}</q-item-label>
                        <q-icon>
                          <img src="/images/illustration/arrow-right.svg" alt="icon arrow right">
                        </q-icon>
                      </q-item-section>
                    </q-item>


                    </template>
                  </q-list>
                </q-btn-dropdown>

              <q-btn
                v-else
                flat stretch no-caps
                class="gtm-track"
                type="a"
                :key="'nav3-'+idx"
                :href="nav.val"
                :target="nav.target"
                replace
                exact
                :label="nav.label"
                gtm-action="btn_header_nav_item"/>
            </template>

          </div>

          <template
              v-if="user">
              <q-btn
                flat no-caps round
                class="gtm-track"
                type="a"
                href="/product/purchased"
                icon="history"
                @click="e => {
                    $utils.openLink(e, '/product/purchased', $router)
                }"
                gtm-action="btn_header_history"/>
              <q-btn
                flat stretch no-caps
                class="q-ml-sm gtm-track"
                type="a"
                href="/profile"
                label="Profil"
                @click="e => {
                    $utils.openLink(e, '/profile', $router)
                }"
                gtm-action="btn_header_profile"/>
          </template>
          <template
              v-else>
              <q-btn
                no-caps push
                color="secondary"
                class="text-black q-px-md btn-medium"
                :class="'gtm-track ' + ($q.platform.is.mobile ? 'q-px-xs q-ml-sm' : 'q-px-xs q-ml-sm')"
                label="Daftar / Masuk"
                @click="$global.$emit('showLogin')"
                gtm-action="btn_header_login_register"/>
          </template>
      </q-toolbar>
    </div>
    <div class="mobile-header-menu mobile-only" v-if="showMenu">
      <div style="background-color: #fff">
        <div class="container">
          <template
            v-for="(nav, idx) in products">
              <q-btn-dropdown
                v-if="haveArray(nav.val)"
                class="link-item gtm-track"
                :key="'nav-'+idx"
                flat stretch no-caps
                :label="nav.label"
                gtm-action="btn_header_dropdown">
                <q-list style="position: relative;">
                  <template
                  v-for="(navChild, idxChild) in nav.val"
                    :key="`x.${idxChild}`"
                  >

                  <q-item
                    v-if="!haveArray(navChild.val)"
                    tag="a"
                    :href="navChild.val"
                    :target="navChild.target"
                    :class="this.childDropdownShow"
                    class="link-item"
                    clickable
                    @click="showMenu = false"
                    :tabindex="idxChild">

                    <q-item-section :style="haveArray(navChild.val) ? 'flex-direction: row; align-items: center; column-gap: 20px;' : 'flex-direction: columns;'" >
                      <q-item-label>{{navChild.label}}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-btn-dropdown  v-else
                    style="width: 100%; justify-content: start; "
                    class="link-item btn-dropdown-custom"
                    clickable
                    stretch no-caps flat
                    :square="true"
                    :label="navChild.label"
                  >

                    <q-list
                      v-for="(navChild, idxChild) in nav.val"
                        :key="`x.${idxChild}`"
                    >
                      <template
                        v-if="haveArray(navChild.val)"
                      >
                        <q-item
                          v-for="(child, idxChild) in navChild.val"
                          :key="`x.${idxChild}`"
                          tag="a"
                          replace
                          :href="child.val"
                          :target="child.target"
                          :class="this.childDropdownShow"
                          class="link-item"
                          clickable
                          @click="showMenu = false"
                          :tabindex="idxChild">
                          <q-item-section>

                            <q-item-label>{{child.label}}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-list>
                  </q-btn-dropdown>


                  </template>
                </q-list>
            </q-btn-dropdown>

            <q-btn
              v-else
              class="gtm-track"
              flat stretch no-caps
              type="a"
              replace
              :key="'nav2-'+idx"
              :href="nav.val"
              :target="nav.target"
              :label="nav.label"
              @click="showMenu = false"
              gtm-action="btn_header_nav_item"/>
          </template>


        </div>
      </div>
      <div class="flex-1" @click="showMenu = false">
      </div>

    </div>

    <template v-if="Object.keys(this.upComingWebinar).length !== 0 && this.countClose >= 0 && this.countClose < 3">
      
      <header class="header-front q-px-md" v-if="this.showWebinar"
        :style="this.heightNav.top !== 0 ? `top: ${this.heightNav.top}` : 'top: 0px'"
      >
        <div class="container q-pa-md">
          <div class="content-webinar">
            <a              
              tag="a"
              :href="upComingWebinar.link"
              target="_blank"
              class="title-webinar">
              <span>[TERBARU]</span>
              {{ upComingWebinar.title }}
            </a>
  
            <div class="subTitle-webinar">
              {{ upComingWebinar.date.toString() }}
            </div>
          </div>
          <q-btn
            dense outline  
            class="q-py-xs q-px-xs gtm-track" icon="close" @click="handleCloseWebinar()"
            color="white"
            gtm-action="btn_header_news_close"/>
        </div>
      </header>
      
    </template>
    

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
</template>

<style>
  /* cusstom roll quasar */
  div[role='menu'].q-menu{
    overflow: visible;
  }

  .link-item:hover{
    background-color: #FFCC004D !important;
  }

  .childs-link:hover{
    background: rgb(242, 220, 135) !important;
  }

  .btn-dropdown-custom span.q-btn__content{
    justify-content: space-between;
  }

  .q-btn-item:hover{
    background: rgba(255, 204, 0, 0.3);
  }

</style>

<script>
import DialogLogin from './dialogs/DialogLogin.vue'
import DialogRegisterMini from './dialogs/auth/DialogRegisterMini.vue'
import DialogForgotPassword from './dialogs/DialogForgotPassword.vue'

export default {
    components: {
        DialogLogin,
        DialogRegisterMini,
        DialogForgotPassword
    },

    data () {
        return {
          countClose: 0, 
          x: '',
          user: null,
          searchQuery: '',
          navHeader: [],

          setting: null,
          childDropdownShow: false,
          upComingWebinar: {},

          products: [
            // {label: 'Home', val: "/", target: ""},
            {label: 'E-Learning', val: "/e-learning", target: ""},
            {label: 'Media', val: "/media", target: ""},
            {
              label:'Kalkulator', val: [
                {label: "50/30/20", val: "/kalkulator/personal/budget", target: ""},
                {label: "Profil Resiko", val: "/kalkulator/personal/profil-resiko", target: ""},
                {label: "Zakat Mal", val: "/kalkulator/personal/zakat-mal", target: ""}
              ]
            },
            {label: 'Lainnya', val: [
                {label: 'Akademi', val: "/academy", target: ""},
                {label:'Kamus', val: "/kamus", target: ""},
              ]
            },
          ],
          showMenu: false,
          showWebinar: true,
          heightNav: {
            top: 0,
          }
        }
    },

    created() {
      this.$global.$on('meta-updated', (value) => {
        const meta = {
          key: value.key,
          title: value.title,
          description: value.description,
          image: value.image,
        }
        // updateMeta(meta)
      })
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
    this.$global.$on('setting', (setting) => {
      this.setupSetting(setting)
    })
  },


  mounted () {
    this.user = this.$utils.getUser()
    this.setupSetting(this.$utils.getSetting())
    this.$global.$on('setting', (setting) => {
      this.setupSetting(setting)
    })

    this.heightNav.top = this.$refs.navBar.offsetHeight + "px"
    if(!localStorage.getItem("count_webinar")){
      localStorage.setItem("count_webinar", this.countClose)
    
    }else{
      let count = parseInt(localStorage.getItem("count_webinar"))
      this.countClose = count
    }
  },

  methods: {
    handleCloseWebinar(){
      let count = parseInt(localStorage.getItem("count_webinar"));
      count++;
  
      this.countClose = count
      localStorage.setItem("count_webinar", count.toString())

      this.showWebinar = !this.showWebinar
    },

    handleChild(val){
      if(Array.isArray(val)){
        this.childDropdownShow = !this.childDropdownShow
      }else{
        this.childDropdownShow = false
      }
    },

    haveArray(val){
      if(Array.isArray(val)) return true
      return false
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

      if (setting["Upcoming Webinar"]) {
        let upcoming_webinar = JSON.parse(setting["Upcoming Webinar"]);
        this.upComingWebinar = {...upcoming_webinar}
      }

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
  }
}
</script>