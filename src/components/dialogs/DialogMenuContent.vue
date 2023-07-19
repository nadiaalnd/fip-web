<template>
  <div ref="sidebar">
    <h3 class="title-sidebar text-bold text-dark q-mb-md">Filter</h3>
    <h1 class="text-dark" style="font-size: 18px;">Materi</h1>
    <div class="sidebar-list-group">
      <q-btn class="sidebar-list-group-bottom" unelevated rounded no-caps v-for="item in navs.materi" :style="{ backgroundColor: activeMenu === item.id ? '#FFDE59' : '' }"
        :key="item.id" @click="changeFilter(item.id, 'materi',true)">
        {{ item.code }}
      </q-btn>
    </div>
    <h1 class="text-dark q-mt-md" style="font-size: 18px;">Pekerjaan</h1>
    <div class="sidebar-list-group">
      <q-btn class="sidebar-list-group-bottom" unelevated rounded no-caps v-for="item in navs.pekerjaan" :key="item.id"
        :class="{ 'active': activeMenu === item.id }" @click="changeFilter(item.id, 'pekerjaan',true)">
        {{ item.code }}
      </q-btn>
    </div>
    <!-- Button "Terapkan" -->
    <q-btn class="bottom-btn-filter q-px-md q-mt-md gtm-track" unelevated rounded no-caps
      :class="['bottom-btn-filter', { 'active': isApplyFilterActive }]" @click="applyFilter()">
      Terapkan
    </q-btn>
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
