<template>
  <div ref="sidebar">
    <h3 class="title-sidebar text-bold text-dark q-mb-md">Filter</h3>
    <h1 class="text-bold text-dark" style="font-size: 20px;">Materi</h1>
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
    <h1 class="text-bold text-dark" style="font-size: 20px;">Pekerjaan</h1>
    <ul class="sidebar-list-group">
      <li
        class="sidebar-list-group-item"
        v-for="item in navs.pekerjaan"
        :key="item.id"
        :class="{ 'active': activeMenu === item }"
        @click="changeFilter(item)"
      >
        {{ item.replace('Rekomendasi', '') }}
      </li>
    </ul>
    <!-- Button "Terapkan" -->
    <div class="bottom-btn-filter q-px-md q-mt-md gtm-track" :class="['bottom-btn-filter', { 'active': isApplyFilterActive }]" @click="applyFilter()">
      Terapkan
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DialogMenuContent',
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
    isApplyFilterActive: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    applyFilter() {
      this.$emit('applyFilter');
    },
  },
});
</script>
