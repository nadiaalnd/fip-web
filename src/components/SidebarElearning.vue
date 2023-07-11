<template>
  <div>
    <div v-if="isMobileView" class="filter-menu row">
      <div class="col-3 bottom-sheet-btn">
        <q-btn
          v-if="isMobileView"
          class="bottom-btn"
          icon="filter_alt"
          label="Filter"
          text-color="#ccc"
          @click="open('bottom')"
          no-caps
          no-wrap
          unelevated
          rounded
        />
      </div>
      <!-- Menu materi saat mobile view -->
      <div v-if="isMobileView" class="col-9 q-px-md menu-wrapper">
        <ul class="menu-scroll sidebar-list-group">
          <li
            class="bottom-sheet-group-item"
            v-for="item in navs.materi"
            :style="{
              backgroundColor: activeMenu === item.id ? '#FFDE59' : '',
            }"
            :key="item.id"
            @click="changeFilter(item.id, 'materi')"
          >
            {{ item.code }}
          </li>
        </ul>
      </div>
    </div>
    <!-- Bottom-sheet menu start -->
    <div v-if="isMobileView" class="q-pa-md q-gutter-sm">
      <q-dialog v-model="dialog" :position="position">
        <q-card style="width: 350px">
          <q-card-section class="items-center no-wrap">
            <DialogMenuContent
              :navs="navs"
              :activeMenu="activeMenu"
              :changeFilter="changeFilter"
              :isApplyFilterActive="isApplyFilterActive"
              @applyFilter="applyFilter"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <!-- Bottom-sheet menu end -->
    <div
      id="slide"
      class="card sidebar-menu"
      ref="sidebar"
      :class="['sidebar', { 'sidebar-closed': !isSidebarOpen }]"
    >
      <h1 class="text-bold text-dark" style="font-size: 20px">Materi</h1>
      <ul class="sidebar-list-group">
        <li
          class="sidebar-list-group-item"
          v-for="item in navs.materi"
          :style="{ backgroundColor: activeMenu === item.id ? '#FFDE59' : '' }"
          :key="item.id"
          @click="changeFilter(item.id)"
        >
          {{ item.code }}
        </li>
      </ul>
      <h1 class="text-bold text-dark" style="font-size: 20px">Pekerjaan</h1>
      <ul class="sidebar-list-group">
        <li
          class="sidebar-list-group-item"
          v-for="item in navs.pekerjaan"
          :key="item.id"
          :class="{ active: activeMenu === item.id }"
          @click="changeFilter(item.id, 'pekerjaan')"
        >
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
      type: String,
      required: true,
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
    };
  },
  mounted() {
    this.checkMobileView();
    window.addEventListener("resize", this.checkMobileView);
  },
  methods: {
    checkMobileView() {
      this.isMobileView = window.innerWidth <= 768;
    },
    applyFilter() {
      this.dialog = false;
      if (this.activeMenu === "Materi") {
      } else if (this.activeMenu === "Pekerjaan") {
      }
    },
  },
};
</script>
