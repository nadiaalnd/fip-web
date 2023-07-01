<template>
  <q-page class="q-py-md">
    <div class="container q-px-md q-mt-xl">
      <div class="text-bold text-primary" style="font-size: 24px;">
        Mulai Langkahmu Menuju Financial Freedom
      </div>
      <div class="text-dark q-mt-md" style="font-size: 16px;">
        Hanya dengan modal 99 Ribu, tonton puluhan video pembelajaran eksklusif dan tambahan materi ter-update seputar investasi di Pasar Modal.
        <br><span class="text-bold">AKSES PENUH, TANPA BATAS!</span>
      </div>
      <q-btn
        v-if="!hasActivePackage"
        style="font-weight: 600; font-size: 1rem; background-color: #FFCC00; border-radius: 10px;"
        no-caps unelevated
        color="secondary"
        class="text-black q-px-md q-mt-md gtm-track"
        label="Mulai Gratis"
        @click="$router.push({ path: '/free/package/e-learning'})"
        gtm-action="btn_free_get_home"/>
      <div class="container q-px-md q-mt-xl q-mb-lg">
        <div class="list-popular-product row">
          <!-- Sidebar -->
          <div class="col-12 col-md-4">
            <div
              class="card"
              style="
                background: #FFFCF2;
                width: 338px;
                height: 768px;
                padding: 40px 24px 40px 24px;
                border-radius: 32px;
                gap: 32px;
              "
            >
              <h3 class="text-bold text-dark q-mb-md q-mt-md">Materi</h3>
              <ul class="list-group">
                <li
                  class="list-group-item"
                  :class="{ 'active': activeMenu === 1 }"
                  :style="{ backgroundColor: activeMenu === 1 ? '#FFDE59' : '' }"
                  @click="changeActiveMenu(1)"
                >
                  Saham
                </li>
                <li
                  class="list-group-item"
                  :class="{ 'active': activeMenu === 2 }"
                  :style="{ backgroundColor: activeMenu === 2 ? '#FFDE59' : '' }"
                  @click="changeActiveMenu(2)"
                >
                  Obligasi dan Sukuk
                </li>
                <li
                class="list-group-item"
                :class="{ 'active': activeMenu === 3 }"
                :style="{ backgroundColor: activeMenu === 3 ? '#FFDE59' : '' }"
                @click="changeActiveMenu(3)"
                >
                  Emas
                </li>
                <li
                class="list-group-item"
                :class="{ 'active': activeMenu === 4 }"
                :style="{ backgroundColor: activeMenu === 4 ? '#FFDE59' : '' }"
                @click="changeActiveMenu(4)"
                >
                  Reksadana
                </li>
                <li
                class="list-group-item"
                :class="{ 'active': activeMenu === 5 }"
                :style="{ backgroundColor: activeMenu === 5 ? '#FFDE59' : '' }"
                @click="changeActiveMenu(5)"
                >
                  Management Income
                </li>
                <li
                class="list-group-item"
                :class="{ 'active': activeMenu === 6 }"
                :style="{ backgroundColor: activeMenu === 6 ? '#FFDE59' : '' }"
                @click="changeActiveMenu(6)"
                >
                  Perencanaan Keuangan
                </li>
                <li
                class="list-group-item"
                :class="{ 'active': activeMenu === 7 }"
                :style="{ backgroundColor: activeMenu === 7 ? '#FFDE59' : '' }"
                @click="changeActiveMenu(7)"
                >
                  Tujuan Finansial
                </li>
                <li
                class="list-group-item"
                :class="{ 'active': activeMenu === 8 }"
                :style="{ backgroundColor: activeMenu === 8 ? '#FFDE59' : '' }"
                @click="changeActiveMenu(8)"
                >
                  Cryptocurrency
                </li>
                <li
                class="list-group-item"
                :class="{ 'active': activeMenu === 9 }"
                :style="{ backgroundColor: activeMenu === 9 ? '#FFDE59' : '' }"
                @click="changeActiveMenu(9)"
                >
                  Keuangan dan Ekonomi
                </li>
              </ul>
              <!-- Pekerjaan -->
              <h3 class="text-bold text-dark q-mb-md q-mt-xl">Pekerjaan</h3>
              <ul class="list-group">
                <li
                  class="list-group-item"
                  :class="{ 'active': activeMenu === 10 }"
                  :style="{ backgroundColor: activeMenu === 10 ? '#FFDE59' : '' }"
                  @click="changeActiveMenu(10)"
                >
                  Pelajar/Mahasiswa
                </li>
                <li
                  class="list-group-item"
                  :class="{ 'active': activeMenu === 11 }"
                  :style="{ backgroundColor: activeMenu === 11 ? '#FFDE59' : '' }"
                  @click="changeActiveMenu(11)"
                >
                  Ibu Rumah Tangga
                </li>
                <li
                class="list-group-item"
                :class="{ 'active': activeMenu === 12 }"
                :style="{ backgroundColor: activeMenu === 12 ? '#FFDE59' : '' }"
                @click="changeActiveMenu(12)"
                >
                  Pekerja
                </li>
                <li
                class="list-group-item"
                :class="{ 'active': activeMenu === 13 }"
                :style="{ backgroundColor: activeMenu === 13 ? '#FFDE59' : '' }"
                @click="changeActiveMenu(13)"
                >
                  Pembisnis
                </li>
              </ul>
              <div class="mt-3">
                <h3 class="text-bold text-dark q-mb-md q-mt-xl">Tingkatan</h3>
                <label class="radio-container text-dark">Semua Tingkatan
                  <input type="radio" name="radio" @click="changeColor('yellow')" />
                  <span class="checkmark"></span>
                </label>
                <label class="radio-container text-dark">Pemula
                  <input type="radio" name="radio" @click="changeColor('yellow')" />
                  <span class="checkmark"></span>
                </label>
                <label class="radio-container text-dark">Menengah
                  <input type="radio" name="radio" @click="changeColor('yellow')" />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
          <!-- Content Video -->
          <div class="col-12 col-md-8">
            <section
    	        id="start-learning"
    	        class="container list-popular-product q-px-md q-pb-md">
              <SectionProduct
                :showPrice="false"
                :id="'dashboard-'+idx"
                class="q-my-md"
                v-for="(content, idx) in contents"
                :key="'content-'+idx"
                :content="content"/>
            </section>
          </div>
        </div>
      </div>
    </div>
    <!-- Popular Video -->
    <div class="container q-mb-lg" id="popular">
      <SectionProduct
        :showPrice="false"
        :id="'popular-'+idx"
        class="q-my-md"
        v-for="(content, idx) in [popularProduct]"
        :key="'popular-'+idx"
        :content="content">
      </SectionProduct>
    </div>
  </q-page>
</template>

<style>
ul.list-group {
  list-style: none;
  padding-left: 0;
}

.list-group-item {
  border-radius: 8px;
  padding-left: 10px;
  cursor: pointer;
  margin-bottom: 7px;
}

.radio-container {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
}

.radio-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #FFFFFF;
  border-radius: 50%;
  border: 1px solid #CCC;
}

.radio-container input:checked {
  outline: none;
}

.radio-container input:checked ~ .checkmark {
  background-color: #FFDE59;
  border: 2px solid #FFDE59;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.radio-container input:checked ~ .checkmark:after {
  display: block;
}

.radio-container .checkmark:after {
  top: 4px;
  left: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
</style>
<script>
import SectionProduct from 'components/SectionProduct'
export default {
  components: {
    SectionProduct
  },

  data () {
    return {
      contents: [],
      setting: null,
      popularProduct: {
        icon: '/images/profile-bookmark.svg',
        code: 'Produk Populer',
        products: [],
        host: process.env.HOST
      },
      hasActivePackage: false,
      activeMenu: null
    }
  },

  created () {
    this.$global.$on('active_package', (data) => {
      this.hasActivePackage = data.ActivePackage == 1
    })
  },

  mounted () {
  	this.getDashboard()
    this.getPopularProduct()
    this.setting = this.$utils.getSetting()
    this.$global.$on('setting', (data) => {
      this.setting = data
    })
    this.$nextTick(function () {
      if (this.$route.query.scroll) {
        this.scrollTo(this.$route.query.scroll)
      }
    }.bind(this))
  },

  methods: {
    scrollTo (id = 'start-learning') {
      window.scroll({
        top: document.getElementById(id).offsetTop,
        behavior: 'smooth'
      })
    },
    changeActiveMenu(menu) {
      this.activeMenu = menu;
      this.changeColor('#FFDE59');
    },
    getPopularProduct () {
      const filter = {
        tag: this.popularProduct.code
      }

      this.$services.product.get(filter, (data) => {
        this.popularProduct.products = data
        console.log(this.popularProduct)
      }, (msg, errors) => {
      }, () => {
      })
    },
    getDashboard () {
      this.$services.dashboard (data => {
        data.forEach((item, i) => {
          const subcategory = {
            id: item.id,
            code: item.code,
            icon: item.icon,
            idx: item.idx,
          }
          item.products.forEach((product, i) => {
            product.type = 0
            product['subcategory'] = subcategory
          })

        })
        this.contents = data
        this.$nextTick(() => {
          this.$emit('pageReady')
        })
      }, (msg, errors) => {
      }, () => {
      })
    },
    changeColor(color) {
      console.log('Color changed to:', color);
    }
  }
}
</script>
