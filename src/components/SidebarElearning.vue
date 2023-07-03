<template>
  <div class="burger-menu-btn">
    <button class="burger-button" @click="toggleSidebar">
      <i class="material-icons clear_all">clear_all</i>
    </button>
  </div>
  <div
  class="card sidebar-mobile"
  :class="['sidebar', { 'sidebar-closed': !isSidebarOpen }]"
  ref="sidebar"
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
  </div>
</template>

<style scoped>
.sidebar {
  transition: transform 0.3s ease;
  transform: translateX(0);
  z-index: 999;
}
.burger-menu-btn {
  display: none;
  z-index: 1000;
}

.burger-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFDE59;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
}

.burger-button i {
  color: black;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    height: 100%;
    overflow-y: auto;
    display: none;
    border-radius: 0;
  }
  .sidebar.open {
    display: block;
  }
  .burger-menu-btn {
    display: block;
  }
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
    };
  },

  methods: {
    toggleSidebar() {
      const sidebar = document.querySelector('.sidebar-mobile')
      sidebar.classList.toggle('open')
    },
  },
};
</script>
