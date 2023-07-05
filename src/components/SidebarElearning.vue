<template>
  <div class="filter-menu row">
    <div class="col-3 bottom-sheet-btn">
      <div
        class="bottom-btn q-px-md q-mt-md gtm-track"
        @click="toggleSidebar()"
        >
          <span class="material-icons q-mr-xs">filter_alt</span>
          Filter
      </div>
    </div>
    <div
    v-if="isMobileView"
    class="col-9 q-px-md menu-wrapper">
      <ul
      class="menu-scroll sidebar-list-group">
        <li
        class="bottom-sheet-group-item"
        v-for="item in navs.materi"
        :style="{ backgroundColor: activeMenu === item ? '#FFDE59' : '' }"
        :key="item.id"
        @click="changeFilter(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
  <div class="card sidebar-mobile"
  :class="['sidebar', { 'sidebar-closed': !isSidebarOpen }]"
  ref="sidebar"
  >
  <h3
  v-if="isMobileView"
  class="title-sidebar text-bold text-dark text-center">
    Filter
  </h3>
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
      {{ item.replace ('Rekomendasi', '')}}
    </li>
  </ul>
  <!-- Tingkatan -->
  <h1 class="text-bold text-dark" style="font-size: 20px;">Tingkatan</h1>
  <ul class="sidebar-list-button">
    <li
    class="sidebar-list-button-item"
    v-for="item in tingkatanMenu"
    :key="item"
    @click="changeFilter(item)"
    >
      <label class="radio-sidebar-content">
        <input
          type="radio"
          name="radio"
          :value="item"
          :checked="selectedTingkatan === item"
          @change="$emit('update:selectedTingkatan', item)"
          /> {{ item }}
        <span class="checkmark-sidebar-content"></span>
      </label>
      </li>
    </ul>
    <div v-if="isMobileView">
      <div
        v-if="isSidebarOpen && activeMenu"
        class="bottom-btn-filter q-px-md q-mt-md gtm-track"
        :class="['bottom-btn-filter', { 'active': isApplyFilterActive }]"
        @click="applyFilter()"
      >Terapkan</div>
      <div
        v-if="isSidebarOpen && activeMenu"
        class="bottom-btn-filter q-px-md q-mt-md gtm-track"
        :class="['bottom-btn-filter', { 'active': isResetFilterActive }]"
        @click="resetFilter()"
      >Reset</div>
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
      isResetFilterActive: false,
    };
  },

  mounted() {
    this.checkMobileView();
    window.addEventListener('resize', this.checkMobileView);
  },

  methods: {
    toggleSidebar() {
      const sidebar = document.querySelector('.sidebar-mobile')
      sidebar.classList.toggle('open')
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
    },
  },
};
</script>
