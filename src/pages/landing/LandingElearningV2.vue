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
      <div class="q-px-md q-mt-xl q-mb-lg row">
        <!-- Sidebar -->
        <div class="col-12 col-md-4">
          <section>
            <SidebarElearning
              :navs="navs"
              :activeMenu="activeMenu"
              :changeFilter="changeFilter"
            />
          </section>
        </div>
        <!-- Content Video -->
        <div class="col-12 col-md-8">
          <section
            id="start-learning"
            class="container list-popular-product q-px-md q-pb-md"
          >
            <SectionProduct
              :showPrice="false"
              :id="'dashboard-' + idx"
              class="q-my-md"
              v-for="(content, idx) in contents"
              :key="'content-' + idx"
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
        pekerjaan: [
          { code: "Pelajar/Mahasiswa", id: "Rekomendasi Pelajar" },
          { code: "Pekerja", id: "Rekomendasi Pekerja" },
          { code: "Pebisnis", id: "Rekomendasi Wiraswasta" },
          { code: "Ibu Rumah Tangga", id: "Rekomendasi Ibu Rumah Tangga" },
        ],
      },
      filteredType: null,
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
    this.changeFilter(3, "materi");
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
      if (
        this.filteredVideos == null ||
        this.filteredVideos == "" ||
        this.filteredVideos == undefined
      ) {
        this.filteredVideos = 3;
      }
      var params = {};

      if (this.filteredType === "pekerjaan") {
        params.tag = this.filteredVideos;
      } else {
        params.id_subcategory = this.filteredVideos;
      }

      this.$services.product.getBySubCategory(
        params,
        (data) => {
          this.contents = [
            {
              products: data,
            },
          ];
        },
        (msg, errors) => {},
        () => {}
      );
    },

    getNavItems() {
      this.$services.product.getSubCategory(
        {},
        (data) => {
          data.forEach((item) => {
            if (!this.navs.materi.includes(item.code)) {
              this.navs.materi.push({
                code: item.code,
                id: item.id,
              });
            }
          });
        },
        (msg, errors) => {},
        () => {}
      );
    },

    changeFilter(filter, type) {
      if (this.filteredVideos !== filter) {
        this.filteredVideos = filter;
        this.filteredType = type.replace(" ", "+");
        this.getDashboard();
      }
      this.activeMenu = filter;
    },
    applyFilter() {
      this.$store.commit("setBottomSheetOpen", false);
    },
  },
};
</script>
