<template>
  <div v-if="isMobileView" class="filter-menu row">
    <div class="col-3 bottom-sheet-btn">
      <div id="open" class="bottom-btn q-px-md q-mt-md gtm-track" @click="toggleSidebar()">
        <span class="material-icons q-mr-xs">filter_alt</span>
        Filter
      </div>
    </div>
    <!-- Menu materi saat mobile view -->
    <div v-if="isMobileView" class="col-9 q-px-md menu-wrapper">
      <ul class="menu-scroll sidebar-list-group">
        <li class="bottom-sheet-group-item" v-for="item in navs.materi"
          :style="{ backgroundColor: activeMenu === item ? '#FFDE59' : '' }" :key="item.id" @click="changeFilter(item)">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
  <div id="slide" class="card sidebar-menu" :class="['sidebar', { 'sidebar-closed': !isSidebarOpen }]" ref="sidebar">
    <span v-if="isMobileView" class="material-icons q-mb-lg" style="
      font-size: 50px;
      color: #CCC;
      display: flex;
      justify-content: center;
    ">
      horizontal_rule
    </span>
    <h3 v-if="isMobileView" class="title-sidebar text-bold text-dark q-mb-md">
      Filter
    </h3>
    <h1 class="text-bold text-dark" style="font-size: 20px;">Materi</h1>
    <ul class="sidebar-list-group">
      <li class="sidebar-list-group-item" v-for="item in navs.materi"
        :style="{ backgroundColor: activeMenu === item ? '#FFDE59' : '' }" :key="item.id" @click="changeFilter(item.id)">
        {{ item.code }}
      </li>
    </ul>
    <h1 class="text-bold text-dark" style="font-size: 20px;">Pekerjaan</h1>
    <ul class="sidebar-list-group">
      <li class="sidebar-list-group-item" v-for="item in navs.pekerjaan" :key="item.id"
        :class="{ 'active': activeMenu === item }" @click="changeFilter(item)">
        {{ item.replace('Rekomendasi', '') }}
      </li>
    </ul>
    <!-- Button "Terapkan" dan "Reset" -->
    <div v-if="isMobileView">
      <div v-if="isSidebarOpen && activeMenu" class="bottom-btn-filter q-px-md q-mt-md gtm-track"
        :class="['bottom-btn-filter', { 'active': isApplyFilterActive }]"
        :style="{ backgroundColor: isApplyFilterActive ? '#FFDE59' : '' }" @click="applyFilter()">Terapkan</div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 0
}
</style>

<script>
export default {
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
    tingkatanMenu: {
      type: Array,
      required: true,
    },
    selectedTingkatan: {
      type: String,
      required: true,
    },
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
    window.addEventListener('resize', this.checkMobileView);
  },

  methods: {
    toggleSidebar() {
      const sidebar = document.querySelector('.sidebar-menu')
      sidebar.classList.toggle('open')
      this.isApplyFilterActive = this.isSidebarOpen;
      this.isSidebarOpen = sidebar.classList.contains('open');
      this.isMobileView = window.innerWidth <= 768;
    },
    checkMobileView() {
      this.isMobileView = window.innerWidth <= 768;
    },
    applyFilter() {
      this.isSidebarOpen = false;
      if (this.activeMenu === 'Materi') {
      } else if (this.activeMenu === 'Pekerjaan') {
      } else if (this.activeMenu === 'Tingkatan') {
      }
    },
    resetFilter() {
      this.isSidebarOpen = false;
      this.$emit('change-filter', null);
      this.isResetFilterActive = true;
      this.isApplyFilterActive = true;

      this.localActiveMenu = null;
      this.localSelectedTingkatan = null;
    },
  },
};
</script>
