<template>
  <q-layout>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'BlankLayout',

  mounted () {
    try {
      document.getElementById('first-spinner').style.display = 'none'
    } catch (e) {
    }
  }
})
</script>
