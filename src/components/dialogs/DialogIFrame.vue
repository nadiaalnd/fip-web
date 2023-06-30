<template>
  <q-dialog v-model="dialog">
    <q-card class="q-pa-md" style="position: relative; width: 720px; max-width: calc(100% - 32px)">
      <q-btn
        flat round v-close-popup
        color="neutral"
        icon="close"
        style="position: absolute; top: 16px; right: 16px"/>
      <div
        style="padding-top: 40px"
        v-html="iframe" class="full-width flex-1">
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogRatingProduct',
  props: {
    value: Boolean,
    iframe: String
  },
  components: {
  },
  data () {
    return {
      dialog: true
    }
  },

  mounted () {
    this.dialog = this.value
  },

  watch: {
    value: function (newVal, oldVal) {
      this.dialog = newVal
      if (newVal) {

      }
    },
    dialog: function (newVal, oldVal) {
      this.$emit('input', newVal)
    }
  }
}
</script>
