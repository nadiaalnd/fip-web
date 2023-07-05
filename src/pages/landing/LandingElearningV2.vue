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
      <div class=" q-px-md q-mt-xl q-mb-lg row">
        <!-- Sidebar -->
        <div class="col-12 col-md-4">
          <section>
            <SidebarElearning
              :navs="navs"
              :activeMenu="activeMenu"
              :changeFilter="changeFilter"
              :tingkatanMenu="tingkatanMenu"
              :selectedTingkatan="selectedTingkatan"
            />
          </section>
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
              :content="content"
            />
          </section>
        </div>
      </div>
    </div>
    <!-- Popular Video -->
    <div class="container q-mb-lg" id="popular">
      <SectionProductPopular
        :showPrice="false"
        :id="'popular-' + idx"
        class="q-my-md"
        v-for="(content, idx) in [popularProduct]"
        :key="'popular-' + idx"
        :content="content"
      >
      </SectionProductPopular>
    </div>
  </q-page>
</template>

<script>
import SectionProduct from "components/SectionProduct";
import SectionProductPopular from "components/SectionProductPopular";
import SidebarElearning from "components/SidebarElearning";
export default {
  components: {
    SectionProduct,
    SectionProductPopular,
    SidebarElearning,
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
        tingkatan: [],
      },
      tingkatanMenu:
        ['Semua Tingkatan',
          'Pemula',
          'Menengah'
        ],
      hasActivePackage: false,
      selectedTingkatan: null,
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
    this.selectedTingkatan = "Semua Tingkatan";
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
              if (tag.tingkatan && !this.navs.tingkatan.includes(tag.tingkatan)) {
                this.navs.tingkatan.push(tag.tingkatan);
              }
            });
          });
        },
        (msg, errors) => {},
        () => {}
      );
    },
    toggleSidebar() {
      const sidebar = document.querySelector('.sidebar-mobile')
      sidebar.classList.toggle('open')
    },
    applyFilter() {
      this.$store.commit('setBottomSheetOpen', false);
    },
    resetFilter() {
    },
  },
};
</script>
