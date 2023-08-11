<template>
  <div>
    <div v-if="isMobileView" class="row filter-menu">
      <div class="bottom-sheet-btn">
        <q-btn v-if="isMobileView" class="bottom-btn" icon="filter_alt" color="white" text-color="black"
          @click="openDialog()" no-caps no-wrap unelevated rounded>
          Filter
        </q-btn>
      </div>
      <!-- Menu materi saat mobile view -->
      <div v-if="isMobileView" class="col menu-wrapper">
        <div class="menu-scroll sidebar-list-group">
          <q-btn class="bottom-sheet-group-item" unelevated rounded no-caps no-wrap v-for="item in navs.materi"
            :style="{ backgroundColor: activeMenu === item.id ? '#FFDE59' : '' }" :key="item.id"
            @click="changeFilter(item.id, 'materi')">
            {{ item.code }}
          </q-btn>
        </div>
      </div>
    </div>
    <!-- Bottom-sheet menu start -->
    <div v-if="isMobileView">
      <q-dialog v-model="dialog" :position="position">
        <q-card id="dialog-menu-card" class="dialog-menu-card">
          <q-card-section class="items-center no-wrap">
            <DialogMenuContent :navs="navs" :activeMenu="activeMenu" :changeFilter="changeFilter"
              :isApplyFilterActive="isApplyFilterActive" @applyFilter="applyFilter" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <!-- Bottom-sheet menu end -->
    <div id="slide" class="card sidebar-menu" ref="sidebar" :class="['sidebar', { 'sidebar-closed': !isSidebarOpen }]">
      <h1 class="text-bold text-dark" style="font-size: 20px">Materi</h1>
      <ul class="sidebar-list-group">
        <li class="sidebar-list-group-item" v-for="item in navs.materi"
          :style="{ backgroundColor: activeMenu === item.id ? '#FFDE59' : '' }" :key="item.id"
          @click="changeFilter(item.id, 'materi')">
          {{ item.code }}
        </li>
      </ul>
      <h1 class="text-bold text-dark" style="font-size: 20px">Pekerjaan</h1>
      <ul class="sidebar-list-group">
        <li class="sidebar-list-group-item" v-for="item in navs.pekerjaan" :key="item.id"
          :class="{ active: activeMenu === item.id }" @click="changeFilter(item.id, 'pekerjaan')">
          {{ item.code }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 0;
}

.q-dialog {
  margin: 0;
}

.q-dialog .q-card {
  border-radius: 25px 25px 0 0;
  width: 100%;
  max-width: none;
  margin: 0;
  position: fixed;
  bottom: 0;
}
</style>

<script>
import DialogMenuContent from "./dialogs/DialogMenuContent.vue";
import { ref } from "vue";

export default {
  components: {
    DialogMenuContent,
  },
  props: {
    navs: {
      type: Object,
      required: true,
    },
    activeMenu: {
      type: Number,
      required: false,
    },
    changeFilter: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const dialog = ref(false);
    const position = ref("top");
    return {
      dialog,
      position,
      open(pos) {
        position.value = pos;
        dialog.value = true;
      },
    };
  },
  data() {
    return {
      isSidebarOpen: false,
      isMobileView: false,
      isApplyFilterActive: false,
      activeMenuLocal: this.activeMenu,
    };
  },
  mounted() {
    // console.log(activeMenu);
    this.checkMobileView();
    window.addEventListener("resize", this.checkMobileView);
  },
  methods: {
    checkMobileView() {
      this.isMobileView = window.innerWidth <= 998;
    },
    openDialog() {
      localStorage.setItem("localActive", this.activeMenu);
      // this.activeMenuLocal = this.activeMenu;
      this.dialog = true;
    },
    applyFilter() {
      this.dialog = false;
      // create emit
      this.$emit("runFilter");
      if (this.activeMenu === "Materi") {
      } else if (this.activeMenu === "Pekerjaan") {
      }
    },
    updateActiveMenuLocal(id) {
      this.activeMenuLocal = id;
      localStorage.setItem("localActive", id);
    },
  },
};
</script>
