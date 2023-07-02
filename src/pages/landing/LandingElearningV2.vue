<template>
  <q-page class="q-py-md">
    <div class="container q-px-md q-mt-xl">
      <div class="text-bold text-primary q-mb" style="font-size: 24px">
        Mulai Langkahmu Menuju Financial Freedom
      </div>
      <div class="text-dark q-mt-md" style="font-size: 16px">
        Hanya dengan modal 99 Ribu, tonton puluhan video pembelajaran eksklusif
        dan tambahan materi ter-update seputar investasi di Pasar Modal.
        <br /><span class="text-bold">AKSES PENUH, TANPA BATAS!</span>
      </div>
      <q-btn
        v-if="!hasActivePackage"
        style="
          font-weight: 600;
          font-size: 1rem;
          background-color: #ffcc00;
          border-radius: 10px;
        "
        no-caps
        unelevated
        color="secondary"
        class="text-black q-px-md q-mt-md gtm-track"
        label="Mulai Gratis"
        @click="$router.push({ path: '/free/package/e-learning' })"
        gtm-action="btn_free_get_home"
      />
      <div class="container q-px-md q-mt-xl q-mb-lg">
        <div class="sidebar-content-video row">
          <!-- Sidebar -->
          <div class="col-12 col-md-3">
            <div
              class="card sidebar-mobile"
              style="
                background: #FFFCF2;
                width: 300px;
                height: 100vh;
                padding: 40px 24px 40px 24px;
                border-radius: 32px;"
            >
              <h1 class="text-bold text-dark" style="font-size: 20px;">Materi</h1>
              <ul class="sidebar-list-group">
                <li
                  class="sidebar-list-group-item"
                  v-for="item in navs.materi"
                  :style="{ backgroundColor: activeMenu === item ? '#FFDE59' : '' }"
                  :key="item.id"
                  @click="changeFilter(item)"
                >
                  {{ item }}
                </li>
              </ul>
              <h1 class="text-bold text-dark" style="font-size: 20px;">Pekerjaan</h1>
              <ul class="sidebar-list-group">
                <li
                  class="sidebar-list-group-item"
                  v-for="item in navs.pekerjaan"
                  :key="item.id"
                  :class="{ 'active': activeMenu === item }"
                  @click="changeFilter(item)"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
          <!-- Content Video -->
          <div class="col-12 col-md-9" style="padding-left:40px ;">
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
        :id="'popular-' + idx"
        class="q-my-md"
        v-for="(content, idx) in [{...popularProduct, category: 'popularProduct'}]"
        :key="'popular-' + idx"
        :content="content"
      >
      </SectionProduct>
    </div>
  </q-page>
</template>

<style>


</style>
<script>
import SectionProduct from "components/SectionProduct";
export default {
  components: {
    SectionProduct,
  },

  data() {
    return {
      contents: [],
      setting: null,
      filteredVideos: null,
      popularProduct: {
        icon: "/images/profile-bookmark.svg",
        code: "Produk Populer",
        products: [],
        host: process.env.HOST,
      },
      navItems: [],
      navs: {
        materi: [],
        pekerjaan: [],
      },
      hasActivePackage: false,
      activeMenu: null,
    };
  },

  created() {
    this.$global.$on("active_package", (data) => {
      this.hasActivePackage = data.ActivePackage == 1;
    });
  },

  mounted() {
    this.getDashboard();
    this.getPopularProduct();
    this.setting = this.$utils.getSetting();
    this.$global.$on("setting", (data) => {
      this.setting = data;
    });
    this.$nextTick(
      function () {
        if (this.$route.query.scroll) {
          this.scrollTo(this.$route.query.scroll);
        }
      }.bind(this)
    );
    this.getNavItems();
    this.changeFilter("Saham");
    console.log(this.navItems);

  },

  methods: {
    scrollTo(id = "start-learning") {
      window.scroll({
        top: document.getElementById(id).offsetTop,
        behavior: "smooth",
      });
    },
    getPopularProduct() {
      const filter = {
        tag: this.popularProduct.code,
      };

      this.$services.product.get(
        filter,
        (data) => {
          this.popularProduct.products = data;
        },
        (msg, errors) => {},
        () => {}
      );
    },
    getDashboard() {
      this.$services.dashboard(
        (data) => {
          data.forEach((item, i) => {
            const subcategory = {
              id: item.id,
              code: item.code,
              icon: item.icon,
              idx: item.idx,
            };
            item.products.forEach((product, i) => {
              product.type = 0;
              product["subcategory"] = subcategory;
            });
          });
          if (this.filteredVideos) {
            this.contents = data.filter((item) => {
              return item.code == this.filteredVideos;
            });
          } else {
            this.contents = data;
          }
          this.$nextTick(() => {
            this.$emit("pageReady");
          });
        },
        (msg, errors) => {},
        () => {}
      );
    },
    changeFilter(filter) {
      // this.filteredVideos = filter;
      // this.getDashboard();
      if (this.filteredVideos !== filter) {
        this.filteredVideos = filter;
        this.getDashboard();
      }
      this.activeMenu = filter;
    },
    getNavItems() {
      this.$services.product.get(
        {},
        (data) => {
          data.forEach((item) => {
            if (!this.navs.materi.includes(item.subcategory.code)) {
              this.navs.materi.push(item.subcategory.code);
            }
            // group by tag
            item.tag.forEach((tag) => {
              if (!this.navs.pekerjaan.includes(tag.name)) {
                this.navs.pekerjaan.push(tag.name);
              }
            });
          });
        },
        (msg, errors) => {},
        () => {}
      );
    },
  },
};
</script>
