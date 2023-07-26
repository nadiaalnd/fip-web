<template>
  <div ref="sidebar">
    <!-- Konten sidebar -->
    <h3 class="title-sidebar text-bold text-dark q-mb-md">Filter</h3>
    <h1 class="text-dark" style="font-size: 18px;">Materi</h1>
    <div class="sidebar-list-group">
      <q-btn class="sidebar-list-group-bottom" unelevated rounded no-caps
        v-for="item in navs.materi"
        :style="{ backgroundColor: activeMenuLocal === item.id ? '#FFDE59' : '' }"
        :key="item.id"
        @click.stop="handleButtonClick(item.id, 'materi',)">
        {{ item.code }}
      </q-btn>
    </div>
    <h1 class="text-dark q-mt-md" style="font-size: 18px;">Pekerjaan</h1>
    <div class="sidebar-list-group">
      <q-btn class="sidebar-list-group-bottom" unelevated rounded no-caps
        v-for="item in navs.pekerjaan" :key="item.id"
        :class="{ 'active': activeMenuLocal === item.id }"
        @click="handleButtonClick(item.id, 'pekerjaan', true)">
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
    activeMenuLocal: {
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
  data() {
    return {
      id: null,
      type: null,
      activeId: null,
    };
  },
  methods: {
    applyFilter() {
      this.changeFilter(this.id, this.type, false, true);
      this.$emit('applyFilter');
    },
    handleButtonClick(id, type, flag) {
      // alert('handleButtonClick');
      this.id = id;
      this.type = type;
      this.activeId = id;
      // this.changeFilter (id, type, flag);
      this.$emit('updateActiveMenuLocal', id);
    },
  },
});
</script>
